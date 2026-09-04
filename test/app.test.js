import { test } from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../src/app.js";

function listen(app) {
  return new Promise((resolve) => {
    const server = app.listen(0, "127.0.0.1", () => resolve(server));
  });
}

test("GET /api/hello defaults to World", async () => {
  const server = await listen(createApp());
  const { port } = server.address();
  try {
    const res = await fetch(`http://127.0.0.1:${port}/api/hello`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.deepEqual(body, { message: "Hello, World!" });
  } finally {
    server.close();
  }
});

test("GET /api/hello respects the name query", async () => {
  const server = await listen(createApp());
  const { port } = server.address();
  try {
    const res = await fetch(`http://127.0.0.1:${port}/api/hello?name=Cursor`);
    const body = await res.json();
    assert.deepEqual(body, { message: "Hello, Cursor!" });
  } finally {
    server.close();
  }
});

test("GET /healthz reports ok", async () => {
  const server = await listen(createApp());
  const { port } = server.address();
  try {
    const res = await fetch(`http://127.0.0.1:${port}/healthz`);
    const body = await res.json();
    assert.deepEqual(body, { status: "ok" });
  } finally {
    server.close();
  }
});

test("serves the static index page", async () => {
  const server = await listen(createApp());
  const { port } = server.address();
  try {
    const res = await fetch(`http://127.0.0.1:${port}/`);
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.match(html, /HelloWorld/);
  } finally {
    server.close();
  }
});
