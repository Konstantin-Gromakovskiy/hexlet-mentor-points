export type User = {
  id: number
  telegramId: string
  firstName: string
  username: string | null
  role: UserRole
}

export enum UserRole {
  Tutor = 'tutor',
  Admin = 'admin',
}
export type NewUser = Omit<User, 'id'>

export const isUserRole = (value: string): value is UserRole =>
  Object.values(UserRole).includes(value as UserRole)
