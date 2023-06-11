# Cloud File Sharing Platform <!-- omit in toc -->

Plataforma de compartilhamento de arquivos segura em nuvem.

# Índice <!-- omit in toc -->

- [O Que Falta Fazer?](#o-que-falta-fazer)
- [Estrutura](#estrutura)
  - [Microsserviços](#microsserviços)
    - [Serviço de gerenciamento de arquivos](#serviço-de-gerenciamento-de-arquivos)
  - [Containers](#containers)
  - [APIs](#apis)
  - [Frontend](#frontend)
  - [Armazenamento](#armazenamento)

## O Que Falta Fazer?

Tarefas marcadas com ⚡ podem ser implementadas bem rápido, e as marcadas com 🔥 são essenciais para a finalização do projeto.

- [ ] 🔥 Implementar algumas rotas da API
  - [ ] 🔥 Logout de usuário
  - [ ] 🔥 ⚡ Download de arquivos
    - [ ] Fazer download de mais de um arquivo ao mesmo tempo
  - [ ] 🔥 ⚡ Upload de arquivos
    - [ ] Fazer upload de mais de um arquivo ao mesmo tempo
  - [ ] 🔥 ⚡ Remoção de arquivos
    - [ ] Fazer remoção de mais de um arquivo ao mesmo tempo
- [ ] 🔥 ⚡ Integrar backend com frontend
- [ ] 🔥 Implementar frontend (SPA)
  - [ ] 🔥 Fazer tela de login
  - [ ] 🔥 Fazer tela de signup
- [ ] 🔥 Dividir a aplicação em containers
  - [ ] 🔥 Criar Dockerfile para cada microsserviço
  - [ ] 🔥 Criar Dockerfile para o frontend
  - [ ] 🔥 Criar Dockerfile para o banco de dados
  - [ ] 🔥 Criar Dockerfile para a API
- [ ] 🔥 ⚡ Criar arquivo docker-compose.yml
- [ ] ⚡ Finalizar documentação
- [ ] ⚡ (Opcional) Compactação dos arquivos
- [ ] ⚡ (Opcional) Implementar testes manuais
- [ ] ⚡ (Opcional) Implementar CI/CD
- [ ] (Opcional) Implementar logs
- [ ] (Opcional) Criar script para deploy da aplicação

## Estrutura

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

### Armazenamento

O sistema de armazenamento de arquivos utilizado é o Google Cloud Storage (GCS). O GCS é um serviço de armazenamento de objetos que oferece alta disponibilidade e durabilidade. Os arquivos serão armazenados em buckets, que são contêineres para objetos. Os buckets podem ser criados e gerenciados através da API do GCS.
