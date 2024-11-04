import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from "drizzle-orm";
/**
 * Bảng user
 * @author vtson 04.11.2024
 */
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  avatar: text('avatar').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CAST(strftime('%s', 'now') AS INTEGER)`).notNull(),

});

/**
 * bản link
 * @author vtson 04.11.2024
 */
export const links = sqliteTable('links', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  originalUrl: text('original_url').notNull(),
  key: text('key').unique().notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CAST(strftime('%s', 'now') AS INTEGER)`),
  /**Ngày hết hạn */
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull().default(sql`CAST(strftime('%s', 'now') AS INTEGER)`),
  /**Đếm số lần bấm */
  clickCount: integer('click_count').default(0),
})

/**
 * Bản thống kê lượt click
 * @author vtson 04.11.2024
 */
export const analytics = sqliteTable('analytics', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  linkId: integer('link_id').references(() => links.id).notNull(),
  accessedAt: integer('accessed_at', { mode: 'timestamp' }).notNull().default(sql`CAST(strftime('%s', 'now') AS INTEGER)`),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
});