import { rewardsTable } from '@/db'

export type Reward = typeof rewardsTable.$inferSelect
export type CreateRewardData = typeof rewardsTable.$inferInsert
