export type TransactionType
  = 'award'
    | 'reserve'
    // | 'release'
    // | 'spend'
    // | 'correction'

type TransactionBase<T extends TransactionType> = {
  id: number
  userId: number
  type: T
  createdByUserId: number
  idempotencyKey: string
  createdAt: Date
}

export type AwardTransaction = TransactionBase<'award'> & {
  activityId: number
  rewardRequestId?: never
  amount: number
}

export type NewAwardTransaction = Omit<AwardTransaction, 'id' | 'createdAt' | 'amount'>

export type ReserveTransaction = TransactionBase<'reserve'> & {
  activityId?: never
  rewardRequestId: number
  amount: 0
  reservedAmount: number
}

export type NewReserveTransaction = Omit<ReserveTransaction, 'id' | 'createdAt'>

export type TransactionByType = {
  award: AwardTransaction
  reserve: ReserveTransaction
}
export type NewTransactionByType = {
  [K in TransactionType]: Omit<TransactionByType[K], 'id' | 'createdAt' | 'amount'>
}

export type Balance = {
  userId: number
  total: number
  available: number
  reserved: number
}

export type NewTransaction = NewTransactionByType[TransactionType]
