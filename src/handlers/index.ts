import type { Bot } from 'grammy'
import { registration } from '@/handlers/registration'

export const handlers = (bot: Bot) => {
  registration(bot)
}
