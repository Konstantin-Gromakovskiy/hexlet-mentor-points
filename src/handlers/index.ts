import { registration } from '@/handlers/registration'
import type { AppBot } from '@/types/bot'
import type { RegistrationService } from '@/services/registration/registration.service'
import { AwardPointsService } from '@/services/awardPoints/awardPoints.service'
import { awardPoints } from '@/handlers/awardPoints'
import { checkBalance } from '@/handlers/checkBalance'
import type { MiddlewareFn } from 'grammy'
import type { BotContext } from '@/types/bot'

export const handlers = (
  bot: AppBot,
  registrationService: RegistrationService,
  awardPointsService: AwardPointsService,
  requireRegisteredUser: MiddlewareFn<BotContext>,
  requireTutor: MiddlewareFn<BotContext>,
  requireWorkChatMemberMiddleware: MiddlewareFn<BotContext>,
  // requireAdmin: MiddlewareFn<BotContext>,
) => {
  registration(bot, registrationService, requireWorkChatMemberMiddleware)
  awardPoints(bot, awardPointsService, requireTutor)
  checkBalance(bot, requireRegisteredUser)
}
