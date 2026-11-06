import { readData, writeData } from "../db.js";

const ARQUIVO = "calcas.json";

export async function findAll() {
    return (await readData(ARQUIVO)).filter(calca => !calca.deletedAt);
}

function findActiveById(calcas, id) {
    return calcas.find(
        calca => calca.id === id && !calca.deletedAt
    ) || null;
}

export async function findById(id) {
    const calcas = await readData(ARQUIVO);
    return findActiveById(calcas, id);
}

export async function create(dados) {
    const calcas = await readData(ARQUIVO);
    const dataAtual = new Date().toISOString();

    const novoId = calcas.length
        ? Math.max(...calcas.map(calca => calca.id)) + 1
        : 1;

    const novaCalca = {
        ...dados,
        id: novoId,
        createdAt: dataAtual,
        updatedAt: dataAtual
    };

    calcas.push(novaCalca);

    await writeData(ARQUIVO, calcas);

    return novaCalca;
}

export async function update(id, dados) {
    const calcas = await readData(ARQUIVO);
    const calca = findActiveById(calcas, id);

    if (!calca) return null;

    const indice = calcas.indexOf(calca);

    calcas[indice] = {
        ...dados,
        id: id,
        createdAt: calca.createdAt,
        updatedAt: new Date().toISOString()
    };

    await writeData(ARQUIVO, calcas);

    return calcas[indice];
}

export async function patch(id, dados) {
    const calcas = await readData(ARQUIVO);
    const calca = findActiveById(calcas, id);

    if (!calca) return null;

    Object.assign(calca, dados);
    calca.updatedAt = new Date().toISOString();

    await writeData(ARQUIVO, calcas);

    return calca;
}

// Exclusão lógica
export async function remove(id) {
    const calcas = await readData(ARQUIVO);

    const calca = calcas.find(calca => calca.id === id);

    if (!calca) return null;

    if (calca.deletedAt) return "Já removida";

    calca.deletedAt = new Date().toISOString();

    await writeData(ARQUIVO, calcas);

    return calca;
}