# How to Set up Developer Environment <!-- omit in toc -->

This is still a work in progress, and the instructions below are not complete, as they don't take docker into consideration.

# Table of Contents <!-- omit in toc -->

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [API](#api)
    - [Routes](#routes)
    - [Examples](#examples)
      - [Signup](#signup)
      - [Login](#login)
      - [Logout](#logout)
      - [List files](#list-files)
      - [TODO - Upload files](#todo---upload-files)
      - [TODO - Download files](#todo---download-files)
      - [TODO - Delete files](#todo---delete-files)

## Prerequisites

- [git](https://git-scm.com/downloads)
- [docker](https://docs.docker.com/get-docker/)
- [gsutil](https://cloud.google.com/storage/docs/gsutil_install)
  - [gmail account](https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp)
- [node.js](https://github.com/nvm-sh/nvm#installing-and-updating)
- [postgreSQL](https://www.postgresql.org/download/)

## Installation

1. Clone the repository

```bash
git clone git@github.com:ed-henrique/cloud-file-sharing-platform.git
```

2. Install node modules

```bash
cd cloud-file-sharing-platform/backend
npm install
```

3. Create a PostgreSQL database

```bash
psql
CREATE DATABASE <database_name>;
```

3. Create a Google Cloud Storage bucket

```bash
gsutil mb -p <project_id> -c <storage_class> -l <region> gs://<bucket_name>
```

4. Generate a `.json` key file with your Google Cloud Storage service account credentials

- Go to the [Google Cloud Console](https://console.cloud.google.com/)
- Select your project
- Go to the [Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts) page
- Select the service account you want to create a key for
  - If you need to create a service account, click **Create Service Account**
  - Enter a name and description for the service account
  - Give admin permission to the bucket you created
  - Click **Create**
- Click **Keys**
- Click **Add Key**, then select **Create new key**
- Click **Create**
- The private key file is generated and downloaded to your machine
- Move the downloaded file to the `backend` directory of the project
- Change the code inside the `backend/routes/files.js` file to use the name of your key file

```js
const storage = new Storage({
  keyFilename: 'path/to/file.json',
  projectId: process.env.GCS_PROJECT_ID,
});
```


1. Create a `.env` based on the `.env.example` file in the `backend` directory of the project and add the following:

```bash
API_PORT=
JWT_SECRET=

POSTGRES_DB_NAME=
POSTGRES_PORT=
POSTGRES_HOST=
POSTGRES_USER=
POSTGRES_PASSWORD=

GCS_BUCKET_NAME=
GCS_PROJECT_ID=
```
5. Run the backend

```bash
npm run dev
```

## Usage

### API

#### Routes

|      Name      | Method |      Path       |     Description     |
| :------------: | :----: | :-------------: | :-----------------: |
|     Signup     |  POST  |  /users/signup  | Register a new user |
|     Login      |  POST  |  /users/login   |    Login a user     |
|     Logout     |  POST  |  /users/logout  |    Logout a user    |
|   List files   |  GET   |     /files      |   List all files    |
|  Upload files  |  POST  |  /files/upload  |    Upload files     |
| Download files |  GET   | /files/download |   Download files    |
|  Delete files  | DELETE |  /files/delete  |    Delete files     |

#### Examples

##### Signup

```js
fetch('/users/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'john_doe',
    email: 'john.doe@email.com',
    password: 'Test123!',
});
```

##### Login

```js
fetch('/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'john_doe',
    email: 'john.doe@email.com',
    password: 'Test123!',
  }),
});
```

##### Logout

```js
fetch('/users/logout', {
  method: 'POST',
  headers: {
    'Authorization': 'JWT_TOKEN',
    'Content-Type': 'application/json'
  },
});
```

##### List files

```js
fetch('/files', {
  method: 'GET',
  headers: {
    'Authorization': 'JWT_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'john_doe',
  }),
});
```

##### TODO - Upload files

##### TODO - Download files

##### TODO - Delete files
