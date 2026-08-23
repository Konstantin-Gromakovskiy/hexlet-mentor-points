import type { PointTransactionsRepositoryInterface } from './pointTransactions.repository.interface'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import type { CreateAwardTransaction } from '@/domains'
import { pointTransactionsTable } from '@/db'
import { sql, eq } from 'drizzle-orm'

export class PointTransactionsRepository implements PointTransactionsRepositoryInterface {
  constructor(private readonly db: NodePgDatabase) { }

  async createTransaction(transactionData: CreateAwardTransaction) {
    const data: typeof pointTransactionsTable.$inferInsert = { ...transactionData, type: 'award' }

    const [createdAward] = await this.db.insert(pointTransactionsTable).values(data).returning()
    if (!createdAward) throw new Error('Failed to create award')
    return createdAward
  }

  async getBalance(userId: number) {
    const [balance] = await this.db.select({
      total: sql<number>`coalesce(sum(${pointTransactionsTable.amount}), 0)`,
      reserved: sql<number>`coalesce(sum(${pointTransactionsTable.reservedAmount}), 0)`,
      available: sql<number>`coalesce(
        sum(${pointTransactionsTable.amount}) - sum(${pointTransactionsTable.reservedAmount}), 0
      )`,
    }).from(pointTransactionsTable).where(eq(pointTransactionsTable.userId, userId))

    if (!balance) throw new Error('Failed to get balance')
    return { userId, ...balance }
  }
}
