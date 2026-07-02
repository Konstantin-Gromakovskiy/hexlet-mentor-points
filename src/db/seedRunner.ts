import { activitySeeds, rewardSeeds } from './seed'
import { db, activitiesTable, rewardsTable } from '@/db'

const main = async () => {
  await db.transaction(async (tx) => {
    await tx.insert(activitiesTable).values(activitySeeds).onConflictDoNothing({ target: activitiesTable.title })
    await tx.insert(rewardsTable).values(rewardSeeds).onConflictDoNothing({ target: rewardsTable.title })
  })

  console.log('Seeds completed')
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
