import type { Bot } from 'grammy'
import { registerUser } from '../services/registerUser.js'

export const registration = (bot: Bot) => {
  bot.command('start', async (ctx) => {
    const user = ctx.from
    // todo: требуется установка i18n для вынесения текстов
    if (!user) {
      await ctx.reply('User is undefined')
      return
    }
    try {
      await registerUser({
        telegramId: String(user.id),
        firstName: user.first_name,
        username: user.username,
      })
      await ctx.reply('You are registered')
    }
    catch {
      await ctx.reply('failed to register the user')
      console.error('failed to register the user')
    }
  })
}
