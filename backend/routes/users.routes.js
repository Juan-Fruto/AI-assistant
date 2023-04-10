import { Router } from 'express';
import { userCounter } from '../controllers/users.controller'

const router = new Router();

router.get('/userCounter', userCounter);

export default router;