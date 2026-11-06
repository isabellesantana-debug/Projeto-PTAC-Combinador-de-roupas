import { Router } from "express";

import * as calcasController from "../controllers/calcas.controller.js";

import { valida } from "../middlewares/valida.js";

import {
    calcaSchema,
    atualizarCalcaSchema,
    patchCalcaSchema
} from "../schemas/calca.schema.js";

const router = Router();

router.get("/", calcasController.listCalcas);

router.get("/:id", calcasController.getCalca);

router.post("/", valida(calcaSchema), calcasController.createCalca);

router.put("/:id", valida(atualizarCalcaSchema), calcasController.updateCalca);

router.patch("/:id", valida(patchCalcaSchema), calcasController.patchCalca);

router.delete("/:id", calcasController.deleteCalca);

export default router;