import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import {
  createUser,
  loginUser,
  getAuthUser,
} from "../controllers/user.controller.js";
import {signupSchema, loginSchema} from "../utils/auth.schema.js"
import { protectRoutes } from "../middlewares/protectRoute.js";
const router: Router = Router();

router.post("/register", validateBody(signupSchema), createUser);
router.post("/login", validateBody(loginSchema), loginUser)
router.get("/get-auth-user", protectRoutes, getAuthUser)

export default router;
