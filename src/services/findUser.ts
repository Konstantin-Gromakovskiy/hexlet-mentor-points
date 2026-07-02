import { usersTable, db } from '@/db'
import { eq } from 'drizzle-orm'
import type { User } from '@/domains'

export const findUser = async (telegramId: string): Promise<User | undefined> => {
  const [user] = await db.select().from(usersTable).where(eq(usersTable.telegramId, telegramId))
  return user
}
