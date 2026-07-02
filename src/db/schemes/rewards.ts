import { boolean, integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const rewardsTable = pgTable('rewards', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  title: varchar('title', { length: 255 }).notNull().unique(),
  description: varchar('description', { length: 255 }),
  price: integer('price').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
