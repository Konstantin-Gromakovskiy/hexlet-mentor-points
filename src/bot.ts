import { config } from '@/config'
import { handlers } from '@/handlers'
import { Bot } from 'grammy'
import { I18n } from '@grammyjs/i18n'
import type { BotContext } from '@/types/bot'

export const createBot = () => {
  const bot = new Bot<BotContext>(config.botToken)
  const i18n = new I18n<BotContext>({
    defaultLocale: 'ru',
    directory: 'src/locales',
  })

  bot.use(i18n.middleware())

  handlers(bot)

  return bot
}
