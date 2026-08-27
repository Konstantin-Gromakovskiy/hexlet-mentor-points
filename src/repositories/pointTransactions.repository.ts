import type { PointTransactionsRepositoryInterface } from './pointTransactions.repository.interface'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import type { NewTransaction, NewReserveTransaction, NewAwardTransaction, AwardTransaction } from '@/domains'
import { pointTransactionsTable } from '@/db'
import { sql, eq } from 'drizzle-orm'

const mapPointTransaction = (row: typeof pointTransactionsTable.$inferSelect) => {
  if (row.type === 'award') {
    if (row.activityId === null) throw new Error('Activity ID is required for award transactions')
    if (row.rewardRequestId !== null) throw new Error('Reward request ID must be null for award transactions')
    const { rewardRequestId: _, ...award } = row
    return { ...award, type: 'award' as const, activityId: row.activityId, reservedAmount: row.reservedAmount }
  }

  throw new Error('Invalid transaction type')
}

export class PointTransactionsRepository implements PointTransactionsRepositoryInterface {
  constructor(private readonly db: NodePgDatabase) { }

  async createTransaction(
    transactionData: NewAwardTransaction,
  ): Promise<AwardTransaction>

  async createTransaction(
    transactionData: NewReserveTransaction,
  ): Promise<never>

  async createTransaction(
    transactionData: NewTransaction,
  ): Promise<AwardTransaction> {
    if (transactionData.type === 'reserve') {
      throw new Error('Reserve transactions are not implemented')
    }
    const [createdAward] = await this.db.insert(pointTransactionsTable).values(transactionData).returning()
    if (!createdAward) throw new Error('Failed to create award')
    return mapPointTransaction(createdAward)
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
