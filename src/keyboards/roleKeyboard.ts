import { InlineKeyboard } from 'grammy'
import type { BotContext } from '@/types/bot'

export const roleKeyboard = (ctx: BotContext) => new InlineKeyboard()
  .text(ctx.t('registration-role-tutor'), 'registration:role:tutor')
  .text(ctx.t('registration-role-admin'), 'registration:role:admin')
