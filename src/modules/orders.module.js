import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    totalItem:{
        type: Number
    },
    subTotal: {
        type: Number,
        required: true
    },
    deliveryCharge: {
        type: Number,
        default: 0
    },
    extraCharges: {
        tax: { type: Number, default: 0 },
        platformFee: { type: Number, default: 0 },
        tip: { type: Number, default: 0 }
    },

    totalAmount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "confirmed", "packed", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
    
}, { timestamps: true });

export const OrderModels = mongoose.model("Order", orderSchema);
