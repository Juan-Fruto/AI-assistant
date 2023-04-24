import Router from 'express';
import { loginHandler, signup } from '../controllers/auth.controller.js';
import loginValidators from '../validators/login.js';
import singupValidators from '../validators/singup.js';

const router = new Router();

router.post('/login', loginValidators, loginHandler);

router.post('/createUser', singupValidators, signup);

export default router;