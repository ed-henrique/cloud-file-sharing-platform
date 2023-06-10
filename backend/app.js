import cors from "cors";
import express from "express";
import routes from "./routes/index.js";
import { createServer } from "https";
import { readFileSync } from "fs";

const app = express();
app.use(express.json());
app.use(cors())

// Configuração do certificado autoassinado
const privateKey = readFileSync(".certs/private.key", "utf8");
const certificate = readFileSync(".certs/certificate.crt", "utf8");
const credentials = { key: privateKey, cert: certificate };

// Configuração das rotas

app.use(routes);

// Criação do servidor HTTPS
// const httpsServer = createServer(credentials, app);

// Inicia o servidor
app.listen(3000, () => {
	console.log(`Servidor HTTPS executando na porta 3000`);
});
