const { model, Schema } = require("mongoose");

const messageSchema = new Schema ({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true, 
    },

},
{timestamps: true}
);



module.exports = model("Message", messageSchema);