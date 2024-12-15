import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Menu Name is Required"],
    },
    menuItems: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MenuItem",
        },
        quantity: {
          type: Number,
          required: true, // Ensure quantity is provided
          min: [1, "Quantity must be at least 1"],
        },
      },
    ],
    cost: {
        type: Number,
        default: 0
    },
    qrcodeUrl: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);



menuSchema.pre("save", async function (next) {
  try {
    // Populate the `menuItems` with only the `price` and `isComplementary` fields
    const populatedMenu = await this.populate({
      path: "menuItems.menuItem",
      select: "price isComplementary", // Fetching relevant fields
    });

    // Calculate total cost
    this.cost =
      (populatedMenu.menuItems || []).reduce((totalCost, item) => {
        if (item.menuItem && !item.menuItem.isComplementary) {
          const itemPrice = item.menuItem.price || 0;
          const itemQuantity = item.quantity || 0;
          return totalCost + itemPrice * itemQuantity;
        }
        return totalCost; // Add this to handle cases where the item is complementary
      }, 0);

    next(); // Proceed to save the document
  } catch (err) {
    next(err); // Pass error to the next middleware
  }
});


export const MenuModel = mongoose.model("Menu", menuSchema);
