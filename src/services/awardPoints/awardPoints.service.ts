import type { ActivityRepositoryInterface } from '@/repositories/activity.repository.interface'
import type {
  PointTransactionsRepositoryInterface,
} from '@/repositories/pointTransactions.repository.interface'
import type { NewTransaction } from '@/domains'

export class AwardPointsService {
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
    const activity = await this.getActivityById(activityId)
    if (!activity) throw new Error('Activity not found')
    const newTransaction: NewTransaction = {
      type: 'award' as const,
      activityId: activity.id,
      amount: activity.points,
      createdByUserId: userId,
      userId,
      idempotencyKey,
    }
    return await this.transactionsRepository.createTransaction(newTransaction)
  }
}
