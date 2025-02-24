import { Controller, Get, HttpStatus, Post, Req, Res } from "../$node_modules/@nestjs/common/index.js";
import { eq, sql } from "../$node_modules/drizzle-orm/index.js";
import { Response, Request } from "../$node_modules/@types/express/index.js";
import { tasks, users } from "schema/tasks";
import { db } from "src/main";
import { generateToken } from "src/user.service";
import { User, zUser } from "schema/types";
const bcrypt = require("bcrypt");

@Controller("auth")
export class UserController {
  saltRounds: number;
  constructor() {
    this.saltRounds = 10;
  }

  @Post("register")
  async register(@Res() res: Response, @Req() req: Request) {
    //Hash the password through bcrypt
    console.log("IN HERE");
    const validData: User = await req["validData"];

    console.log(validData);

    bcrypt.hash(
      validData.password,
      this.saltRounds,
      async function (err: Error, hash: string) {
        if (err) {
          return res.json({ error: err }).status(HttpStatus.BAD_REQUEST);
        }
        validData.password = hash;

        //Insert validated data into the database
        const insert = await db
          .insert(users)
          .values(validData)
          .onConflictDoNothing()
          .returning();
        console.log("THIS IS INSERT", insert);

        //Check if a new user was inserted correctly
        if (insert.length == 0) {
          console.log("RETURNING HERE");
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ error: `User '${validData.username}' already exists` });
        }

        const token = generateToken(insert[0].id);
        console.log({
          message: `Successfully created account ${validData.username}`,
          token: token,
        });
        return res.status(HttpStatus.CREATED).json({
          message: `Successfully created account ${validData.username}`,
          token: token,
        });
      },
    );
  }

  @Post("login")
  async login(@Res() res: Response, @Req() req: Request) {
    //Ensure data sent through the request is correctly typed
    const validData: User = req["validData"];

    const user = await db
      .select()
      .from(users)
      .where(eq(users.username, validData.username));

    if (user.length == 0) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ error: "User not found" });
    }

    bcrypt.compare(
      validData.password,
      user[0].password,
      function (err: Error, result: boolean) {
        if (err) {
          return res.status(HttpStatus.UNAUTHORIZED).json({ error: err });
        }

        console.log(err, result);

        if (!result) {
          return res
            .status(HttpStatus.UNAUTHORIZED)
            .json({ error: "Incorrect password" });
        }

        const token = generateToken(user[0].id);

        return res.status(HttpStatus.OK).json({
          message: `Successfully logged into ${user[0].username}`,
          token: token,
        });
      },
    );
  }
}
