import type { NewUser, User } from '@/domains'

export interface UserRepository {
  findByTelegramId(id: string): Promise<User | undefined>
  createUser(user: NewUser): Promise<User>
}
