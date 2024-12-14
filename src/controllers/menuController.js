import { MenuModel } from "../models/menuModel.js";
import { MenuItemModel } from "../models/menuItemModel.js";
import { createQrCode } from "../utils/qrCodeGenerator.js";
import path from "path"
import dirname from "../utils/dirname.js";

export const handleMenuCreation = async (req, res) => {
  try {
    const { name, menuItems } = req.body;

    // Validate the input
    if (!name || !menuItems || menuItems.length === 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Menu name and at least one menu item are required.",
        });
    }

    // Create a new menu instance
    const newMenu = new MenuModel({
      name,
      menuItems,
    });

    // Save the menu to the database
    const savedMenu = await newMenu.save();

    const fileName = `${savedMenu._id}.png`;
    const qrCodePath = path.join(dirname, "public/codes", fileName);
    createQrCode(qrCodePath, `${process.env.CLIENT_URL}/checkout/${savedMenu._id}`); // if this doesnt work add the localhost:8000/checkout



    // Return the created menu in the response
    return res.status(201).json({
      success: true,
      message: "Menu created successfully!",
      qrUrl: `${process.env.SERVER_URL}/codes/${savedMenu._id}.png`,
      menu: savedMenu,
    });
  } catch (error) {
    console.error("Error creating menu:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Server error. Could not create the menu.",
      });
  }
};
export const handleMenuUpdation = async () => {};
export const handleMenuDeletion = async () => {};
export const handleMenu = async (req,res) => {
    try {
        const {menuId} = req.params
        const Menu = await MenuModel.findById(menuId)
        await Menu.populate("menuItems.menuItem")

        return res.status(200).json({success: true, menu: Menu, qrcodeUrl : `${Menu._id}.png`})


    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "Internal Server Error!"})
    }
};

export const handleMenus = async (req,res) => {
  try {
    const Menus = await MenuModel.find({}).populate("menuItems.menuItem")
    return res.status(200).json({success:true, menus : Menus})
  } catch (error) {
    return res.status(500).json({success: false,error: "Error Occured!"})
  }
};
