const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  reciepientId: {
    type: String,
    required: true,
    max: 50,
  },
  senderId: {
    type: String,
    required: true,
    max: 50,
  },
  text: {
    type: String,
    required: true,
    max: 500,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Conversations = mongoose.model("Conversation", conversationSchema);

module.exports = Conversations;
