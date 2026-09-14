import mongoose from "mongoose";

const AuditLogSchema = new mongoose.Schema({
  action: { type: String, required: true }, // e.g., "CREATE_ITEM", "DELETE_ITEM"
  performedBy: { type: String, default: "Admin" },
  itemId: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.AuditLog || mongoose.model("AuditLog", AuditLogSchema);