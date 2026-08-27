import type { NextFunction } from 'grammy'
import type { BotContext } from '@/types/bot'
import type { UserRepository } from '@/repositories/user.repository.interface'

export const requireRegisteredUser = (users: UserRepository) => async (ctx: BotContext, next: NextFunction) => {
  const user = ctx.from
  if (!user) return ctx.reply(ctx.t('registration-user-undefined'))

  const registeredUser = await users.findByTelegramId(String(user.id))
  if (!registeredUser) return ctx.reply(ctx.t('registration-user-not-found'))

  ctx.currentUser = registeredUser
  return next()
}
