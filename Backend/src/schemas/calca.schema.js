import { z } from "zod";

export const calcaSchema = z.object({
    nome: z.string().trim().min(1, "O nome é obrigatório"),

    tipo: z.string().trim().min(1, "O tipo é obrigatório"),

    cor: z.array(
        z.string().trim().min(1, "A cor não pode ser vazia")
    ).min(1, "Informe pelo menos uma cor"),

    modelagem: z.string().trim().min(1, "A modelagem é obrigatória"),

    cintura: z.string().trim().min(1, "A cintura é obrigatória"),

    estampa: z.string().trim().min(1).optional(),

    tecido: z.string().trim().optional(),

    ocasiao: z.string().trim().optional(),

    descricao: z.string().optional(),

    imagem: z.object({
        tipo: z.enum(["url", "upload"]),
        valor: z.string().trim().min(1, "O valor da imagem é obrigatório")
    }).optional()
});

export const atualizarCalcaSchema = calcaSchema;

export const patchCalcaSchema = calcaSchema.partial().refine(
    dados => Object.keys(dados).length > 0,
    "Informe pelo menos um campo para atualizar"
);