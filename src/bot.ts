import { Bot } from 'grammy'
import { config } from './config'
import { handlers } from './handlers'

export const createBot = () => {
  const bot = new Bot(config.botToken)

  handlers(bot)

  return bot
}
