import { NestFactory } from "@nestjs/core";
import { TaskModule } from "./tasks.module.js";
import { startDb } from "../schema/db.js";
require("dotenv").config();

async function bootstrap() {
  try {
    const app = await NestFactory.create(TaskModule);
    const port = process.env.PORT ?? 3000;
    app.enableCors();
    await app.listen(port);

    console.log(`Listening on ${await app.getUrl()}`);
  } catch (e) {
    console.log("ERROR CONNECTING");
  }
}

bootstrap();
export const db = startDb();
