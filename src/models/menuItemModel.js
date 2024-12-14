import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Menu Name is Required"]
    },
    description: {
        type: String,
        maxlength: [500, "Description cannot exceed 500 characters"],
    },
    price: {
        type: Number,
        required: [true,"Price is Required!"],
        min: [0,"Price Cannot be Negative"]
    },
    isComplementary: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})


export const MenuItemModel = mongoose.model("MenuItem",menuItemSchema)

