import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  first_name: varchar('name', { length: 255 }).notNull(),
  telegram_id: varchar('telegramId', { length: 255 }).notNull(),
  username: varchar('username', { length: 255 }).notNull(),
  created_at: varchar('createdAt', { length: 255 }).notNull(),
  updated_at: varchar('updatedAt', { length: 255 }).notNull(),
})
