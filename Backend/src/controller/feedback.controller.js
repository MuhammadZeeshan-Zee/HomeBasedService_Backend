import { Feedback } from "../model/feedback.model.js";

// Submit feedback
export const submitFeedback = async (req, res) => {
    try {
        const { totalCharges, rating, feedback } = req.body;

        if (!totalCharges || !rating || !feedback) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const newFeedback = new Feedback({
            userId: req.user._id,
            totalCharges,
            rating,
            feedback,
        });

        await newFeedback.save();
        res.status(201).json({ success: true, message: "Feedback submitted successfully." });
    } catch (error) {
        console.error("Error submitting feedback:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

// Get all feedbacks of the logged-in user
export const getFeedback = async (req, res) => {
    const { orderId } = req.params; // Retrieve the orderId from the URL parameter
    try {
        const feedback = await Feedback.findOne({ orderId: orderId }); // Fetch feedback for the specific order
        if (!feedback) {
            return res.status(404).json({ success: false, message: "No feedback found for this order." });
        }
        res.status(200).json({ success: true, feedback }); // Return the feedback data
    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};


// Admin: Get all feedbacks
export const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate("userId", "name email");
        res.status(200).json({ success: true, data: feedbacks });
    } catch (error) {
        console.error("Error fetching all feedbacks:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};
