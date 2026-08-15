import type { UserRepository } from '@/domains/user/user.repository.interface'
import type { CreateUserData } from '@/domains'

export class RegistrationService {
  constructor(private readonly users: UserRepository) { }

  findExistingUser(telegramId: string) {
    return this.users.findByTelegramId(telegramId)
  }

  createUser(user: CreateUserData) {
    return this.users.createUser(user)
  }
}
