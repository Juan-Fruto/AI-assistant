import Users from '../models/users.js';
import { httpError } from '../helpers/handleError.js';
import jwt from 'jsonwebtoken';

// fn to check if there is no users in the DB
export const userCounter = async (req, res) => {
    try {
        const usersLen = await Users.estimatedDocumentCount();
        console.log(usersLen)

        if(usersLen == 0){
            console.log("no users found");
            return res.status(204).send();
        }

        const token = jwt.sign({key: 'Ready'}, process.env.JWT_SECRET, {expiresIn: 60*60*24*3});
        
        console.log("continue");
        res.status(200).json({token});

    } catch (error) {
        httpError(res, error);
    }
}
