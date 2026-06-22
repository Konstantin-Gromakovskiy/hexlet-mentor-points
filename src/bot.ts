import { Bot } from 'grammy'
import { config } from './config.js'
import { handlers } from './handlers/index.js'

export const createBot = () => {
  const bot = new Bot(config.botToken)

  handlers(bot)

  return bot
}
