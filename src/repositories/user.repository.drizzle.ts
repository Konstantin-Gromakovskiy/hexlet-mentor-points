import type { UserRepository } from '@/repositories/user.repository.interface'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import type { NewUser, User } from '@/domains'
import { usersTable } from '@/db'
import { eq } from 'drizzle-orm'

export class PostgresUserRepository implements UserRepository {
  constructor(private readonly db: NodePgDatabase) { }

  async findByTelegramId(telegramId: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(usersTable).where(eq(usersTable.telegramId, telegramId))
    return user
  }

  async createUser(user: NewUser): Promise<User | undefined> {
    const [createdUser] = await this.db.insert(usersTable).values(user).onConflictDoNothing({
      target: usersTable.telegramId,
    }).returning()

    return createdUser
  }
}
