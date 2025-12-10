import cron from "node-cron";
import { OrderModels } from "../models/orders.models.js";
import UserSummaryModels from "../models/summaryUser.models.js";
import RevenueSummaryModels from "../models/summaryRevenuse.js";


const salesSummaryCron = cron.schedule("0 31 13 * * *", async () => {
  try {
    console.log(" Running Summary Cron...");

    const lastSummary = await RevenueSummaryModels.findOne().sort({ createdAt: -1 });

    let startTime;

    if (!lastSummary) {
      // FIRST RUN → last 1 day only
      startTime = new Date(Date.now() - 24 * 60 * 60 * 1000);
      console.log("▶ First run → summarizing last 1 day");
    } else {
      // NEXT RUNS → only new delivered orders
      startTime = lastSummary.createdAt;
      console.log(`▶ Summarizing new orders after: ${startTime}`);
    }

    const endTime = new Date();

    const orders = await OrderModels.find({
      status: "delivered",
      createdAt: { $gte: startTime, $lt: endTime }
    });

    if (orders.length === 0) {
      console.log("ℹ No delivered orders found.");
      return;
    }

    // GLOBAL REVENUE SUMMARY
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

    await RevenueSummaryModels.create({
      totalRevenue,
      numberOfOrders: orders.length
    });

    // USER SUMMARY (Complete)
    const userMap = new Map();

    orders.forEach(order => {
      const userId = order.userId;

      if (!userMap.has(userId)) {
        userMap.set(userId, {
          TotalPurchasing: 0,
          NumberOfOrders: 0,
          NumberOfItem: 0
        });
      }

      const userSummary = userMap.get(userId);

      userSummary.TotalPurchasing += order.totalAmount;
      userSummary.NumberOfOrders += 1;
      userSummary.NumberOfItem += order.totalItem;
    });

    // Save each user's summary
    for (const [userId, summary] of userMap.entries()) {
      await UserSummaryModels.create({
        userId,
        TotalPurchasing: summary.TotalPurchasing,
        NumberOfOrders: summary.NumberOfOrders,
        NumberOfItem: summary.NumberOfItem
      });
    }

    console.log("User Summary Created For:", [...userMap.keys()]);

  } catch (err) {
    console.error("Summary Cron Error:", err.message);
  }
});



export default salesSummaryCron;






