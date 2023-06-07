# Cloud File Sharing Platform

Plataforma de compartilhamento de arquivos segura em nuvem

## Funcionamento da aplicação

### Envio de arquivos

```mermaid
flowchart TD
    frontend[Aplicação web]
    micro_auth[Microsserviço de autenticação e autorização]
    micro_crypto[Microsserviço de criptografia]
    micro_cloud[Microsserviço de gerenciamento de arquivos]
    database[(Google Cloud Storage)]

    frontend --> micro_auth
    micro_auth --> ask[Autenticado?]
    ask --> |Sim| ask2[Autorizado?]
    ask --> |Não| problem[Usuário não está cadastrado no sistema]
    ask2 --> |Sim| micro_cloud
    ask2 --> |Não| problem2[Usuário não pode enviar arquivos]
    micro_cloud --> micro_crypto
    micro_crypto --> ask3[Criptografado?]
    ask3 --> |Sim| ask4[Armazenado?]
    ask3 --> |Não| problem3[Arquivo não está criptografado e não é seguro enviá-lo ao banco de dados]
    ask4 --> |Sim| database
    ask4 --> |Não| problem4[Houve um erro ao armazenar o arquivo]
```

### Download de arquivos

```mermaid
flowchart TD
    frontend[Aplicação web]
    micro_auth[Microsserviço de autenticação e autorização]
    micro_crypto[Microsserviço de criptografia]
    micro_cloud[Microsserviço de gerenciamento de arquivos]
    database[(Google Cloud Storage)]

    frontend --> micro_auth
    micro_auth --> ask[Autenticado?]
    ask --> |Sim| ask2[Autorizado?]
    ask --> |Não| problem[Usuário não está cadastrado no sistema]
    ask2 --> |Sim| micro_cloud
    ask2 --> |Não| problem2[Usuário não pode fazer download de arquivos]
    micro_cloud --> database
    database --> ask3[Encontrou o arquivo?]
    ask3 --> |Sim| micro_crypto
    ask3 --> |Não| problem3[Houve um erro ao encontrar o arquivo]
    micro_crypto --> ask4[Descriptografado?]
    ask4 --> |Sim| answer[Retorna o arquivo ao usuário]
    ask4 --> |Não| problem4[Erro na descriptografia do arquivo]
```

## Estrutura

### Microsserviços

#### Serviço de autenticação e autorização

Responsável por autenticar usuários e fornecer autorização para realizar operações como
upload, download e compartilhamento de arquivos.

#### Serviço de gerenciamento de arquivos

Responsável pela lógica central de gerenciamento de arquivos, incluindo armazenamento,
recuperação, exclusão e compartilhamento de arquivos.

#### Serviço de criptografia

Este serviço pode ser responsável pela criptografia e descriptografia dos arquivos,
garantindo a segurança dos dados durante o trânsito e repouso.

### Containers

Cada microsserviço será encapsulado em um container, isolando o ambiente de execução e
tornando a aplicação portátil.

### APIs

São a ponte entre os microsserviços e o frontend da aplicação. Cada microsserviço terá uma
API RESTful para interagir com o frontend.

### Frontend

O frontend será uma aplicação web, contida em um container, onde o usuário poderá fazer
login, fazer upload, download e compartilhar arquivos.

### Armazenamento

Será utilizado um sistema de armazenamento em nuvem, como Amazon S3 ou Google Cloud
Platform. Eles são escaláveis e seguros.

## Possíveis melhorias

[ ] - Compactação dos arquivos para que eles consumam menos espaço
[ ] - Uso de ferramentas para balanceamento de carga
