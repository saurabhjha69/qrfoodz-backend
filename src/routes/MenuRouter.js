import Router from "express"
import { handleMenuCreation,handleMenu ,handleMenus} from "../controllers/menuController.js"

const MenuRouter = Router()

MenuRouter.get("/",handleMenus)
MenuRouter.get("/:menuId",handleMenu)
MenuRouter.post("/",handleMenuCreation)
MenuRouter.put("/:menuId")
MenuRouter.delete("/:menuId")


export {MenuRouter}