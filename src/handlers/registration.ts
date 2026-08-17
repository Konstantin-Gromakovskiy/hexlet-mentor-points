import { isUserRole } from '@/domains'
import type { AppBot, BotContext } from '@/types/bot'
import { callbackData, roleKeyboard, tutorActions } from '@/keyboards'
import type { RegistrationService } from '@/services/registration/registration.service'
import type { MiddlewareFn } from 'grammy'

export const registration = (
  bot: AppBot,
  registrationService: RegistrationService,
  requireWorkChatMemberMiddleware: MiddlewareFn<BotContext>,
) => {
  bot.command('start', requireWorkChatMemberMiddleware, async (ctx) => {
    const user = ctx.from

    if (!user) return await ctx.reply(ctx.t('registration-user-undefined'))

    const existedUser = await registrationService.findExistingUser(String(user.id))

    if (existedUser) return await ctx.reply(ctx.t('choose-actions'), { reply_markup: tutorActions(ctx) })

    await ctx.reply(ctx.t('registration-choose-role'), { reply_markup: roleKeyboard(ctx) })
  })

  bot.callbackQuery(callbackData.user.rolePattern, requireWorkChatMemberMiddleware, async (ctx) => {
    const [_request, role] = ctx.match
    const user = ctx.from

    if (!user) return await ctx.reply(ctx.t('registration-user-undefined'))
    if (!role || !isUserRole(role)) return await ctx.reply(ctx.t('registration-role-undefined'))

    try {
      await registrationService.createUser({
        telegramId: String(user.id),
        firstName: user.first_name,
        username: user.username ?? null,
        role,
      })
      await ctx.reply(ctx.t('registration-success'))
    }
    catch (e) {
      await ctx.reply(ctx.t('registration-failed'))
      console.error(e)
    }
  })
}
