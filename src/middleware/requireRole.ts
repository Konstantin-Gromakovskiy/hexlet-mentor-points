import type { UserRepository } from '@/repositories/user.repository.interface'
import type { UserRole } from '@/domains'
import type { BotContext } from '@/types/bot'
import type { NextFunction } from 'grammy'

export const requireRole = (users: UserRepository, role: UserRole) => async (ctx: BotContext, next: NextFunction) => {
  const user = await users.findByTelegramId(String(ctx.from?.id))
  if (user?.role !== role) return ctx.reply(ctx.t('access-denied'))
  ctx.currentUser = user

  await next()
}
