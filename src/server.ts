import dotenv from "dotenv";
import { buildApp } from "./app.js";

dotenv.config();

const PORT = Number(process.env.PORT) || 4000;

const app = buildApp();

app.listen({ port: PORT, host: "127.0.0.1" }, () => {
  console.log(`Server running on ${PORT}`);
});