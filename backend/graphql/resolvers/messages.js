const checkAuth = require("../../util/check-auth");
const Message = require("../../models/Message");
const Conversation = require("../../models/Conversation");
const User = require("../../models/User");

module.exports = {
  Query: {
    async getMessages(_, {userToChatId}, context) {
      try { 
        const authUser = checkAuth(context);
        const senderId = authUser.id;

        const conversation = await Conversation.find({
            participants: { $in: [senderId, userToChatId] },
          }).populate("messages");
  
          if (!conversation) return [];
  
          // Since messages are embedded within the conversation, you don't need to populate them separately
          //const messages = conversations.flatMap(conversation => conversation.messages);


        return conversation;
      } catch (error) {
        console.log("Error in getMessages resolver: ", error.message);
        throw new Error("Internal server error");
      }
    },
  },

  Mutation: {
    async sendMessage(_, { message, receiverId }, context) {
      try {
        const authUser = checkAuth(context);
        const senderId = authUser.id; 
        let conversation = await Conversation.findOne({
          participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
          conversation = await Conversation.create({
            participants: [senderId, receiverId],
          });
        }
        const newMessage = new Message({
          senderId,
          receiverId,
          message,
        });
        if (newMessage) {
          conversation.messages.push(newMessage._id);
        }
        await Promise.all([conversation.save(), newMessage.save()]);

        //TODO SOCKET LOGIC HERE

        return newMessage;
      } catch (error) {
        console.log("Error in sendMessage resolver: ", error.message);
        throw new Error("Internal server error");
      }
    },
  },
};
