import * as combinacoesModel from "../models/combinacoes.model.js";
import * as calcasModel from "../models/calcas.model.js";
import * as blusasModel from "../models/blusas.model.js";

export async function findAll() {
    return combinacoesModel.findAll();
}

export async function findById(id) {
    return combinacoesModel.findById(id);
}

function criarErro(mensagem, status) {
    const erro = new Error(mensagem);
    erro.status = status;
    return erro;
}

export async function create(dados) {
    const calca = await calcasModel.findById(dados.calcaId);

    if (!calca) {
        throw criarErro("Calça não encontrada", 404);
    }

    const blusa = await blusasModel.findById(dados.blusaId);

    if (!blusa) {
        throw criarErro("Blusa não encontrada", 404);
    }

    return combinacoesModel.create(dados);
}

export async function remove(id) {
    const resultado = await combinacoesModel.remove(id);

    if (!resultado) {
        return null;
    }

    return resultado;
}