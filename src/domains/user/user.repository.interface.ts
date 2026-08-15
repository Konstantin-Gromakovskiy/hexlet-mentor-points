import type { CreateUserData, User } from '@/domains'

export interface UserRepository {
  findByTelegramId(id: string): Promise<User | undefined>
  createUser(user: CreateUserData): Promise<User>
}
