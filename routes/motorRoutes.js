import express from 'express';
const router = express.Router();

import {
    addmotor,
    showmotor,
    realTimeData,
    getlink,
} from '../controllers/motorcontroller.js';

router.route("/").get(showmotor);
router.route("/").post(addmotor);
router.route("/real-time").get(realTimeData)
router.route("/proxy").get(getlink)

export default router;