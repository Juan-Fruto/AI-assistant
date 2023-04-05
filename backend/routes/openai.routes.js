import Router from 'express';
import {sendPrompt} from '../controllers/openai.controller.js';

const router = new Router();

router.post("/text", sendPrompt);

export default router;
