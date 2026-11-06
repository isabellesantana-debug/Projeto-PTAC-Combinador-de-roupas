import * as calcasModel from "../models/calcas.model.js";

export async function findAll() {
    return calcasModel.findAll();
}

export async function findById(id) {
    return calcasModel.findById(id);
}

function criarErro(mensagem, status) {
    const erro = new Error(mensagem);
    erro.status = status;
    return erro;
}

function verificarNomeUnico(nome, calcas, idIgnorado = null) {
    const nomeNormalizado = nome.trim().toLowerCase();

    const duplicada = calcas.some(calca =>
        calca.id !== idIgnorado &&
        calca.nome.trim().toLowerCase() === nomeNormalizado
    );

    if (duplicada) {
        throw criarErro("Já existe uma calça ativa com esse nome", 409);
    }
}

function verificarCoresUnicas(cores) {
    const coresNormalizadas = cores.map(cor =>
        cor.trim().toLowerCase()
    );

    if (new Set(coresNormalizadas).size !== coresNormalizadas.length) {
        throw criarErro("Não é permitido cadastrar cores repetidas", 400);
    }
}

export async function create(dados) {
    const calcas = await calcasModel.findAll();

    verificarNomeUnico(dados.nome, calcas);
    verificarCoresUnicas(dados.cor);

    return calcasModel.create(dados);
}

export async function update(id, dados) {
    const calca = await calcasModel.findById(id);

    if (!calca) return null;

    const calcas = await calcasModel.findAll();

    verificarNomeUnico(dados.nome, calcas, id);
    verificarCoresUnicas(dados.cor);

    return calcasModel.update(id, dados);
}

export async function patch(id, dados) {
    const calca = await calcasModel.findById(id);

    if (!calca) return null;

    const calcas = await calcasModel.findAll();

    if (dados.nome !== undefined) {
        verificarNomeUnico(dados.nome, calcas, id);
    }

    if (dados.cor !== undefined) {
        verificarCoresUnicas(dados.cor);
    }

    return calcasModel.patch(id, dados);
}

export async function remove(id) {
    const resultado = await calcasModel.remove(id);

    if (resultado === "Já removida") {
        throw criarErro("Essa calça já foi removida", 409);
    }

    return resultado;
}