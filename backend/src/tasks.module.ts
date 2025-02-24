import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { TaskController } from "src/tasks.controller";
import { UserController } from "src/users.controller";
import {
  AuthenticateMiddleware,
  ValidateTask,
  ValidateUser,
} from "src/middleware";

@Module({
  controllers: [TaskController, UserController],
})
export class TaskModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateUser).forRoutes("auth");

    consumer.apply(AuthenticateMiddleware).forRoutes("tasks");
    consumer.apply(ValidateTask).forRoutes(
      {
        method: RequestMethod.POST,
        path: "tasks",
      },
      {
        method: RequestMethod.PUT,
        path: "tasks/*splat",
      },
    );
  }
}
