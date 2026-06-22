import { drizzle } from 'drizzle-orm/node-postgres'
import { usersTable } from './db/schema.js'

const db = drizzle(process.env.DATABASE_URL!)

async function addFirstUser() {
  const user: typeof usersTable.$inferInsert = {
    firstName: 'Костя',
    telegramId: '123456789',
  }

  await db.insert(usersTable).values(user)
}

async function main() {
  await addFirstUser()
}
main()
