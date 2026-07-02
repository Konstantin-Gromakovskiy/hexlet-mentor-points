import { isUserRole } from '@/domains'
import { roleKeyboard } from '@/keyboards/roleKeyboard'
import { registerUser } from '@/services'
import { findUser } from '@/services'
import type { AppBot } from '@/types/bot'
import { config } from '@/config'

const isUserInWorkChat = async (bot: AppBot, userId: number) => {
  const chatMember = await bot.api.getChatMember(Number(config.workChatId), userId)

  return chatMember.status !== 'left' && chatMember.status !== 'kicked'
}

export const registration = (bot: AppBot) => {
  bot.command('start', async (ctx) => {
    const userId = ctx.from?.id

    if (!userId) {
      await ctx.reply(ctx.t('registration-user-undefined'))
      return
    }

    try {
      const isUserInPrivateChat = await isUserInWorkChat(bot, userId)

      if (!isUserInPrivateChat) {
        await ctx.reply(ctx.t('access-denied'))
        return
      }
    }
    catch (e) {
      await ctx.reply(ctx.t('registration-membership-check-failed'))
      console.error(e)
      return
    }

    const existedUser = await findUser(String(ctx.from?.id))

    if (existedUser) {
      await ctx.reply(ctx.t('registration-already-registered'))
      return
    }

    await ctx.reply(ctx.t('registration-choose-role'), { reply_markup: roleKeyboard(ctx) })
  })

  bot.callbackQuery(/^registration:role:(tutor|admin)$/, async (ctx) => {
    const [_request, role] = ctx.match
    const user = ctx.from

    if (!user) {
      await ctx.reply(ctx.t('registration-user-undefined'))
      return
    }
    if (!role || !isUserRole(role)) {
      await ctx.reply(ctx.t('registration-role-undefined'))
      return
    }

    try {
      const isUserInPrivateChat = await isUserInWorkChat(bot, user.id)

      if (!isUserInPrivateChat) {
        await ctx.reply(ctx.t('access-denied'))
        return
      }

      await registerUser({
        telegramId: String(user.id),
        firstName: user.first_name,
        username: user.username,
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
