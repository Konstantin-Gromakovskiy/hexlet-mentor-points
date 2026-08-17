import type { ActivityRepositoryInterface } from '@/repositories/activity.repository.interface'

export class AwardPointsService {
  constructor(private readonly activityRepository: ActivityRepositoryInterface) { }

  getAllActivities() {
    return this.activityRepository.getActivities()
  }

  getActiveActivities() {
    return this.activityRepository.getActivities({ active: true })
  }
}
