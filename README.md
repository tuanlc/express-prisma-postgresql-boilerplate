# Boilerplate for express, postgresql, prisma and typescript

This boilerplate follows clean architecture with SOLID principles. This sample define a simple user schema and handle two endpoints that allows users to create new accounts and login by them. There is also a middleware to validate JWT tokens that are provided by clients with `Bearer` authorization header.

## Technologies

- Environment: Nodejs
- Language: Typescript
- Framework: Expressjs
- ORM: Prisma
- Database: Postgresql
- Authentication: Basic, JWT
- Inversion Of Control (D in SOLID): Awillix
- Password hash library: bcryptjs

## Prequisite

- Create the `.env` file by copying the `.env.example` file
- Database:

  - The easy way to have a Postgresql server is using docker or you can use Postgreql cloud
  - Once you have the database connection URL, replace the sample one in the `.env` file by yours

- Run Postgres database at port 5432

```bash
docker run -e POSTGRES_PASSWORD=secrect -e POSTGRES_USER=postgres -p 5432:5432 postgres:15-alpine
```

- Create `.env` file from `.env.template` and update the `DATABASE_URL`:

```bash
cp .env.template .env
```

- Edit file `.env`

```
DATABASE_URL="postgresql://postgres:secrect@localhost:5432/prisma-posgres-boilerplate?schema=public"
```

- Install dependencies

```bash
npm ci
```

- Initialize database schema

```bash
npx prisma migrate dev --name "init" --preview-feature
```

## Docker build

```bash
docker build -t app-name .
```

## NPM scripts

1. Run dev

```bash
npm run dev
```

2. Linting

```bash
npm run lint
```

3. Build

```bash
npm run build
```

4. Run production

```bash
npm run start
```
