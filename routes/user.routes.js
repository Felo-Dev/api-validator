import { Router } from "express";
const router = Router();

import * as usersCtrl  from "../controllers/user.controller"
import { autJwt, veritySignup } from "../middlewares/index.js";
router.post(
    "/",
    [
  autJwt.verifyToken,
  autJwt.isAdmin,
  veritySignup.checkDuplicateUsernameOrEmail,
],
    usersCtrl.createUser
  );

export default router;