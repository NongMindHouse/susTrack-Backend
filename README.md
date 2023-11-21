# Node TS Express and Prisma

This Repository is a boilerplate to build a RESTful API with Express.js and Prisma using [TypeScript](https://www.typescriptlang.org/) and [yarn](https://yarnpkg.com/) for package management

## Usage

- To install package

```bash
yarn
```

- To start development

```bash
yarn dev
```

- To start production

```bash
yarn build
yarn start
```

- To work with prisma

```bash
npx prisma generate
npx prisma migrate dev
```

## Folder Structure

```md
.
├── 📂prisma/
│ └── schema.prisma
├── 📂src/
│ ├── 📂controller/
│ │ └── user.controller.ts
│ ├── 📂lib/
│ │ └── prisma.ts
│ ├── 📂middleware/
│ │ └── auth.ts
│ ├── 📂routes/
│ │ ├── index.ts
│ │ └── user.route.ts
│ ├── 📂types/
│ │ ├── 📂express/
│ │ │ └── index.ts
│ │ └── index.ts
│ └── server.ts
├── .env.example
├── package.json
├── yarn.lock
├── README.md
└── tsconfig.json
```
