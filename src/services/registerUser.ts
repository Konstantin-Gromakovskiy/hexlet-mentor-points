import { db } from '../db/index.js'
import { usersTable } from '../db/schema.js'

type User = typeof usersTable.$inferInsert

export const registerUser = async (user: User) => db
  .insert(usersTable)
  .values(user)
  .onConflictDoUpdate({
    target: usersTable.telegramId,
    set: {
      firstName: user.firstName,
      username: user.username,
      updatedAt: new Date(),
    },
  })
