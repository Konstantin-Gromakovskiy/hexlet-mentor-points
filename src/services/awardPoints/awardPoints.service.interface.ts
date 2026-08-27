import type { Activity, AwardTransaction, Balance } from '@/domains'
import type { TransactionFailureReasons } from '@/repositories/pointTransactions.repository.interface'

export type CreateAwardResult
  = {
    ok: true
    result: {
      transaction: AwardTransaction
      activityTitle: Activity['title']
      balance: Balance
    }
    alreadyExists: boolean
  }
  | { ok: false, reason: TransactionFailureReasons }

export interface AwardPointsServiceInterface {
  getAllActivities(): Promise<Activity[]>
  getActiveActivities(): Promise<Activity[]>
  getActivityById(id: number): Promise<Activity | undefined>
  createAward(userId: number, activityId: number, idempotencyKey: string): Promise<CreateAwardResult>
}
