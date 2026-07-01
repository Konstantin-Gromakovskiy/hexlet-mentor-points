import { InlineKeyboard } from 'grammy'

export const roleKeyboard = new InlineKeyboard()
  .text('Тьютор', 'registration:role:tutor')
  .text('Админ', 'registration:role:admin')
