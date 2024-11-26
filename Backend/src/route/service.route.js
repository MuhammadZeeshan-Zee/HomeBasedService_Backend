import { Router } from "express";
import {
  addService,
  readService,
  readAllServices,
  updateService,
  deleteService,
} from "../controller/service.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { AdminVerify } from "../middleware/adminVerify.middleware.js";
const router = Router();

// secure routes
router.route("/addService").post(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  addService
);
router.route("/readService/:id").get(readService);
router.route("/readAllService").get(readAllServices);
router.route("/updateService/:id").put(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  updateService
);
router.route("/deleteService/:id").delete(deleteService);

export default router;
