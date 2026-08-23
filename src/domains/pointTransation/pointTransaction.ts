export type TransactionType = 'award' | 'reserve' | 'release' | 'spend' | 'correction'
export type ActivityId = number | null
export type RewardRequestId = number | null

export type AwardTransaction<
  T extends TransactionType, A extends ActivityId, R extends RewardRequestId,
> = {
  id: number
  userId: number
  type: T
  activityId: A
  rewardRequestId: R
  amount: number
  reservedAmount: number
  createdByUserId: number
  idempotencyKey: string
}

export type Balance = {
  userId: number
  total: number
  available: number
  reserved: number
}

export type CreateAwardTransaction = Omit<AwardTransaction<TransactionType, ActivityId, RewardRequestId>, 'id'>
