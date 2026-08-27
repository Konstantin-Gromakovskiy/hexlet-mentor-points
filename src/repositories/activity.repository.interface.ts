import type { Activity } from '@/domains'

export interface ActivityRepositoryInterface {
  getActivities(options?: { active?: boolean }): Promise<Activity[]>
  getActivityById(id: number): Promise<Activity | undefined>
}
