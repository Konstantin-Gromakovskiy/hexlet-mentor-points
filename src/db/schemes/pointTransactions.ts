import { integer, pgTable, pgEnum, varchar, timestamp } from 'drizzle-orm/pg-core'
import { activitiesTable } from './activities'
import { usersTable } from './users'

export const pointTransactionTypeEnum = pgEnum('point_transaction_type',
  ['award', 'reserve', 'release', 'spend', 'correction'])

export const pointTransactionsTable = pgTable('point_transactions', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  userId: integer('user_id').references(() => usersTable.id).notNull(),
  type: pointTransactionTypeEnum('type').notNull(),
  activityId: integer('activity_id').references(() => activitiesTable.id),
  rewardRequestId: integer('reward_request_id'),
  amount: integer('amount').notNull().default(0),
  reservedAmount: integer('reserved_amount').notNull().default(0),
  createdByUserId: integer('created_by_user_id').references(() => usersTable.id).notNull(),
  idempotencyKey: varchar('idempotency_key', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
