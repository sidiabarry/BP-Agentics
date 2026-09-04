import { createServer, request } from "node:http";
import { spawn } from "node:child_process";
import { connect } from "node:net";

const LISTEN_PORT = 43123;
const NEXT_PORT = 43124;

const child = spawn(
  "npx",
  ["next", "dev", "--hostname", "127.0.0.1", "--port", String(NEXT_PORT)],
  { stdio: "inherit", cwd: process.cwd(), env: process.env },
);

child.on("exit", (code, signal) => {
  if (signal !== "SIGTERM" && code) process.exit(code ?? 1);
});

function forwardHttp(req, res) {
  const headers = { ...req.headers };
  delete headers.upgrade;
  delete headers.connection;
  headers.host = `127.0.0.1:${NEXT_PORT}`;

  const upstream = request(
    {
      hostname: "127.0.0.1",
      port: NEXT_PORT,
      path: req.url,
      method: req.method,
      headers,
    },
    (incoming) => {
      res.writeHead(incoming.statusCode ?? 502, incoming.headers);
      incoming.pipe(res);
    },
  );

  upstream.on("error", () => {
    if (!res.headersSent) {
      res.writeHead(503, { "content-type": "text/plain; charset=utf-8" });
    }
    res.end("Dev-Server startet.");
  });

  req.pipe(upstream);
}

const server = createServer(forwardHttp);

server.on("upgrade", (req, socket, head) => {
  if ((req.headers.upgrade || "").toLowerCase() === "h2c") {
    const headers = { ...req.headers };
    delete headers.upgrade;
    delete headers.connection;
    delete headers["http2-settings"];
    headers.host = `127.0.0.1:${NEXT_PORT}`;
    const upstream = request(
      {
        hostname: "127.0.0.1",
        port: NEXT_PORT,
        path: req.url,
        method: req.method,
        headers,
      },
      (incoming) => {
        const chunks = [];
        incoming.on("data", (chunk) => chunks.push(chunk));
        incoming.on("end", () => {
          const body = Buffer.concat(chunks);
          const outHeaders = { ...incoming.headers };
          delete outHeaders["transfer-encoding"];
          outHeaders["content-length"] = String(body.length);
          socket.write(
            `HTTP/1.1 ${incoming.statusCode} ${incoming.statusMessage || "OK"}\r\n`,
          );
          for (const [key, value] of Object.entries(outHeaders)) {
            if (value === undefined) continue;
            socket.write(
              `${key}: ${Array.isArray(value) ? value.join(", ") : value}\r\n`,
            );
          }
          socket.write("\r\n");
          socket.end(body);
        });
      },
    );
    upstream.on("error", () => socket.destroy());
    if (head.length) upstream.write(head);
    upstream.end();
    return;
  }

  const upstream = connect(NEXT_PORT, "127.0.0.1", () => {
    const path = req.url || "/";
    let payload = `${req.method} ${path} HTTP/1.1\r\n`;
    for (const [key, value] of Object.entries(req.headers)) {
      if (value === undefined) continue;
      payload += `${key}: ${Array.isArray(value) ? value.join(", ") : value}\r\n`;
    }
    payload += "\r\n";
    upstream.write(payload);
    if (head.length) upstream.write(head);
    socket.pipe(upstream);
    upstream.pipe(socket);
  });

  upstream.on("error", () => socket.destroy());
  socket.on("error", () => upstream.destroy());
});

server.listen(LISTEN_PORT, "0.0.0.0", () => {
  console.log(`Preview proxy http://0.0.0.0:${LISTEN_PORT} → Next :${NEXT_PORT}`);
});

function shutdown() {
  server.close();
  child.kill("SIGTERM");
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
