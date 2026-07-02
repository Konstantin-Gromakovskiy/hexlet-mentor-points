import { usersTable, db } from '@/db'
import type { CreateUserData } from '@/domains'

export const registerUser = async (user: CreateUserData) => db
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
