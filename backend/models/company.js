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
            type: String,
            required: true,
            unique: true,
            trim: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// limit of documents in the collection
companySchema.plugin(require('mongoose-max-documents-plugin'), { max: 1 });

export default model('Company', companySchema);
