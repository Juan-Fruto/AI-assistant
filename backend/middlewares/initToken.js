import { httpError } from '../helpers/handleError.js';
import jwt from 'jsonwebtoken';
import { areUsers } from '../helpers/userCounter.js';

const initToken = (req, res, next) => {
  try {
    
    const initTokenHeader = req.headers['x-init-token'];
    let errors = 0;

    // verifyng if the auth header exists
    if(!initTokenHeader) errors++;

    const token = initTokenHeader.split(' ')[1];

    // verifyng if the token exists
    if(!token) errors++;

    // verifyng if the token is valid
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      
      if(err) errors++;

      if(errors > 0){
        const usersExist  = await areUsers();

        console.log(errors);

        if(usersExist) return res.status(401).json({message: 'uninitialized'});

        return res.status(307).json({message: 'There are no users'});
      }

      req.body.initToken = payload.key;
      next();
    })

  } catch (error) {
    httpError(res, error);
  }
}

export default initToken;