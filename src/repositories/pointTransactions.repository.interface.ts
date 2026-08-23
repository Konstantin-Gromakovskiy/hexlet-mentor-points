import type {
  AwardTransaction,
  CreateAwardTransaction,
  TransactionType,
  ActivityId,
  RewardRequestId,
  Balance,
} from '@/domains'

export interface PointTransactionsRepositoryInterface {
  createTransaction(transactionData: CreateAwardTransaction):
  Promise<AwardTransaction<TransactionType, ActivityId, RewardRequestId>>

  getBalance(userId: number): Promise<Balance>
}
