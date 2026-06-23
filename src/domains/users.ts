import { userRoleEnum, usersTable } from '@/db/schema'

export type User = typeof usersTable.$inferSelect
export type CreateUserData = typeof usersTable.$inferInsert
export type UserRole = typeof userRoleEnum.enumValues[number]
export const isUserRole = (value: string): value is UserRole =>
  userRoleEnum.enumValues.includes(value as UserRole)
