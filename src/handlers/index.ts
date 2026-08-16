import { registration } from '@/handlers/registration'
import type { AppBot } from '@/types/bot'
import type { RegistrationService } from '@/services/registration/registration.service'
import { awardPoints } from '@/handlers/awardPoints'

export const handlers = (bot: AppBot, registrationService: RegistrationService) => {
  registration(bot, registrationService)
  awardPoints(bot)
}
