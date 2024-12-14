import { MenuModel } from "../models/menuModel.js";
import { OrderModel } from "../models/orderModel.js";

export const handleOrder = async (req, res) => {
  try {
    const { user, menuId } = req.body;

    if (!user.name || !user.email || !user.address || !user.phoneno) {
      return res.status(400).json({
        success: false,
        message: "User Details Are Required to Place Order!",
      });
    }

    if (!menuId) {
      return res.status(400).json({
        success: false,
        message: "Select A Menu to Place a order",
      });
    }

    const menu = await MenuModel.findById(menuId)
    if(!menu) {
        return res.status(400).json({
            success: false,
            message: "Menu Doesnot Exists",
          });
    }



    const newOrder = new OrderModel({
      user,
      menu: menuId,
      totalAmount: menu?.cost || 100,
      paymentStatus: "Paid",
    });

    const savedOrder = await newOrder.save();
    if (!savedOrder) {
      return res.status(400).json({
        success: false,
        message: "Failed to Place An Order, Try again!",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Order Placed SuccessFully!",
      orderDetails: savedOrder,
    });
  } catch (error) {
    console.error("Error Placing Order:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.Cannot Place Your Order Right Now!",
    });
  }
};


export const listOrders = async (req,res)=>{
    try {
        const placedOrders = await OrderModel.find({}).sort({"createdAt": 1}).populate("menu")
        if(placedOrders.length === 0 ){
            return res.status(200).json({
                success: true,
                message: "No Orders Yet!"
              });
        }
        

        return res.status(200).json({
            success: true,
            message: "Orders Fetched Successfully!",
            orders: placedOrders,
          });
    } catch (error) {
        
    }
}
