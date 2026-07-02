import { boolean, integer, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core'

export const activitiesTable = pgTable('activities', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  title: varchar('title', { length: 255 }).notNull().unique(),
  description: varchar('description', { length: 255 }),
  points: integer('points').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
