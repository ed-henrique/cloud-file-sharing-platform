# Cloud File Sharing Platform <!-- omit in toc -->

Plataforma de compartilhamento de arquivos segura em nuvem.

## Índice <!-- omit in toc -->

- [Deploy](#deploy)
- [Estrutura](#estrutura)
  - [Microsserviços](#microsserviços)
    - [Serviço de gerenciamento de arquivos](#serviço-de-gerenciamento-de-arquivos)
  - [Containers](#containers)
  - [APIs](#apis)
  - [Frontend](#frontend)
  - [Armazenamento](#armazenamento)

## Deploy

[Clique aqui](./docs/deploy.md).

## Estrutura

Para entender melhor a estrutura, há um diagrama disponível para as duas funções principais dele [aqui](./docs/backend.md).

### Microsserviços

#### Serviço de gerenciamento de arquivos

Responsável pela lógica central de gerenciamento de arquivos, incluindo armazenamento,
recuperação, exclusão e compartilhamento de arquivos.

### Containers

Cada microsserviço será encapsulado em um container, isolando o ambiente de execução e
tornando a aplicação portátil.

### APIs

São a ponte entre os microsserviços e o frontend da aplicação. Cada microsserviço terá uma
API RESTful para interagir com o frontend.

### Frontend

O frontend será uma aplicação web, contida em um container, onde o usuário poderá fazer
login, fazer upload, download e compartilhar arquivos.

Foi utilizado o template [Sneat](https://themeselection.com/products/sneat-bootstrap-html-admin-template/) da [ThemeSelection](https://themeselection.com) para agilizar o desenvolvimento do frontend.

### Armazenamento

O sistema de armazenamento de arquivos utilizado é o Google Cloud Storage (GCS). O GCS é um serviço de armazenamento de objetos que oferece alta disponibilidade e durabilidade. Os arquivos serão armazenados em buckets, que são contêineres para objetos. Os buckets podem ser criados e gerenciados através da API do GCS.
