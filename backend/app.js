import "./dotenv.js";
import cors from "cors";
import express from "express";
import routes from "./routes/index.js";
import sequelize from "./config/sequelize.js";
import { createServer } from "https";
import { readFileSync } from "fs";

const port = process.env.API_PORT;

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(cors());

// Configuração do certificado autoassinado
const privateKey = readFileSync(".certs/private.key", "utf8");
const certificate = readFileSync(".certs/certificate.crt", "utf8");
const credentials = { key: privateKey, cert: certificate };

app.use(routes);

// Criação do servidor HTTPS
// const httpsServer = createServer(credentials, app);

await sequelize.sync()

// Inicia o servidor
app.listen(port, () => {
	console.log(`Servidor HTTPS executando na porta ${port}`);
});