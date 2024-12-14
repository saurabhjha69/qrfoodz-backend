import { AdminModel } from "../models/adminModel.js"

export const handleAdminLogin = async (req,res) => {
    try {
        const {username,password} = req.body 
        
        const admin = await AdminModel.findOne({
            username: username,
            password: password
        })

        if(!admin) {
            return res.status(400).json({
                success: false,
                message: "Wrong Username and Password",
              });
        }

        return res.status(200).json({
            success: true,
            message: "Admin Logged In Successfully!",
            admin: admin,
          });
    } catch (error) { 
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server error. Failed to Login!",
          });
    }
}