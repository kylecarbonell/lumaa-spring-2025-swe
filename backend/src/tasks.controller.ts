import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Req,
  Query,
  Delete,
  Param,
  Put,
} from "../$node_modules/@nestjs/common/index.js";
import { Response } from "../$node_modules/@types/express/index.js";
import { tasks, users } from "schema/tasks";
import { db } from "src/main";

import { eq, sql } from "../$node_modules/drizzle-orm/index.js";
import { Task } from "schema/types";

@Controller("tasks")
export class TaskController {
  @Get()
  async getAll(@Res() res: Response, @Query("user") param: string) {
    const t = await db
      .select({
        id: tasks.id,
        title: tasks.title,
        description: tasks.description,
        isComplete: tasks.isComplete,
      })
      .from(tasks)
      .leftJoin(users, eq(users.username, param))
      .where(eq(users.id, tasks.userId));

    // console.log(t);
    res.status(HttpStatus.ACCEPTED).json({ tasks: t });
  }

  @Post()
  async insert(@Res() res: Response, @Req() req: Request) {
    console.log("IN CONTROLLER");
    const data: Task = req["validData"];
    console.log(data);
    const select = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, sql<string>`${data.userId}`));

    data.userId = select[0].id;
    console.log(data);

    const insert = await db.insert(tasks).values(data).returning();

    console.log(insert);

    if (!insert) {
      return res.status(400).json({ error: "Error adding new task" });
    }

    return res.status(200).json({ message: "Successfully added new task" });
  }

  @Delete(":id")
  async delete(
    @Res() res: Response,
    @Req() req: Request,
    @Param("id") id: string,
  ) {
    const del = await db.delete(tasks).where(eq(tasks.id, id));

    if (del.rowCount == 0) {
      return res.status(400).json({ error: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  }

  @Put(":id")
  async update(
    @Res() res: Response,
    @Req() req: Request,
    @Param("id") param: string,
  ) {
    const data: Task = req["validData"];

    const select = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, sql<string>`${data.userId}`));

    data.userId = select[0].id;

    const insert = await db.update(tasks).set(data).where(eq(tasks.id, param));

    if (!insert) {
      return res.status(400).json({ error: "Error editing new task" });
    }

    return res.status(200).json({ message: "Successfully edited task" });
  }
}
