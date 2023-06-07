const express = require('express');
const routes = require('../routes/index.js');
const https = require('https');
const fs = require('fs');

const app = express();

// Configuração do certificado autoassinado
const privateKey = fs.readFileSync('.certs/private.key', 'utf8');
const certificate = fs.readFileSync('.certs/certificate.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Configuração das rotas

app.use(routes);

// Criação do servidor HTTPS
const httpsServer = https.createServer(credentials, app);

// Inicia o servidor
httpsServer.listen(8443, () => {
  console.log(`Servidor HTTPS executando na porta 443`);
});