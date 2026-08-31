import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "ACTIVE" } 
  },
  { timestamps: true }
);

export const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);