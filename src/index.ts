import { drizzle } from 'drizzle-orm/node-postgres'
import { usersTable } from './db/schema.js'
import { eq } from 'drizzle-orm'

const db = drizzle(process.env.DATABASE_URL!)

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: 'Костя',
    telegramId: '123456789',
  }

  await db.insert(usersTable).values(user)

  const users = await db.select().from(usersTable)
  console.log('Getting all users from the database: ', users)

  await db
    .update(usersTable)
    .set({
      name: 'Вова',
    })
    .where(eq(usersTable.telegramId, '123456789'))
  console.log('User info updated!')
}
main()
