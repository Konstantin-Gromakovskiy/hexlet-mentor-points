import { config } from '@/config'
import { handlers } from '@/handlers'
import { Bot } from 'grammy'
import { I18n } from '@grammyjs/i18n'
import type { BotContext } from '@/types/bot'
import { RegistrationService } from '@/services'
import { db } from '@/db'
import { PostgresUserRepository } from '@/domains/user/user.repository.drizzle'

export const createBot = () => {
  const bot = new Bot<BotContext>(config.botToken)
  const i18n = new I18n<BotContext>({
    defaultLocale: 'ru',
    directory: 'src/locales',
  })

  bot.use(i18n.middleware())

  const userRepository = new PostgresUserRepository(db)
  const registrationService = new RegistrationService(userRepository)

  handlers(bot, registrationService)

  return bot
}
