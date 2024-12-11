import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    totalCharges: { type: Number, required: true },
    rating: { type: Number, required: true },
    feedback: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const Feedback = mongoose.model("Feedback", FeedbackSchema);
