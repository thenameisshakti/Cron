import mongoose from "mongoose";
import config from "../config/config.js";
import { OrderModels } from "../models/orders.models.js";
import { DB_Name } from "../name.js";

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const createDummyOrders = async () => {
    try {
        await mongoose.connect(`${config.mongoDBUri}/${DB_Name}`);
        console.log("DB connected for seeding");

        const dummyOrders = [];

        for (let i = 1; i <= 200; i++) {
            const subTotal = random(100, 2000);        
            const deliveryCharge = random(20, 100);    
            const tax = random(5, 50);
            const platformFee = random(2, 15);
            const tip = random(0, 20);

            const totalAmount = subTotal + deliveryCharge + tax + platformFee + tip;

            dummyOrders.push({
                userId: `user_${random(1, 50)}`,      
                totalItem: random(1, 5),
                subTotal: subTotal,
                deliveryCharge: deliveryCharge,
                extraCharges: {
                    tax,
                    platformFee,
                    tip
                },
                totalAmount: totalAmount,
                status: "delivered"
            });
        }

        await OrderModels.insertMany(dummyOrders);

        console.log("10 Dummy Orders Added Successfully");
        process.exit(0);

    } catch (err) {
        console.error("Error inserting dummy orders:", err.message);
        process.exit(1);
    }
};

createDummyOrders();
