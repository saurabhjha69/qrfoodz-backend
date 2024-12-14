import { Router } from "express";
import { handleOrder, listOrders } from "../controllers/OrderController.js";

const OrderRouter = Router()

OrderRouter.post("/place-order",handleOrder)
OrderRouter.get("/orders",listOrders)

export {OrderRouter}