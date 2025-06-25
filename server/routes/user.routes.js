import { Router } from "express";
import { loginSchema, registerSchema} from "../schema/user.schema.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { login, register, updateUser } from "../controllers/user.controller.js";

const router = Router()

// Rutas para el usuario
router.post("/register",validateSchema(registerSchema),register)
router.post("/login",validateSchema(loginSchema),login)
router.put("/user/:id",updateUser)




export default router