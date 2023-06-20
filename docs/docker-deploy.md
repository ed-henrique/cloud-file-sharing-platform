# Docker Deploy

## Pré-requisitos

Antes de começar, certifique-se de ter o Docker e o Docker Compose instalados no seu sistema. Você pode encontrar as instruções de instalação do Docker em https://docs.docker.com/get-docker/ e do Docker Compose em https://docs.docker.com/compose/install/.

## Passo 1: Baixando o repositório

Para começar, você precisará baixar o repositório que contém o arquivo `docker-compose.yml`. Você pode fazer isso executando o seguinte comando no terminal:

```bash
git clone https://github.com/ed-henrique/cloud-file-sharing-platform.git
cd cloud-file-sharing-platform
```

Substitua `<URL_DO_REPOSITORIO>` pela URL do repositório que contém o arquivo `docker-compose.yml` e `<DIRETORIO_DO_REPOSITORIO>` pelo diretório no qual você deseja baixar o repositório.

## Passo 2: Configurando o banco de dados PostgreSQL

O serviço "postgres" no arquivo docker-compose.yml é responsável por configurar o banco de dados PostgreSQL. Você pode personalizar as configurações do banco de dados definindo as variáveis de ambiente sob o campo "environment". As variáveis de ambiente disponíveis são as seguintes:

- `POSTGRES_DB`: Nome do banco de dados (definido como "CFSP-DB" por padrão).
- `POSTGRES_USER`: Nome de usuário do banco de dados (definido como "CFSP-USER" por padrão).
- `POSTGRES_PASSWORD`: Senha do banco de dados (definida como "CFSP-PASSWORD" por padrão).

Você pode alterar esses valores de acordo com suas preferências.

## Passo 3: Configurando o serviço "backend"

O serviço "backend" é responsável por construir e executar o código da API . Ele depende do serviço "postgres" para funcionar corretamente.

### Configuração do ambiente do backend

Você pode configurar as variáveis de ambiente do backend definindo os valores sob o campo "environment". As variáveis de ambiente disponíveis são as seguintes:

### Configuração do servidor de aplicativos (APT)

- `API_PORT`: Porta em que o backend será executado dentro do contêiner (definido como 3000 por padrão).
- `JWT_SECRET`: Essa variável define a chave secreta usada para autenticação JWT. É importante manter essa chave em segredo para garantir a segurança do sistema. Para obter uma chave secreta, você pode seguir estas etapas:
1. Abra um terminal ou prompt de comando.
2. Execute o seguinte comando para gerar uma chave secreta aleatória:
    
    ```bash
    
    openssl rand -base64 64
    ```
    

Isso gerará uma sequência aleatória de caracteres que servirá como sua chave secreta.

- Copie a chave gerada e atribua-a à variável `JWT_SECRET` no arquivo `docker-compose.yml`.

### Configuração do banco de dados PostgreSQL

- `POSTGRES_PORT`: Porta do banco de dados PostgreSQL (definida como 5432 por padrão).
- `POSTGRES_HOST`: Host do banco de dados PostgreSQL (definido como "postgres" por padrão).
- `POSTGRES_DB_NAME`: Nome do banco de dados PostgreSQL (definido como "CFSP-DB" por padrão).
- `POSTGRES_USER`: Nome de usuário do banco de dados PostgreSQL (definido como "CFSP-USER" por padrão).
- `POSTGRES_PASSWORD`: Senha do banco de dados PostgreSQL (definida como "CFSP-PASSWORD" por padrão).

### Configuração do Google Cloud Storage (GCS)

O serviço de armazenamento do Google Cloud (GCS) requer a configuração de duas variáveis de ambiente: `GCS_BUCKET_NAME` e `GCS_PROJECT_ID`.

- `GCS_BUCKET_NAME`: Essa variável define o nome do bucket do Google Cloud Storage onde os arquivos serão armazenados. Por padrão, está definida como "${GCS_BUCKET_NAME}". Para configurar corretamente essa variável, você precisa ter um bucket do GCS existente ou criar um novo.
    
    Se você não tiver um bucket do GCS, você pode seguir um tutorial como [este](https://cloud.google.com/storage/docs/creating-buckets) para criar um bucket no Google Cloud Storage ou seguir as intruções disponiveis [aqui](environment.md).
    
- `GCS_PROJECT_ID`: Essa variável define o ID do projeto do Google Cloud. Por padrão, está definida como "${GCS_PROJECT_ID}". Você pode obter o ID do projeto acessando a [página de console do Google Cloud](https://console.cloud.google.com/) e selecionando o projeto desejado. O ID do projeto será exibido na página de visão geral do projeto.

## Passo 4: Configurando o serviço "NGINX"

Passo 4: Configurando o serviço "NGINX"

O serviço "NGINX" é responsável por servir o frontend e atuar como um proxy reverso para rotear as solicitações para o backend. Para configurar corretamente o serviço "NGINX" no arquivo `docker-compose.yml`, siga as instruções abaixo:

1. Configuração do ambiente do NGINX:

No campo "environment" do serviço "nginx", você pode definir as variáveis de ambiente necessárias para configurar o NGINX. As variáveis de ambiente disponíveis são as seguintes:

- `API_PROTOCOL`: Protocolo a ser usado para se comunicar com a API (definido como "https" por padrão).
- `API_IP`: Endereço IP da API. Certifique-se de substituir `${public ip api}` pelo endereço IP real da sua API.
- `API_PORT`: Porta em que a API está sendo executada (definida como 3000 por padrão).

## Passo 5: Configurando o HTTPS

OBS: por padrão o serviço já tem um certificado configurado, mas recomendado trocar por motivos de segurança.

**Passo 1: Acessando os diretórios**

Primeiro, abra o terminal e navegue até o diretório do backend usando o seguinte comando:

```bash
cd cloud-file-sharing-platform/backend/

```

Em seguida, vamos criar um novo diretório chamado `.certs`. Digite o seguinte comando para criar o diretório:

```bash
mkdir .certs

```

Agora, acesse o diretório `.certs` com o comando:

```bash
cd .certs

```

**Passo 2: Gerando a chave privada e a solicitação de assinatura de certificado (CSR) para o backend**

Vamos gerar a chave privada (private key) para o backend. Digite o seguinte comando:

```bash
openssl genrsa -out private.key 2048

```

Em seguida, vamos gerar a solicitação de assinatura de certificado (CSR). Certifique-se de substituir `example.com` pelo nome de domínio correto para o seu backend. Use o comando abaixo:

```bash
openssl req -new -key private.key -out csr.pem -subj "/CN=example.com"

```

Agora, vamos assinar o certificado autoassinado com o seguinte comando:

```bash
openssl x509 -req -days 365 -in csr.pem -signkey private.key -out certificate.crt

```

**Passo 3: Configurando as chaves SSL para o frontend**

Vamos agora configurar as chaves SSL para o frontend. No terminal, digite o seguinte comando para acessar o diretório do frontend:

```bash
cd cloud-file-sharing-platform/frontend/nginx_conf/ssl

```

Em seguida, gere a chave privada (private key) usando o comando abaixo:

```bash
openssl genrsa -out private.key 2048

```

Agora, vamos gerar a solicitação de assinatura de certificado (CSR) para o frontend. Lembre-se de substituir `example.com` pelo nome de domínio correto. Digite o seguinte comando:

```bash
openssl req -new -key private.key -out csr.pem -subj "/CN=example.com"

```

Finalmente, vamos assinar o certificado autoassinado usando o comando:

```bash
openssl x509 -req -days 365 -in csr.pem -signkey private.key -out certificate.crt

```

**Passo 4: Colocando os certificados nos diretórios corretos**

Certifique-se de que os certificados gerados estejam nos diretórios corretos mencionados anteriormente. O certificado do backend (`certificate.crt` e `private.key`) deve ser colocado no diretório `cloud-file-sharing-platform/backend/.certs/`. Já o certificado do frontend (`certificate.crt` e `private.key`) deve ser colocado no diretório `cloud-file-sharing-platform/frontend/nginx_conf/ssl/`.

Agora você concluiu a configuração do certificado SSL para o seu serviço com frontend e API. Lembre-se de substituir `example.com` pelos nomes de domínio corretos para o seu backend e frontend. Utilizar certificados emitidos por uma autoridade de certificação confiável é altamente recomendado para ambientes de produção

## Passo 6: Subindo o Docker Compose

Agora que você concluiu todas as configurações necessárias, é hora de subir o Docker Compose e iniciar o serviço de cloud storage com o Google Cloud Storage. Siga as etapas abaixo:

1. Abra um terminal ou prompt de comando.
2. Navegue até o diretório onde você baixou o repositório que contém o arquivo `docker-compose.yml`.
3. Execute o seguinte comando para iniciar o Docker Compose:

```
docker-compose up -d

```

1. Aguarde alguns momentos enquanto o Docker Compose baixa as imagens necessárias e inicia os contêineres.
2. Após a conclusão, verifique se todos os contêineres estão em execução usando o seguinte comando:

```
docker-compose ps

```

1. Você verá uma lista dos contêineres em execução, incluindo o serviço "backend", "postgres" e "nginx".
2. Agora, você pode acessar sua plataforma de compartilhamento de arquivos através do seu navegador da web. Digite o endereço IP do servidor onde o Docker Compose está sendo executado seguido pela porta `80`. Por exemplo:

```
http://<ENDERECO_IP_DO_SERVIDOR>:80

```

Certifique-se de substituir `<ENDERECO_IP_DO_SERVIDOR>` pelo endereço IP real do seu servidor.

1. Se tudo estiver configurado corretamente, você será redirecionado para a plataforma de compartilhamento de arquivos e poderá começar a usar o serviço de cloud storage com o Google Cloud Storage.