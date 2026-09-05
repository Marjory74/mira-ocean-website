import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const posts=sqliteTable('posts',{id:text('id').primaryKey(),caption:text('caption').notNull(),image:text('image').notNull(),date:text('date').notNull()});
export const logs=sqliteTable('logs',{id:text('id').primaryKey(),text:text('text').notNull(),date:text('date').notNull()});
export const settings=sqliteTable('settings',{id:text('id').primaryKey(),value:text('value').notNull()});
