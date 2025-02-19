import mongoose, { Schema } from "mongoose";

const noticeSchema = new Schema(
  {
    team: [{ type: Schema.Types.ObjectId, ref: "users" }],
    text: { type: String },
    task: { type: Schema.Types.ObjectId, ref: "tasks" },
    notiType: { type: String, default: "alert", enum: ["alert", "message"] },
    isRead: [{ type: Schema.Types.ObjectId, ref: "users" }],
  },
  { timestamps: true }
);

const Notice = mongoose.model("notifies", noticeSchema);

export default Notice;