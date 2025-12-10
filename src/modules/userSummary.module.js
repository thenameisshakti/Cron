import mongoose from "mongoose";

const summaryUserSchema = new mongoose.Schema({
    userId:{
        type: String
    },
    TotalPurchasing:{
        type: Number
    },
    NumberOfOrders:{
        type:Number
    },
    NumberOfItem:{
        type: Number
    }
}, { timestamps: true }
);

const UserSummaryModels = mongoose.model("User_Summary", summaryUserSchema);
export default UserSummaryModels