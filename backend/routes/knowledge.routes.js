import Router from 'express';
import authToken from '../middlewares/authToken.js';
import initToken from '../middlewares/initToken.js';
import {
    getRules,
    addRule,
    deleteRule,
    getFacts,
    addFact,
    getDevices,
    addDevice,
    deleteDevice,
    searchDevice,
    getSpecs
} from '../controllers/knowledge.controller.js';

const router = new Router();

router.use(initToken);
router.use(authToken);

router.get("/rules", getRules);

router.post("/rules", addRule);

router.delete("/rules/:id", deleteRule);

router.get("/devices", getDevices);

router.get("/devices/search/:name", searchDevice);

router.get("/devices/specs/:id", getSpecs);

router.post("/devices", addDevice);

router.delete("/devices/:id", deleteDevice);

router.get("/facts", authToken,getFacts);

router.post("/facts", addFact);

export default router;
