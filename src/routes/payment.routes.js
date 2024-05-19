import { Router } from "express";
import { captureOrder, createOrder, cancelOrder } from "../controllers/payment.controller.js";

const router = Router()

router.post('/create-order', createOrder)

router.get('/capture-order', captureOrder)

router.get("/cancel-payment", cancelOrder);

export default router;