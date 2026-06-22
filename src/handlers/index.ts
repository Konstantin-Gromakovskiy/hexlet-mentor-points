import type { Bot } from 'grammy'
import { registration } from './registration.js'

export const handlers = (bot: Bot) => {
  registration(bot)
}
