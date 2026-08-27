import type {
  AwardTransaction, Balance, NewAwardTransaction, NewReserveTransaction,
} from '@/domains'

export interface PointTransactionsRepositoryInterface {
  createTransaction(transactionData: NewAwardTransaction):
  Promise<AwardTransaction>

  createTransaction(transactionData: NewReserveTransaction): Promise<never>

  getBalance(userId: number): Promise<Balance>
}
