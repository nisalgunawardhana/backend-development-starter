# Item CRUD API

Minimal Express setup using ES modules.

## Setup
- Run `npm init -y` if you don't have a `package.json` yet.
- Add `"type": "module"` to `package.json`.
- Install dependencies: `npm install express`.
- Optionally set `PORT` in a `.env` file (defaults to 3000).

## Run
- Start the server: `node src/index.js`.

## Routes
- `GET /items` — list all items.
- `GET /items/:id` — fetch one item.
- `POST /items` — create an item (body fields are stored as-is).
- `PUT /items/:id` — replace an item.
- `DELETE /items/:id` — remove an item.

Data is stored in `data/data.json`; routes read and write that file directly.
