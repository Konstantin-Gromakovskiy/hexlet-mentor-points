import { db } from '@/db'
import { usersTable } from '@/db/schema'
import type { User } from '@/domains/users'

export const registerUser = async (user: User) => db
  .insert(usersTable)
  .values(user)
  .onConflictDoUpdate({
    target: usersTable.telegramId,
    set: {
      firstName: user.firstName,
      username: user.username,
      updatedAt: new Date(),
      role: user.role,
    },
  })
