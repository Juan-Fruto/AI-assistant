import Router from 'express';
import { loginHandler } from '../controllers/auth.controller.js';
import loginValidators from '../validators/login.js';

const router = new Router();

router.post('/login', loginValidators, loginHandler);

export default router;