import mongoose from "mongoose";


const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    opened: {
      type: Boolean,
      default: false,
    },
  },
  { strict: true, timestamps: true }
);

const Message = mongoose.model("Messages", messageSchema);

export default Message;
