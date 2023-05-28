import Router from 'express';
import authToken from '../middlewares/authToken.js';
import {
    getRules,
    addRule,
    getFacts,
    addFact
} from '../controllers/knowledge.controller.js';

const router = new Router();

router.get("/rules", authToken, getRules);

router.post("/rules", authToken, addRule);

router.get("/facts", authToken, authToken,getFacts);

router.post("/facts", authToken, addFact);

export default router;
