import { RegistrationService } from './registration.service'
import { test, expect, describe } from 'bun:test'
import type { UserRepository } from '@/repositories/user.repository.interface'
import type { NewUser, User } from '@/domains'

const newTutor: NewUser = {
  telegramId: '123456789',
  firstName: 'John',
  username: 'johndoe',
  role: 'tutor',
}
const registeredTutor: User = {
  id: 1,
  ...newTutor,
}

class FakeUserRepository implements UserRepository {
  createdUser: NewUser | undefined
  userToFind: User | undefined
  createResult: User | undefined

  async findByTelegramId(): Promise<User | undefined> {
    return this.userToFind
  }

  async createUser(user: NewUser): Promise<User | undefined> {
    this.createdUser = user
    return this.createResult
  }
}

describe('RegistrationService', () => {
  test('find an existing user by Telegram ID', async () => {
    const repository = new FakeUserRepository()
    repository.userToFind = registeredTutor

    const service = new RegistrationService(repository)
    expect(service.findExistingUser(newTutor.telegramId)).resolves.toEqual(registeredTutor)
  })

  test('create a new user', async () => {
    const repository = new FakeUserRepository()
    repository.createResult = registeredTutor

    const service = new RegistrationService(repository)
    expect(service.createUser(newTutor)).resolves.toEqual(registeredTutor)
    expect(repository.createdUser).toEqual(newTutor)
  })
})
