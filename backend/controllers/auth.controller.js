import Users from '../models/users.js';
import jwt from 'jsonwebtoken';

export const loginHandler = async (req, res) => {
  try {
      
    const {username, password} = req.body;
    
    const user = await Users.findOne({username});

    if(!user){
      res.status(403).json({message: "the user does not exist"})
    }

    const matchPassword = await user.matchPassword(password);

    if(!matchPassword){
      res.status(403).json({message: "incorrect password"});
    }

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiressIn: 60*60*24*3});
    
    res.status(202).json({token});

  } catch (error) {
      console.error('error', error);
      res.status(500).json({"error": error});
  }
}

export const signup = (req, res) => {
  try {
    const {
      brandName,
      legalName,
      logo,
      username,
      name,
      email,
      password
    } = req.body;

    res.status(200).json({});
  } catch (error) {
    console.error('error', error);
    res.status(500).json({"error": error});
  }
}