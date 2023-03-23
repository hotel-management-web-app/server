# Intro
This is backend for [hotel-management-system-client](https://github.com/hotel-management-web-app/client) made in [Node js](https://nodejs.org/en) and [Typescript](https://www.typescriptlang.org/).

## System requirements
[Node.js v18.x.x](https://nodejs.org/en)

## Setup
```bash
# 1. Install all dependencies
yarn

# 2. Rename the .env.example filename to .env and set your local variables
mv .env.example .env

# 3. Migrate prisma.schema to database tables
yarn migrate

# 4. Seed database with example data
yarn seed

# 5. Start development server
yarn start:dev

```

Server will run on port: [5000](http://localhost:5000)
