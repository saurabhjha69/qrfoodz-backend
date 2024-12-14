import Router from "express";
import {
  handleMenuItem,
  handleMenuItemCreation,
  handleMenuItemDelete,
  handleMenuItemEdit,
} from "../controllers/menuItemController.js";

const MenuItemRouter = Router();

MenuItemRouter.get("/:menuItemId?", handleMenuItem);
MenuItemRouter.post("/", handleMenuItemCreation);
MenuItemRouter.put("/:menuItemId", handleMenuItemEdit);
MenuItemRouter.delete("/:menuItemId", handleMenuItemDelete);


export {MenuItemRouter}