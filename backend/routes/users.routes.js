import { Router } from 'express';
import { userCounter } from '../controllers/users.controller.js';

const router = new Router();

router.get('/', (req, res) => res.send("hi from users routes"));

router.get('/userCounter', userCounter);

export default router;