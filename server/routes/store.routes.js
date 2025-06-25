import { Router } from "express";
import { createStore, updateStore } from "../controllers/stores.controller.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { createStoreSchema } from "../schema/store.schema.js";

const router = Router()

//Rutas para las tiendas
router.post("/create",validateSchema(createStoreSchema),createStore)
router.put("/update",updateStore)

export default router