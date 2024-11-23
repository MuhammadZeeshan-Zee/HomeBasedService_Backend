import { Router } from "express";
import {
  createbookService,
  getAllBookedOrders,
  updateOrderStatus,
} from "../controller/book.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { AdminVerify } from "../middleware/adminVerify.middleware.js";

const router = Router();
router.route("/order").post(verifyJWT,createbookService);
router.route("/getAllOrders").get(verifyJWT, getAllBookedOrders);
router.route("/updateOrderStatus/:id").put( verifyJWT,updateOrderStatus);
export default router;
