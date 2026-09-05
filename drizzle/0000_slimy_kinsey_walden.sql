CREATE TABLE `logs` (
	`id` text PRIMARY KEY NOT NULL,
	`text` text NOT NULL,
	`date` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`caption` text NOT NULL,
	`image` text NOT NULL,
	`date` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
