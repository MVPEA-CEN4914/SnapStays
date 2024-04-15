const { model, Schema } = require("mongoose");

const conversationSchema = new Schema ({
    participants: [
        {
            type: Schema.Types.ObjectId,
			ref: "User",
        },
    ],
    messages: [
        {
            type:Schema.Types.ObjectId,
            ref: "Message",
            default: [],
        },
    ],
},
{timestamps:true}
);


module.exports = model("Conversation", conversationSchema);