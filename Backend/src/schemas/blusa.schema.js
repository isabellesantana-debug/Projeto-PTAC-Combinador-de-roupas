import { z } from "zod";

export const blusaSchema = z.object({
    nome: z.string().trim().min(1, "O nome é obrigatório"),
    tipo: z.string().trim().min(1, "O tipo é obrigatório"),
    cor: z.array(
        z.string().trim().min(1, "A cor não pode ser vazia"))
        .min(1, "Informe pelo menos uma cor"),
    estampa: z.string().trim().min(1).optional(),
    manga: z.string().trim().min(1, "A manga é obrigatória"),
    tecido: z.string().trim().optional(),
    ocasiao: z.string().trim().optional(),
    descricao: z.string().optional(),
    imagem: z.object({
        tipo: z.enum(["url", "upload"]),
        valor: z.string().trim().min(1, "O valor da imagem é obrigatório")
    }).optional()
});

export const atualizarBlusaSchema = blusaSchema;

export const patchBlusaSchema = blusaSchema.partial().refine(
    dados => Object.keys(dados).length > 0,
    "Informe pelo menos um campo para atualizar"
);
