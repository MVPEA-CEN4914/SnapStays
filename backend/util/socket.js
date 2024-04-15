
const { getReceiverSocketId } = require("../index");

// Define the sendMessage function
const sendMessage = (receiverId, message, io) => {
  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", { message });
  }
};

// Export the sendMessage function
module.exports = { sendMessage };
