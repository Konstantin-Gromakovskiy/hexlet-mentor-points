import { activitiesTable } from '@/db'

export type Activity = typeof activitiesTable.$inferSelect
export type CreateActivityData = typeof activitiesTable.$inferInsert
