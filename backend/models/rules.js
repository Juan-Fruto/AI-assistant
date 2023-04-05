import { Schema, model } from "mongoose";

const rulessSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            unique: false
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Rules', rulessSchema);