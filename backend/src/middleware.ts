import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { zTask, zUser } from "schema/types";
const jwt = require("jsonwebtoken");

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const key = process.env.PRIVATE_KEY;
    const decode = jwt.verify(
      req.headers.authorization,
      key,
      function (err: Error, decode: boolean) {
        if (err) {
          return res.status(HttpStatus.UNAUTHORIZED).json({ error: err });
        }

        if (!decode) {
          return res
            .status(HttpStatus.UNAUTHORIZED)
            .json({ error: "Error verifying authorization token" });
        }

        next();
      },
    );
  }
}

@Injectable()
export class ValidateUser implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    //Ensure that the data being sent through the request is of the right types
    console.log("IN HERE VALID");
    const parse = zUser.safeParse(req.body);
    if (!parse.success) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: "Invalid input fields" });
    }

    req["validData"] = parse.data;

    next();
  }
}

@Injectable()
export class ValidateTask implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    //Ensure that the data being sent through the request is of the right types
    console.log("VALIDATE");
    console.log(req.body);
    const parse = zTask.safeParse(req.body);
    if (!parse.success) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: "Invalid input fields" });
    }

    console.log(parse.data);
    req["validData"] = parse.data;
    next();
  }
}
