import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  first_name: varchar('name', { length: 255 }).notNull(),
  telegramId: varchar('telegramId', { length: 8 }).notNull(),
})
