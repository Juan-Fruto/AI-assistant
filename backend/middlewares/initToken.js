import { httpError } from '../helpers/handleError.js';
import jwt from 'jsonwebtoken';

const initToken = (req, res, next) => {
  try {
    
    const initTokenHeader = req.headers.authorization;

    // verifyng if the auth header exists
    if(!initTokenHeader) res.status(401).json({message: "Unauthorized"});

    const token = initTokenHeader.split(' ')[1];

    // verifyng if the token exists
    if(!token) res.status(401).json({message: "Unauthorized"});

    // verifyng if the token is valid
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if(err) res.status(401).json({message: 'uninitialized'});

      req.body.initToken = payload.key;
      next();
    })

  } catch (error) {
    httpError(res, error);
  }
}

export default initToken;