import type { AppBot } from '@/types/bot'
import { callbackData } from '@/keyboards'

export const awardPoints = (bot: AppBot) => {
  bot.callbackQuery(callbackData.user.awardPoints, async (ctx) => {
    const user = ctx.from

    if (!user) return await ctx.reply(ctx.t('registration-user-undefined'))
  })
}
