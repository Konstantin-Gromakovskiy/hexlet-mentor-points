import { registration } from '@/handlers/registration'
import type { AppBot } from '@/types/bot'

export const handlers = (bot: AppBot) => {
  registration(bot)
}
