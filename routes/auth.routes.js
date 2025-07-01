import { Router } from "express";
const router = Router();

import * as authCtrl from '../controllers/auth.controllers.js';


router.post('/signup', authCtrl.signup);
router.post('/signin', authCtrl.signin);

export default router; 