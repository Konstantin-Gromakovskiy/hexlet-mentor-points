import { InlineKeyboard } from 'grammy'
import type { BotContext } from '@/types/bot'
import { callbackData } from './callbackData'

export const tutorActions = (ctx: BotContext) => new InlineKeyboard()
  .text(ctx.t('award-points'), callbackData.user.awardPoints)
