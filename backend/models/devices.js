import { Schema, model } from "mongoose";

const devicesSchema = new Schema(
    {
        model: {
            type: String,
            required: true,
            unique: true
        },
        image: {
            type: String,
            required: true,
            unique: true
        },
        cpu: {
            type: String,
            required: true,
            unique: false
        },
        ram: {
            type: String,
            required: true,
            unique: false
        },
        storage: {
            type: String,
            required: true,
            unique: false
        },
        display_size: {
            type: String,
            required: true,
            unique: false
        },
        display_type: {
            type: String,
            required: true,
            unique: false
        },
        cameras: {
            type: String,
            required: true,
            unique: false
        },
        main_camera: {
            type: String,
            required: true,
            unique: false
        },
        battery: {
            type: String,
            required: true,
            unique: false
        },
        released: {
            type: String,
            required: true,
            unique: false
        },
        price: {
            type: Number,
            required: true,
            unique: false
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Devices', devicesSchema);