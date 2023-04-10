import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            unique: false,
            trim: false
        },
        emali: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            unique: false,
            trim: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);

    return hash;
}

userSchema.methods.matchPassword = async (password) => {
    return await bcrypt.matchPassword(password, this.password);
}

export default model('Users', userSchema);