import type { AppBot } from '@/types/bot'
import { callbackData } from '@/keyboards'
import type { MiddlewareFn } from 'grammy'
import type { BotContext } from '@/types/bot'

export const checkBalance = (
  bot: AppBot,
  ...middleware: MiddlewareFn<BotContext>[]
) => {
  bot.callbackQuery(callbackData.user.checkBalance, ...middleware, async (ctx) => {
    await ctx.answerCallbackQuery({ text: ctx.t('answer-is-accepted') })
    await ctx.deleteMessage()

    await ctx.answerCallbackQuery()
    await ctx.reply('есть контакт')
  })
}
