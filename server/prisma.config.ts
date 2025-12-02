import dotenv from "dotenv";
import path from "node:path";
import { defineConfig, env } from "prisma/config";

// Load the .env that sits next to this config file (server/.env)
dotenv.config({ path: path.join(__dirname, ".env") });


export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
