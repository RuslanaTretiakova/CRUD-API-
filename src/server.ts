import { buildApp } from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT) || 4000;

const app = buildApp();

app.listen({ port: PORT }, () => {
  console.log(`Server running on ${PORT}`);
});