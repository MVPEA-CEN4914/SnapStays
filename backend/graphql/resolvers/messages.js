const checkAuth = require("../../util/check-auth");
const Message = require("../../models/Message");
const Conversation = require("../../models/Conversation");
const User = require("../../models/User");

module.exports = {
  Query: {
    async getMessages(_, { userToChatId }, context) {
      try { 
        const authUser = checkAuth(context);
        const senderId = authUser.id;
                
        const conversation = await Conversation.findOne({
          participants: { $all: [senderId, userToChatId] },
        }).populate({
          path: 'participants',
          model: 'User', // Assuming your User model is named 'User'
        }).populate({
          path: 'messages',
          populate: [
            {
              path: 'senderId',
              model: 'User',
            },
            {
              path: 'receiverId',
              model: 'User',
            },
          ],
        });
          
        if (!conversation) {
          return {
            participants: [],
            messages: [],
          };
        }
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
        console.log(senderId);
                 // Ensure sender and receiver are different
                 if (senderId === receiverId) {
                  throw new Error("Cannot send message to yourself");
                }
                console.log("Sender ID:", senderId);
                console.log("Receiver ID:", receiverId);

        let conversation = await Conversation.findOne({
          participants: { $all: [senderId, receiverId] },
        });

        console.log("Retrieved Conversation:", conversation);

        if (!conversation) {
          conversation = await Conversation.create({
            participants: [senderId, receiverId],
            messages:[],
          });
        }
        const newMessage = new Message({
          senderId,
          receiverId,
          message,
        });
        console.log("New Message:", newMessage);

                // Save message and update conversation
                await newMessage.save();
                conversation.messages.push(newMessage._id);
                await conversation.save();
   
         // conversation.messages.push(newMessage);
        
        //await Promise.all([conversation.save(), newMessage.save()]);

        //TODO SOCKET LOGIC HERE

        return newMessage;
      } catch (error) {
        console.log("Error in sendMessage resolver: ", error.message);
        throw new Error("Internal server error");
      }
    },
  },
};
