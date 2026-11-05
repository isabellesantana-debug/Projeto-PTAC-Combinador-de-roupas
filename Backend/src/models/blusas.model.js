import { readData, writeData } from "../db.js";

const ARQUIVO = "blusas.json";

export async function findAll() {
    return (await readData(ARQUIVO)).filter(blusa => !blusa.deletedAt);
}

function findActiveById(blusas, id) {
    return blusas.find(
        blusa => blusa.id === id && !blusa.deletedAt
    ) || null;
}

export async function findById(id) {
    const blusas = await readData(ARQUIVO);
    return findActiveById(blusas, id);
}

export async function create(dados) {
    const blusas = await readData(ARQUIVO);
    const dataAtual = new Date().toISOString();
    const novoId = blusas.length ? Math.max(...blusas.map(blusa => blusa.id)) + 1 : 1;

    const novaBlusa = {
        ...dados,
        id: novoId,
        createdAt: dataAtual,
        updatedAt: dataAtual
    };

    blusas.push(novaBlusa);
    await writeData(ARQUIVO, blusas);
    return novaBlusa;
}

export async function update(id, dados) {
    const blusas = await readData(ARQUIVO);

    const blusa = findActiveById(blusas, id);
    if (!blusa) return null;

    const indice = blusas.indexOf(blusa);
    blusas[indice] = {
        ...dados,
        id: id,
        createdAt: blusa.createdAt,
        updatedAt: new Date().toISOString()
    };

    await writeData(ARQUIVO, blusas);
    return blusas[indice];
}

export async function patch(id, dados) {
    const blusas = await readData(ARQUIVO);

    const blusa = findActiveById(blusas, id);
    if (!blusa) return null;

    Object.assign(blusa, dados);
    blusa.updatedAt = new Date().toISOString();
    await writeData(ARQUIVO, blusas);
    return blusa;
}

//soft delete
export async function remove(id) {
    const blusas = await readData(ARQUIVO);

    const blusa = blusas.find(
        blusa => blusa.id === id
    );
    if (!blusa) return null;
    if (blusa.deletedAt) return "Já removida";

    blusa.deletedAt = new Date().toISOString();
    await writeData(ARQUIVO, blusas);
    return blusa;
}
