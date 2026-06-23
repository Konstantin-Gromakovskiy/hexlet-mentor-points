import { db } from '@/db'
import { usersTable } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const checkUser = async (telegramId: string) =>
  db.select().from(usersTable).where(eq(usersTable.telegramId, telegramId))
