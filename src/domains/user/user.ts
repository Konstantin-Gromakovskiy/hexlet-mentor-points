export type User = {
  id: number
  telegramId: string
  firstName: string
  username: string | null
  role: UserRole
}

export type UserRole = 'admin' | 'tutor'
export type NewUser = Omit<User, 'id'>

export const isUserRole = (value: string): value is UserRole =>
  value === 'tutor' || value === 'admin'
