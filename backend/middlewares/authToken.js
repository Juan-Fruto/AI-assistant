import { httpError } from '../helpers/handleError.js';
import jwt from 'jsonwebtoken';

const authToken = (req, res, next) => {
  try {
    
    const authHeader = req.headers.authorization;

    // verifyng if the auth header exists
    if(!authHeader) res.status(401).json({message: "Unauthorized"});

    const token = authHeader.split(' ')[1];

    // verifyng if the token exists
    if(!token) res.status(401).json({message: "Unauthorized"});

    // verifyng if the token is valid
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if(err) res.status(401).json({message: 'Unauthorized'});

      req.body.userId = payload.id;
      next();
    })

  } catch (error) {
    httpError(res, error);
  }
}

export default authToken;