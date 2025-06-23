import { Router } from "express";
import { registerSchema } from "../schema/user.schema.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { register } from "../controllers/user.controller.js";

const router = Router()

router.post("/register",validateSchema(registerSchema),register)


export default router