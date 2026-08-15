import { registration } from '@/handlers/registration'
import type { AppBot } from '@/types/bot'
import type { RegistrationService } from '@/services/registration.service'

export const handlers = (bot: AppBot, registrationService: RegistrationService) => {
  registration(bot, registrationService)
}
