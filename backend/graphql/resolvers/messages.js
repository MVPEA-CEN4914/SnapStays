const checkAuth = require("../../util/check-auth");
const Message = require("../../models/Message");
const Conversation = require("../../models/Conversation");



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
    async getConversations(_, __,context){
      try {
        // Check if the user is authenticated
        const authUser = checkAuth(context);
        const userId = authUser.id;

        // Fetch conversations where the authenticated user is a participant
        const conversations = await Conversation.find({
          participants: userId,
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

        return conversations;
      } catch (error) {
        console.log("Error in getConversations resolver: ", error.message);
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
        //console.log("New Message:", newMessage);

                // Save message and update conversation
                await newMessage.save();
                conversation.messages.push(newMessage._id);
                await conversation.save();

        //TODO SOCKET LOGIC HERE
       // Connect to the Socket.IO server
      


        return newMessage;
      } catch (error) {
        console.log("Error in sendMessage resolver: ", error.message);
        throw new Error("Internal server error");
      }
    },
  },
  async deleteConversation(_, { conversationId }, context) {
    const user = checkAuth(context);
    try {
      // Find the conversation
    const conversation = await Conversation.findById(conversationId);
    console.log('Found conversation:', conversation);
    // Check if the conversation exists
    if (!conversation) {
      throw new Error('Conversation not found');
    }

       // Check if the user is authorized to delete the conversation
    if (!conversation.participants.includes(user.id)) {
      throw new Error('You are not authorized to delete this conversation');
    }
   // Delete the conversation
   await Conversation.findByIdAndDelete(conversationId);
      return 'Conversation deleted';
    } catch (error) {
      console.error('Error deleting conversation:', error);
      throw new Error('Internal server error');
    }
  },
};
