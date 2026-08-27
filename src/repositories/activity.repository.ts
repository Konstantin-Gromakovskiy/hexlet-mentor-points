import type { ActivityRepositoryInterface } from '@/repositories/activity.repository.interface'
import type { Activity } from '@/domains'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { activitiesTable } from '@/db'
import { eq } from 'drizzle-orm'

export class ActivityRepository implements ActivityRepositoryInterface {
  constructor(private readonly db: NodePgDatabase) {}
  async getActivities(options: { active?: boolean }): Promise<Activity[]> {
    return options?.active
      ? await this.db.select().from(activitiesTable).where(eq(activitiesTable.isActive, true))
      : await this.db.select().from(activitiesTable)
  }

  async getActivityById(id: number): Promise<Activity | undefined> {
    const [activity] = await this.db.select().from(activitiesTable).where(eq(activitiesTable.id, id))
    return activity
  }
}
