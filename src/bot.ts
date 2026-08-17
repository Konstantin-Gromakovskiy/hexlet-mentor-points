import { config } from '@/config'
import { handlers } from '@/handlers'
import { Bot } from 'grammy'
import { I18n } from '@grammyjs/i18n'
import type { BotContext } from '@/types/bot'
import { RegistrationService } from '@/services'
import { db } from '@/db'
import { PostgresUserRepository } from '@/repositories/user.repository.drizzle'
import { AwardPointsService } from '@/services/awardPoints/awardPoints.service'
import { ActivityRepository } from '@/repositories/activity.repository'
import { requireWorkChatMember, requireRegisteredUser, requireRole } from '@/middleware'

export const createBot = () => {
  const bot = new Bot<BotContext>(config.botToken)
  const i18n = new I18n<BotContext>({
    defaultLocale: 'ru',
    directory: 'src/locales',
  })

  bot.use(i18n.middleware())

  const userRepository = new PostgresUserRepository(db)
  const registrationService = new RegistrationService(userRepository)

  const activityRepository = new ActivityRepository(db)
  const awardPointsService = new AwardPointsService(activityRepository)

  // middlewares
  const requireRegisteredUserMiddleware = requireRegisteredUser(userRepository)
  const requireTutorMiddleware = requireRole(userRepository, 'tutor')
  const requireWorkChatMemberMiddleware = requireWorkChatMember
  // const requireAdminMiddleware = requireRole(userRepository, 'admin')

  handlers(
    bot,
    registrationService,
    awardPointsService,
    requireRegisteredUserMiddleware,
    requireTutorMiddleware,
    // requireAdminMiddleware,
    requireWorkChatMemberMiddleware,
  )

  return bot
}
