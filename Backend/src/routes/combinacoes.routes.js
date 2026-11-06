import { Router } from "express";

import * as combinacoesController from "../controllers/combinacoes.controller.js";

import { valida } from "../middlewares/valida.js";

import { combinacaoSchema } from "../schemas/combinacao.schema.js";

const router = Router();

// Listar todas as combinações
router.get("/", combinacoesController.listCombinacoes);

// Buscar uma combinação pelo ID
router.get("/:id", combinacoesController.getCombinacao);

// Salvar uma combinação
router.post("/", valida(combinacaoSchema), combinacoesController.createCombinacao);

// Excluir uma combinação
router.delete("/:id", combinacoesController.deleteCombinacao);

export default router;