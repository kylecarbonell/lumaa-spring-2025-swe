import { drizzle } from '../$node_modules/drizzle-orm/node-postgres/index.js';

export function startDb() {
  const pg_ssl =
    process.env.POSTGRES_SSL == 'false' ? 'disable' : process.env.POSTGRES_SSL;

  const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}?sslmode=${pg_ssl}`;
  console.log(connectionString);

  const db = drizzle(connectionString);
  return db;
}
