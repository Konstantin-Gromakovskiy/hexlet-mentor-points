import { InlineKeyboard } from 'grammy'
import type { BotContext } from '@/types/bot'
import { callbackData } from './callbackData'

export const roleKeyboard = (ctx: BotContext) => new InlineKeyboard()
  .text(ctx.t('registration-role-tutor'), callbackData.user.roleTutor)
  .text(ctx.t('registration-role-admin'), callbackData.user.roleAdmin)
