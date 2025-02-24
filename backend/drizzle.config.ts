import { defineConfig } from "drizzle-kit";
require("dotenv").config();

export default defineConfig({
  out: "./drizzle",
  schema: "./schema",
  dialect: "postgresql",
  dbCredentials: {
    // host: process.env.POSTGRES_HOST!,
    // port: 5433,
    // user: process.env.POSTGRES_USER!,
    // password: process.env.POSTGRES_PASSWORD!,
    // database: process.env.POSTGRES_DB!,
    // ssl: process.env.POSTGRES_SSL!,
    url: "postgres://tm:tm@localhost:5433/tm-db",
  },
});
