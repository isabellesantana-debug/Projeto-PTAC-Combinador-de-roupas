import { readData, writeData } from "../db.js";

const ARQUIVO = "combinacoes.json";

export async function findAll() {
    return readData(ARQUIVO);
}

export async function findById(id) {
    const combinacoes = await readData(ARQUIVO);

    return combinacoes.find(
        combinacao => combinacao.id === id
    ) || null;
}

export async function create(dados) {
    const combinacoes = await readData(ARQUIVO);

    const dataAtual = new Date().toISOString();

    const novoId = combinacoes.length
        ? Math.max(...combinacoes.map(item => item.id)) + 1
        : 1;

    const novaCombinacao = {
        ...dados,
        id: novoId,
        createdAt: dataAtual
    };

    combinacoes.push(novaCombinacao);

    await writeData(ARQUIVO, combinacoes);

    return novaCombinacao;
}

export async function remove(id) {
    const combinacoes = await readData(ARQUIVO);

    const indice = combinacoes.findIndex(
        combinacao => combinacao.id === id
    );

    if (indice === -1) return null;

    const removida = combinacoes.splice(indice, 1)[0];

    await writeData(ARQUIVO, combinacoes);

    return removida;
}