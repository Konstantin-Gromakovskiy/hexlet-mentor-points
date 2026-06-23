import { integer, pgTable, varchar, timestamp, pgEnum } from 'drizzle-orm/pg-core'

const userRoleEnum = pgEnum('role', ['tutor', 'admin'])

export const usersTable = pgTable('users', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  telegramId: varchar('telegram_id', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 255 }),
  role: userRoleEnum().notNull().default('tutor'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
