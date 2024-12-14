import mongoose from "mongoose";

export const connectDB = async ()=> {
    try {
        await mongoose.connect(process.env.DB_URI+process.env.DB_NAME)
        console.log("Database Connection Eastablished Successfully!")
    } catch (error) {
        console.log("Failed to Connect To DataBase")
        console.error(error)
    }
}