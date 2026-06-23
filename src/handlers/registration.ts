import type { Bot } from 'grammy'
import { isUserRole } from '@/domains/users'
import { roleKeyboard } from '@/keyboards/roleKeyboard'
import { registerUser } from '@/services'

export const registration = (bot: Bot) => {
  bot.command('start', async (ctx) => {
    await ctx.reply('Выберите роль', { reply_markup: roleKeyboard })
  })

  bot.callbackQuery(/^registration:role:(tutor|admin)$/, async (ctx) => {
    const [_request, role] = ctx.match
    const user = ctx.from

    // todo: требуется установка i18n для вынесения текстов
    if (!user) {
      await ctx.reply('User is undefined')
      return
    }
    if (!role || !isUserRole(role)) {
      await ctx.reply('Role is undefined')
      return
    }
    try {
      await registerUser({
        telegramId: String(user.id),
        firstName: user.first_name,
        username: user.username,
        role,
      })
      await ctx.reply('You are registered2')
    }
    catch (e) {
      await ctx.reply('faild to register')
      console.error(e)
    }
  })
}
