import * as blusasModel from "../models/blusas.model.js";

export async function findAll() { return blusasModel.findAll() }
export async function findById(id) { return blusasModel.findById(id) }


function criarErro(mensagem, status) {
    const erro = new Error(mensagem);
    erro.status = status;
    return erro;
}

function verificarNomeUnico(nome, blusas, idIgnorado = null) {
    const nomeNormalizado = nome.trim().toLowerCase();
    const duplicada = blusas.some(blusa =>
        blusa.id !== idIgnorado &&
        blusa.nome.trim().toLowerCase() === nomeNormalizado
    );
    if (duplicada) throw criarErro("Já existe uma blusa ativa com esse nome", 409);
}

// Verifica se existem cores repetidas
function verificarCoresUnicas(cores) {
    const coresNormalizadas = cores.map(cor => cor.trim().toLowerCase());
    if (new Set(coresNormalizadas).size !== coresNormalizadas.length) {
        throw criarErro("Não é permitido cadastrar cores repetidas", 400);
    }
}


export async function create(dados) {
    const blusas = await blusasModel.findAll();
    verificarNomeUnico(dados.nome, blusas);
    verificarCoresUnicas(dados.cor);
    return blusasModel.create(dados);
}

export async function update(id, dados) {
    const blusa = await blusasModel.findById(id);
    if (!blusa) return null;

    const blusas = await blusasModel.findAll();

    verificarNomeUnico(dados.nome, blusas, id);
    verificarCoresUnicas(dados.cor);

    return blusasModel.update(id, dados);
}

export async function patch(id, dados) {
    const blusa = await blusasModel.findById(id);
    if (!blusa) return null;

    const blusas = await blusasModel.findAll();

    if (dados.nome !== undefined) verificarNomeUnico(dados.nome, blusas, id);
    if (dados.cor !== undefined) verificarCoresUnicas(dados.cor);

    return blusasModel.patch(id, dados);
}

export async function remove(id) {
    const resultado = await blusasModel.remove(id);
    if (resultado === "Já removida") throw criarErro("Essa blusa já foi removida", 409);
    return resultado;
}