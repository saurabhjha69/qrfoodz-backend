import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"username is Required"],
        unique: true
    },
    password: {
        type: String,
        required: [true,"password is required"],
    }
},{
    timestamps: true
})


export const AdminModel = mongoose.model("Admin",adminSchema)

