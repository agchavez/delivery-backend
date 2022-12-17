## Bakend divery Pidelow

### Dev Envirnment

- Install [Docker](https://www.docker.com/products/docker-desktop)
- Install [Docker Compose](https://docs.docker.com/compose/install/)
- Install [Node.js](https://nodejs.org/en/download/)

### Run

Create a `.env` file in the root directory with the following content:

```bash
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
```

Execute the following commands:

Create database by docker-compose
- `docker-compose up -d`

Install packages
- `npm install`


Run server
- `npm run start:dev`

