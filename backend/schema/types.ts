import { z } from "zod";

export const zUser = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});

export const zTask = z.object({
  title: z.string().nonempty(),
  description: z.string().optional(),
  isComplete: z.boolean(),
  userId: z.string().optional(),
});

export type User = z.infer<typeof zUser>;
export type Task = z.infer<typeof zTask>;
