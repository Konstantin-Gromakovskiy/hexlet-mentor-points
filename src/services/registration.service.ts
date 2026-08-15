import type { UserRepository } from '@/repositories/user.repository.interface'
import type { NewUser } from '@/domains'

export class RegistrationService {
  constructor(private readonly users: UserRepository) { }

  findExistingUser(telegramId: string) {
    return this.users.findByTelegramId(telegramId)
  }

  createUser(user: NewUser) {
    return this.users.createUser(user)
  }
}
