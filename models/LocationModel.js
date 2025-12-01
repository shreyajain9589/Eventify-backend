import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    displayName: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Location", locationSchema);
