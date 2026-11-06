import { Router } from "express";

import * as combinacoesController from "../controllers/combinacoes.controller.js";

import { valida } from "../middlewares/valida.js";

import { combinacaoSchema } from "../schemas/combinacoes.schema.js";

const router = Router();

router.get("/", combinacoesController.listCombinacoes);

router.get("/:id", combinacoesController.getCombinacao);

router.post("/", valida(combinacaoSchema), combinacoesController.createCombinacao);

router.delete("/:id", combinacoesController.deleteCombinacao);

export default router;