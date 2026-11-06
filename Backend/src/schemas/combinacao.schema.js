import { z } from "zod";

export const combinacaoSchema = z.object({
    calcaId: z.number().int().positive("Informe uma calça válida"),
    blusaId: z.number().int().positive("Informe uma blusa válida")
});