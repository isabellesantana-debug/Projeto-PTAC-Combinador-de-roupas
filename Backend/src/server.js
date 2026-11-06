import express from "express";
import blusasRoutes from "./routes/blusas.routes.js";
import { erroHandler } from "./middlewares/erro.js";
import { log } from "./middlewares/log.js";
import calcasRoutes from "./routes/calcas.routes.js";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(log);

app.get("/", (req, res) => {
    res.send("API Combinador de Roupas funcionando!")
});

app.use("/blusas", blusasRoutes);
app.use("/calcas", calcasRoutes);
app.use(erroHandler);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});