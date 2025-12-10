import mongoose from "mongoose";

const summaryRevenueSchema = new mongoose.Schema({
    totalRevenue: {
        type: Number
    },
    numberOfOrders: {
        type: Number
    }
}, { timestamps: true });

const RevenueSummaryModels = mongoose.model("Revenue_Summary", summaryRevenueSchema);
export default RevenueSummaryModels