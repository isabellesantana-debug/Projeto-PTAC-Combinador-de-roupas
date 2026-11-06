import * as calcasService from "../services/calcas.service.js";

export async function listCalcas(req, res, next) {
    try {
        const calcas = await calcasService.findAll();
        res.json(calcas);
    } catch (err) {
        next(err);
    }
}

export async function getCalca(req, res, next) {
    try {
        const calca = await calcasService.findById(Number(req.params.id));

        if (!calca) {
            return res.status(404).json({ erro: "Calça não encontrada" });
        }

        res.json(calca);
    } catch (err) {
        next(err);
    }
}

export async function createCalca(req, res, next) {
    try {
        const novaCalca = await calcasService.create(req.body);
        res.status(201).json(novaCalca);
    } catch (err) {
        next(err);
    }
}

export async function updateCalca(req, res, next) {
    try {
        const id = Number(req.params.id);
        const calca = await calcasService.update(id, req.body);

        if (!calca) {
            return res.status(404).json({ erro: "Calça não encontrada" });
        }

        res.json(calca);
    } catch (err) {
        next(err);
    }
}

export async function patchCalca(req, res, next) {
    try {
        const id = Number(req.params.id);
        const calca = await calcasService.patch(id, req.body);

        if (!calca) {
            return res.status(404).json({ erro: "Calça não encontrada" });
        }

        res.json(calca);
    } catch (err) {
        next(err);
    }
}

export async function deleteCalca(req, res, next) {
    try {
        const resultado = await calcasService.remove(Number(req.params.id));

        if (!resultado) {
            return res.status(404).json({ erro: "Calça não encontrada" });
        }

        res.status(204).end();
    } catch (err) {
        next(err);
    }
}