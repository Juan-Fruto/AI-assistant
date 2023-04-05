import { Schema, model } from "mongoose";

const chatsSchema = new Schema(
    {
        chatID: {
            type: String,
            required: true,
            unique: true
        },
        messages: [
            {
                role: String,
                content: String,
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Chats', chatsSchema);