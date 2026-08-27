import type {
  CreateTransactionResult, PointTransactionsRepositoryInterface,
} from './pointTransactions.repository.interface'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import type { NewTransaction, NewReserveTransaction, NewAwardTransaction } from '@/domains'
import { activitiesTable, pointTransactionsTable } from '@/db'
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

  async createTransaction(transactionData: NewAwardTransaction): Promise<CreateTransactionResult>
  async createTransaction(transactionData: NewReserveTransaction): Promise<never>
  async createTransaction(transactionData: NewTransaction): Promise<CreateTransactionResult> {
    if (transactionData.type === 'reserve') throw new Error('Reserve transactions are not implemented')

    const transaction = await this.db.transaction(async (tx) => {
      const [activity] = await tx.select()
        .from(activitiesTable)
        .where(eq(activitiesTable.id, transactionData.activityId))
        .for('update')

      if (!activity) return { ok: false, reason: 'activity_not_found' } as const
      if (!activity.isActive) return { ok: false, reason: 'activity_archived' } as const

      const [createdTransaction] = await tx.insert(pointTransactionsTable)
        .values({ ...transactionData, activityId: activity.id, amount: activity.points })
        .onConflictDoNothing({ target: pointTransactionsTable.idempotencyKey })
        .returning()

      return { ok: true, result: createdTransaction, activityTitle: activity.title } as const
    })

    if (!transaction.ok) return transaction

    if (transaction.result) {
      return {
        ok: true,
        result: mapPointTransaction(transaction.result),
        activityTitle: transaction.activityTitle,
        alreadyExists: false,
      }
    }
    const existingTransaction = await this.getTransactionByIdempotencyKey(transactionData.idempotencyKey)
    if (!existingTransaction) throw new Error('Idempotency conflict, but transaction was not found')

    const isSameRequest = existingTransaction.userId === transactionData.userId
      && existingTransaction.createdByUserId === transactionData.createdByUserId
      && existingTransaction.type === transactionData.type
      && existingTransaction.activityId === transactionData.activityId

    if (!isSameRequest) return {
      ok: false,
      reason: 'invalid_award_request',
    }

    return {
      ok: true,
      result: mapPointTransaction(existingTransaction),
      activityTitle: transaction.activityTitle,
      alreadyExists: true,
    }
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

  private async getTransactionByIdempotencyKey(idempotencyKey: string) {
    const [transaction] = await this.db.select()
      .from(pointTransactionsTable)
      .where(eq(pointTransactionsTable.idempotencyKey, idempotencyKey))
    return transaction
  }
}
