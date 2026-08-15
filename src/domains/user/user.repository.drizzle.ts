import type { UserRepository } from '@/domains/user/user.repository.interface'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import type { CreateUserData, User } from '@/domains'
import { usersTable } from '@/db'
import { eq } from 'drizzle-orm'

export class PostgresUserRepository implements UserRepository {
  constructor(private readonly db: NodePgDatabase) { }

  async findByTelegramId(telegramId: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(usersTable).where(eq(usersTable.telegramId, telegramId))
    return user
  }

  async createUser(user: CreateUserData): Promise<User> {
    const [createdUser] = await this.db.insert(usersTable).values(user).onConflictDoUpdate({
      target: usersTable.telegramId,
      set: {
        firstName: user.firstName,
        username: user.username,
        updatedAt: new Date(),
      },
    }).returning()

    if (!createdUser) throw new Error('User was not returned after upsert')

    return createdUser
  }
}
