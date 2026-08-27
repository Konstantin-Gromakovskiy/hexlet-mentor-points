import type { ActivityRepositoryInterface } from '@/repositories/activity.repository.interface'
import type {
  PointTransactionsRepositoryInterface,
} from '@/repositories/pointTransactions.repository.interface'
import type { NewTransaction } from '@/domains'
import type { AwardPointsServiceInterface } from './awardPoints.service.interface'

export class AwardPointsService implements AwardPointsServiceInterface {
  constructor(
    private readonly transactionsRepository: PointTransactionsRepositoryInterface,
    private readonly activityRepository: ActivityRepositoryInterface,
  ) { }

  getAllActivities() {
    return this.activityRepository.getActivities()
  }

  // todo: уточнить тип для активных активностей
  getActiveActivities() {
    return this.activityRepository.getActivities({ active: true })
  }

  getActivityById(id: number) {
    return this.activityRepository.getActivityById(id)
  }

  async createAward(userId: number, activityId: number, idempotencyKey: string) {
    const newTransaction: NewTransaction = {
      type: 'award' as const,
      activityId: activityId,
      createdByUserId: userId,
      userId,
      idempotencyKey,
    }
    const result = await this.transactionsRepository.createTransaction(newTransaction)
    if (!result.ok) return result

    const balance = await this.transactionsRepository.getBalance(userId)
    return {
      ok: true as const,
      result: {
        transaction: result.result,
        activityTitle: result.activityTitle,
        balance,
      },
      alreadyExists: result.alreadyExists,
    }
  }
}
