import * as combinacoesService from "../services/combinacoes.service.js";

export async function listCombinacoes(req, res, next) {
    try {
        const combinacoes = await combinacoesService.findAll();
        res.json(combinacoes);
    } catch (err) {
        next(err);
    }
}

export async function getCombinacao(req, res, next) {
    try {
        const combinacao = await combinacoesService.findById(
            Number(req.params.id)
        );

        if (!combinacao) {
            return res.status(404).json({
                erro: "Combinação não encontrada"
            });
        }

        res.json(combinacao);
    } catch (err) {
        next(err);
    }
}

export async function createCombinacao(req, res, next) {
    try {
        const novaCombinacao = await combinacoesService.create(req.body);
        res.status(201).json(novaCombinacao);
    } catch (err) {
        next(err);
    }
}

export async function deleteCombinacao(req, res, next) {
    try {
        const resultado = await combinacoesService.remove(
            Number(req.params.id)
        );

        if (!resultado) {
            return res.status(404).json({
                erro: "Combinação não encontrada"
            });
        }

        res.status(204).end();
    } catch (err) {
        next(err);
    }
}