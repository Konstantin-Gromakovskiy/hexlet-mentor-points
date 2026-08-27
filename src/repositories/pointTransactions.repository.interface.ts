import type {
  Activity,
  AwardTransaction, Balance, NewAwardTransaction, NewReserveTransaction,
} from '@/domains'

export const transactionFailureReasons = [
  'activity_not_found',
  'activity_archived',
  'invalid_award_request',
] as const

export type TransactionFailureReasons = typeof transactionFailureReasons[number]

export type CreateTransactionResult
  = | {
    ok: true
    result: Omit<AwardTransaction, 'activityTitle'>
    activityTitle: Activity['title']
    alreadyExists: boolean
  }
  | {
    ok: false
    reason: TransactionFailureReasons
  }

export interface PointTransactionsRepositoryInterface {
  createTransaction(transactionData: NewAwardTransaction):
  Promise<CreateTransactionResult>

  createTransaction(transactionData: NewReserveTransaction): Promise<never>

  getBalance(userId: number): Promise<Balance>
}
