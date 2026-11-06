import blusasRoutes from "./routes/blusas.routes.js";

import express from "express";

import { erroHandler } from "./middlewares/erro.js";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(erroHandler);

app.get("/", (req, res) => {
    res.send("API Combinador de Roupas funcionando!")
});

app.use("/blusas", blusasRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});

