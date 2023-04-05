import Router from 'express';
import {
    getRules,
    addRule,
    getFacts,
    adFact
} from '../controllers/knowledge.controller.js';

const router = new Router();

router.get("/rules", getRules);

router.post("/rules", addRule);

router.get("/facts", getFacts);

router.post("/facts", adFact);

export default router;
