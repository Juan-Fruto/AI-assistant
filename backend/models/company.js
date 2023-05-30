import {Schema, model} from 'mongoose';

const companySchema = new Schema(
    {
        brand_name: {
            type: String,
            required: true,
            unique: true,
            trim: false
        },
        legal_name: {
            type: String,
            required: true,
            unique: true,
            trim: false
        },
        logo: {
            public_id: {
                type: String,
                required: true,
                unique: true,
                trim: true
            },
            secure_url: {
                type: String,
                required: true,
                unique: true,
                trim: true
            }
        },
        devices_state: {
            type: String,
            required: true,
            unique: false,
            trim: false
        },
        token_key: {
            type: String,
            required: true,
            unique: false,
            trim: false
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// limit of documents in the collection

export default model('Company', companySchema);
