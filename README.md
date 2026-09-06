# HelloWorld

A minimal HelloWorld web application built with [Express](https://expressjs.com/) and vanilla JS.

## Requirements

- Node.js >= 20

## Setup

```bash
npm install
```

## Run

```bash
npm start
```

The server listens on `http://localhost:3000` (configurable via `PORT`/`HOST`).

## Endpoints

- `GET /` — styled HelloWorld page.
- `GET /api/hello?name=<name>` — returns `{ "message": "Hello, <name>!" }` (defaults to `World`).
- `GET /healthz` — health check, returns `{ "status": "ok" }`.

## Develop

```bash
npm run dev   # restart on file changes
```

## Test & lint

```bash
npm test
npm run lint
```
