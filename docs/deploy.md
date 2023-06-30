# Como fazer deploy <!-- omit in toc -->

## Sumário <!-- omit in toc -->

- [Pré-requisitos](#pré-requisitos)
- [Deploy](#deploy)

## Pré-requisitos

- [git](https://git-scm.com/downloads)
- [docker](https://docs.docker.com/get-docker/)
- [gmail](https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp)
- [node.js](https://github.com/nvm-sh/nvm#installing-and-updating)
- [postgreSQL](https://www.postgresql.org/download/)

## Deploy

1. Faça o clone do repositório:

```bash
git clone git@github.com:ed-henrique/cloud-file-sharing-platform.git
```

2. Crie uma conta no Google Cloud Platform:

- Vá até o [Google Cloud Console](https://console.cloud.google.com/)
- Crie sua conta usando a sua conta do gmail

3. Crie um projeto no Google Cloud Platform:

- Vá até o [Google Cloud Console](https://console.cloud.google.com/)
- Crie um novo projeto na página inicial onde está escrito "Crie ou selecione um projeto"

![GCS Image](image.png)

4. Crie um bucket no Google Cloud Storage:

- Vá até o [Google Cloud Console](https://console.cloud.google.com/)
- Selecione o projeto que você criou
- Crie um bucket na página inicial onde está escrito "Crie um bucket"

![GCS Image 2](image-1.png)

5. Gere um arquivo `.json` com as suas credenciais do Google Cloud Storage:

- Vá até o [Google Cloud Console](https://console.cloud.google.com/)
- Selecione seu projeto
- Vá até a página das [Contas de Serviço](https://console.cloud.google.com/iam-admin/serviceaccounts)
- Selecione a conta de serviço para a qual você quer gerar as credenciais
  - Se você precisar criar a conta de serviço, clique em **Criar conta de serviço**
  - Adicione um nome e descrição para a conta de serviço
  - Dê permissão de administrador para a conta de serviço no bucket que você criou
  - Clique em **Criar**
- Clique em **Chaves**
- Clique em **Adicionar chaves** e selecione **Criar nova chave**
- Clique em **Criar**
- A chave privada será gerada e baixada automaticamente
- Move o arquivo para a pasta `backend` com o nome `gcs.json`

1. Crie um arquivo `.env` baseado no arquivo `.env.example` na pasta raiz do projeto, adicionando o seguinte:

```bash
API_PORT=
JWT_SECRET=

POSTGRES_DB=
POSTGRES_PORT=
POSTGRES_HOST=
POSTGRES_USER=
POSTGRES_PASSWORD=

GCS_BUCKET_NAME=
GCS_PROJECT_ID=
```

7. Execute o comando abaixo para iniciar o Docker Compose:

```bash
docker-compose up -d
```

8. Verifique que tudo está funcionando:

- Acesse `https://localhost:443` (Você deve ver a página inicial da aplicação)
  - Caso o seu navegador não permita o acesso, clique em **Avançado** e depois em **Acessar este site (não recomendado)**
