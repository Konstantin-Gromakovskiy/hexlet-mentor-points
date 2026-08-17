import type { AppBot, BotContext } from '@/types/bot'
import { callbackData } from '@/keyboards'
import { AwardPointsService } from '@/services/awardPoints/awardPoints.service'
import { InlineKeyboard, type MiddlewareFn } from 'grammy'

export const awardPoints = (
  bot: AppBot,
  awardPointsService: AwardPointsService,
  ...middleware: MiddlewareFn<BotContext>[]
) => {
  bot.callbackQuery(callbackData.user.awardPoints, ...middleware, async (ctx) => {
    await ctx.answerCallbackQuery({ text: ctx.t('answer-is-accepted') })
    const user = ctx.from
    if (!user) return await ctx.reply(ctx.t('registration-user-undefined'))
    const activities = await awardPointsService.getActiveActivities()
    const buttonsData = activities.map(activity => [`${activity.title} (${activity.points}xp)`, activity.id])
    const buttonRow = buttonsData
      .map(([label, id]) => [InlineKeyboard.text(String(label), `${callbackData.activity.selectActivity}${id}`)])

    await ctx.reply(ctx.t('choose-activity'), {
      reply_markup: InlineKeyboard.from(buttonRow),
    })
  })

  bot.callbackQuery(callbackData.activity.selectActivityPattern, ...middleware, async (ctx) => {
    await ctx.answerCallbackQuery({ text: ctx.t('answer-is-accepted') })
    const match = ctx.match
    if (typeof match === 'string') throw new Error('match is not an array')

    const [selectActivityPattern] = match
    const selectActivityPatternArr = selectActivityPattern.split(':')
    const activityId = Number(selectActivityPatternArr[selectActivityPatternArr.length - 1])

    // todo: сделать проверку что активность не архивированна

    await ctx.reply(`отработал ${activityId}`) // todo: временный фолбек.
  })
}
