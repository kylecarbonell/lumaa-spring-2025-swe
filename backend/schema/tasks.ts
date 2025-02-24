import * as t from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

export const schema = t.pgSchema('task-manager');

export const tasks = schema.table('tasks', {
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  title: t.text().notNull(),
  description: t.text(),
  isComplete: t.boolean().default(false),
  userId: t.uuid().references(() => users.id, { onDelete: 'cascade' }),
});

export const users = schema.table('users', {
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  username: t.text().notNull().unique(),
  password: t.text().notNull(),
});
