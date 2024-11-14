CREATE TABLE `analytics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`link_id` integer NOT NULL,
	`accessed_at` integer DEFAULT CAST(strftime('%s', 'now') AS INTEGER) NOT NULL,
	`ip_address` text,
	`user_agent` text,
	FOREIGN KEY (`link_id`) REFERENCES `links`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `links` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`original_url` text NOT NULL,
	`key` text NOT NULL,
	`user_id` integer NOT NULL,
	`created_at` integer DEFAULT CAST(strftime('%s', 'now') AS INTEGER) NOT NULL,
	`expires_at` integer DEFAULT CAST(strftime('%s', 'now') AS INTEGER) NOT NULL,
	`click_count` integer DEFAULT 0,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `links_key_unique` ON `links` (`key`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`avatar` text NOT NULL,
	`created_at` integer DEFAULT CAST(strftime('%s', 'now') AS INTEGER) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);