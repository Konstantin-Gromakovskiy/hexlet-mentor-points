import type { NextFunction } from 'grammy'
import type { BotContext } from '@/types/bot'
import { config } from '@/config'

export const requireWorkChatMember = async (ctx: BotContext, next: NextFunction) => {
  const user = ctx.from

  if (!user) return await ctx.reply(ctx.t('registration-user-undefined'))

  const chatMember = await ctx.api.getChatMember(
    Number(config.workChatId),
    user.id,
  )
  const isWorkChatMember
    = chatMember.status !== 'left' && chatMember.status !== 'kicked'
  if (!isWorkChatMember) return await ctx.reply(ctx.t('access-denied'))

  return next()
}
