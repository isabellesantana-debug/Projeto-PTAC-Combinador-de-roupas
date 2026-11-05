import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, "data");

export async function readData(arquivo) {
    const caminho = join(DB_PATH, arquivo)

    try {
        const raw = await readFile(caminho, "utf-8")
        return JSON.parse(raw)

    } catch (err) {
        if (err.code === "ENOENT") return []
        throw err;
    }
}

export async function writeData(arquivo, dados) {
    const caminho = join(DB_PATH, arquivo);
    await writeFile(caminho, JSON.stringify(dados, null, 2), "utf-8");
}