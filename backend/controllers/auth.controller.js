import Users from '../models/users.js';
import Company from '../models/company.js';
import jwt from 'jsonwebtoken';
import { httpError } from '../helpers/handleError.js';
import { uploadImage } from '../services/cloudinary.js';
import { response } from 'express';
import fsAsync from 'fs-extra';
import { startSession } from 'mongoose';
import { generateUniqueKey } from '../libs/bcrypt.js' 

export const loginHandler = async (req, res) => {
  try {
      
    const {username, password} = req.body;
    
    const user = await Users.findOne({username});

    
    // checking if the user exists
    if(!user){
      return res.status(403).json({message: "the user does not exist"})
    }
    
    // checking if the password is correct
    const matchPassword = await user.matchPassword(password);

    if(!matchPassword){
      return res.status(403).json({message: "incorrect password"});
    }

    // creating the token
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24*3});
    
    // sending the token
    res.status(202).json({token});

  } catch (error) {
      httpError(res, error);
  }
}

export const signupHandler = async (req, res) => {
  try {
    const {
      brandName,
      legalName,
      devicesState,
      username,
      name,
      email,
      password
    } = req.body;

    console.log(req.body);

    // validating if the logo has been provided
    if(!req.files?.logo){
      return res.status(403).json({message: {
        msg: "Please select a file for your logo",
        param: "logo",
        location: "files"
      }});
    }

    const path = req.files.logo.tempFilePath;
    const {public_id, secure_url} = await uploadImage(path);

    const tokenKey = generateUniqueKey();
    
    // creating the company
    const newCompany = new Company({
      brand_name: brandName,
      legal_name: legalName,
      logo: {
        public_id,
        secure_url
      },
      devices_state: devicesState,
      token_key: tokenKey
    });

    // creating the user and encrypting the password
    const newUser = new Users({
      username,
      name,
      email,
      password
    });
    newUser.password = await newUser.encryptPassword(password);

    // deteling the temp file from the server
    await fsAsync.unlink(path);

    // saving the user and the company as a transaction
    let session = null;
    try {
      session = await startSession();
      session.startTransaction();

      await newCompany.save({ session });
      await newUser.save({ session });

      await session.commitTransaction();
    } catch (error) {
      if (session) {
        await session.abortTransaction();
      }
      console.error(error);
      return httpError(res, error);
    } finally {
      if (session) {
        session.endSession();
      }
    }
    
    // creating the token
    const token = jwt.sign({key: tokenKey}, process.env.JWT_SECRET);

    // sending the token
    res.status(200).json({token});
  } catch (error) {
    httpError(res, error);
  }
}