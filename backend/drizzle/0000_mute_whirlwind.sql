CREATE SCHEMA "task-manager";
--> statement-breakpoint
CREATE TABLE "task-manager"."tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"isComplete" boolean DEFAULT false,
	"userId" uuid
);
--> statement-breakpoint
CREATE TABLE "task-manager"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "task-manager"."tasks" ADD CONSTRAINT "tasks_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "task-manager"."users"("id") ON DELETE cascade ON UPDATE no action;