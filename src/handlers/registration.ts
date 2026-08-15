import { isUserRole } from '@/domains'
import type { AppBot } from '@/types/bot'
import { config } from '@/config'
import { callbackData, roleKeyboard, tutorActions } from '@/keyboards'
import type { RegistrationService } from '@/services/registration.service'

const isUserInWorkChat = async (bot: AppBot, userId: number) => {
  const chatMember = await bot.api.getChatMember(Number(config.workChatId), userId)

  return chatMember.status !== 'left' && chatMember.status !== 'kicked'
}

export const registration = (bot: AppBot, registrationService: RegistrationService) => {
  bot.command('start', async (ctx) => {
    const user = ctx.from

    if (!user) return await ctx.reply(ctx.t('registration-user-undefined'))
    const isUserInPrivateChat = await isUserInWorkChat(bot, user.id)
    if (!isUserInPrivateChat) return await ctx.reply(ctx.t('access-denied'))

    const existedUser = await registrationService.findExistingUser(String(user.id))

    if (existedUser) return await ctx.reply(ctx.t('choose-actions'), { reply_markup: tutorActions(ctx) })

    await ctx.reply(ctx.t('registration-choose-role'), { reply_markup: roleKeyboard(ctx) })
  })

  bot.callbackQuery(callbackData.user.rolePattern, async (ctx) => {
    const [_request, role] = ctx.match
    const user = ctx.from

    if (!user) return await ctx.reply(ctx.t('registration-user-undefined'))
    if (!role || !isUserRole(role)) return await ctx.reply(ctx.t('registration-role-undefined'))

    try {
      const isUserInPrivateChat = await isUserInWorkChat(bot, user.id)

      if (!isUserInPrivateChat) return await ctx.reply(ctx.t('access-denied'))

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
