import { Schema, model } from "mongoose";

const factsSchema = new Schema(
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

export default model('Facts', factsSchema);