import express from "express";
import blusasRoutes from "./routes/blusas.routes.js";
import { erroHandler } from "./middlewares/erro.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API Combinador de Roupas funcionando!")
});

app.use("/blusas", blusasRoutes);

// Tratamento de erros deve ficar depois das rotas
app.use(erroHandler);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});