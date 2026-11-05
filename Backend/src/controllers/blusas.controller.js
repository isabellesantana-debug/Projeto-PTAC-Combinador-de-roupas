import * as blusasService from "../services/blusas.service.js";

export async function listBlusas(req, res, next) {
    try {
        const blusas = await blusasService.findAll();
        res.json(blusas)

    } catch (err) { next(err) }
}

export async function getBlusa(req, res, next) {
    try {
        const blusa = await blusasService.findById(Number(req.params.id));
        if (!blusa) {
            return res.status(404).json({ erro: "Blusa não encontrada" });
        }
        res.json(blusa);

    } catch (err) { next(err)}
}

export async function createBlusa(req, res, next) {
    try {
        const novaBlusa = await blusasService.create(req.body);
        res.status(201).json(novaBlusa);

    } catch (err) { next(err) }
}

export async function updateBlusa(req, res, next) {
    try {
        const id = Number(req.params.id);
        const blusa = await blusasService.update(id, req.body);
        if (!blusa) {
            return res.status(404).json({ erro: "Blusa não encontrada"})
        }
        res.json(blusa)

    } catch (err) { next(err) }
}

export async function patchBlusa(req, res, next) {
    try {
        const id = Number(req.params.id);
        const blusa = await blusasService.patch(id, req.body);
        if (!blusa) {
            return res.status(404).json({ erro: "Blusa não encontrada" });
        }
        res.json(blusa);

    } catch (err) { next(err)}
}

export async function deleteBlusa(req, res, next) {
    try {
        const resultado = await blusasService.remove(Number(req.params.id));
        if (!resultado) {
            return res.status(404).json({ erro: "Blusa não encontrada" });
        }
        res.status(204).end();

    } catch (err) { next(err) }
}
