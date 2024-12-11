import { Router } from "express";
import {
    submitFeedback,
    getFeedback,
    getAllFeedbacks,
} from "../controller/feedback.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const feedbackRouter = Router();

// Routes
feedbackRouter.post("/", verifyJWT, submitFeedback); // Submit feedback
feedbackRouter.get("/:orderId", verifyJWT, getFeedback); // Get feedback for logged-in user
feedbackRouter.get("/all", verifyJWT, getAllFeedbacks); // Admin: Get all feedbacks

export default feedbackRouter;
