import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

export const uploadImage = async (path) => (
    await cloudinary.uploader.upload(path, {folder: 'logos'})
);

export const deleteImage = async (public_id) => (
    await cloudinary.upload.destry(public_id)
);