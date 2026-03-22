import cluster from "cluster";
import os from "os";
import http from "http";
import dotenv from "dotenv";
import { buildApp } from "../app.js";

dotenv.config({ quiet: true });

const PORT = Number(process.env.PORT) || 4000;
const cpus = os.cpus().length - 1;

if (cluster.isPrimary) {
  const workers: number[] = [];

  for (let i = 0; i < cpus; i++) {
    const port = PORT + i + 1;
    cluster.fork({ WORKER_PORT: port.toString() });
    workers.push(port);
  }

  let current = 0;

  const server = http.createServer((req, res) => {
    const targetPort = workers[current];
    current = (current + 1) % workers.length;

    const proxy = http.request(
      {
        hostname: "127.0.0.1",
        port: targetPort,
        path: req.url,
        method: req.method,
        headers: req.headers,
      },
      (pRes) => {
        res.writeHead(pRes.statusCode || 500, pRes.headers);
        pRes.pipe(res);
      }
    );

    req.pipe(proxy);
  });

  server.listen(PORT, "127.0.0.1", () => {
    console.log(`Load balancer on ${PORT}`);
  });

} else {
  const port = Number(process.env.WORKER_PORT);
  const app = buildApp();

  app.listen({ port, host: "127.0.0.1" }, () => {
    console.log(`Worker running on ${port}`);
  });
}