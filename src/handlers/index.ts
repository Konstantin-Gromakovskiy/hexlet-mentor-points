import type { Bot } from 'grammy'
import { registration } from './registration'

export const handlers = (bot: Bot) => {
  registration(bot)
}
