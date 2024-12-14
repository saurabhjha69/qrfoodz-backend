import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            name: {
                type: String
            },
            email: {
                type: String
            },
            phoneno: {
                type: Number
            },
            address: {
                type: String
            }
        },
        menu: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Menu",
            required: [true,"Menu is Required to Place the Order!"]
        },
        totalAmount: {
            type: Number,
            required: [true, "Total amount is required"],
            min: [0, "Total amount cannot be negative"],
        },
        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Preparing", "Delivered", "Cancelled"],
            default: "Pending",
        },
        paymentStatus: {
            type: String,
            enum: ["Paid", "Pending", "Failed"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);


export const OrderModel = mongoose.model("Order", orderSchema);
