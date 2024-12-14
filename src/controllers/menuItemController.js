import { MenuItemModel } from "../models/menuItemModel.js";

export const handleMenuItemCreation = async (req, res) => {
  try {
    let { name, description, price,isComplementary } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Item Name and Price Are Required!",
      });
    }

    if (typeof price !== "number") {
      price = parseInt(price)
    }

    const newMenuItem = new MenuItemModel({
      name,
      description,
      price,
      isComplementary
    });

    // Saving menuItem to database
    const savedMenuItem = await newMenuItem.save();

    return res.status(201).json({
      success: true,
      message: "MenuItem created successfully!",
      menuItem: savedMenuItem,
    });
  } catch (error) {
    console.error("Error creating menuItem:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Could not create the menuItem.",
    });
  }
};

export const handleMenuItemEdit = async (req, res) => {
  try {
    const { name, description, price,isComplementary } = req.body;
    const { menuItemId } = req.params;

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Item Name and Price Are Required!",
      });
    }

    if (typeof price !== "number" || price < 0) {
      return res.status(400).json({
        success: false,
        message: "Price Should be a Positive Number!",
      });
    }

    const MenuItem = await MenuItemModel.findByIdAndUpdate(
      menuItemId,
      {
        name,
        description,
        price,
        isComplementary
      },
      {
        new: true,
      }
    );

    if (!MenuItem) {
      return res.status(400).json({
        success: false,
        message: "Failed to Update MenuItem",
      });
    }

    return res.status(200).json({
      success: true,
      message: "MenuItem Updated successfully!",
      menuItem: MenuItem,
    });
  } catch (error) {
    console.error("Error Updating menuItem:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Could not Update the menuItem.",
    });
  }
};

export const handleMenuItemDelete = async (req, res) => {
  try {
    const { menuItemId } = req.params;

    const isMenuItemDeleted = await MenuItemModel.findByIdAndDelete(menuItemId);

    if (!isMenuItemDeleted) {
      return res.status(400).json({
        success: false,
        message: "Menu Item Not Found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "MenuItem Deleted successfully!",
    });
  } catch (error) {
    console.error("Error Occrured!", error);

    console.error("Error Deleting MenuItem:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Could not Delete the MenuItem.",
    });
  }
};

export const handleMenuItem = async (req, res) => {
  try {
    const {menuItemId} = req?.params || null

    if(menuItemId) {
        const menuItem = await MenuItemModel.findById(menuItemId)

        if(!menuItem){
            return res.status(200).json({
                success: true,
                message: "MenuItem Not Found!",
              });
        }

        return res.status(200).json({
            success: true,
            message: "MenuItem Found successfully!",
            menuItem: menuItem,
          });

    }

    const MenuItems = await MenuItemModel.find();

    if (MenuItems.length === 0) {
      return res.status(200).json({
        success: true,
        message: "MenuItems are not There",
      });
    }

    return res.status(200).json({
      success: true,
      message: "MenuItem Found successfully!",
      menuItems: MenuItems,
    });

  } catch (error) {
    console.error("Error Occrured!", error);

    console.error("Error Listing All MenuItems:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Could List All the MenuItem at This Momment.",
    });
  }
};
