
import { Router } from "express";

import * as blusasController from "../controllers/blusas.controller.js";

import { valida } from "../middlewares/valida.js";

import {
    blusaSchema,
    atualizarBlusaSchema,
    patchBlusaSchema
} from "../schemas/blusa.schema.js";

const router = Router();

router.get("/", blusasController.listBlusas);

router.get("/:id", blusasController.getBlusa);

router.post("/", valida(blusaSchema), blusasController.createBlusa);

router.put("/:id", valida(atualizarBlusaSchema), blusasController.updateBlusa);

router.patch("/:id", valida(patchBlusaSchema), blusasController.patchBlusa);

router.delete("/:id", blusasController.deleteBlusa);

export default router;
