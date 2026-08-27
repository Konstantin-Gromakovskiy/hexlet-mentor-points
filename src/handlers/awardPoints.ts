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

    const activities = await awardPointsService.getActiveActivities()
    const buttonsData = activities.map(activity => [`${activity.title} (${activity.points}xp)`, activity.id])
    const buttonRow = buttonsData
      .map(([label, id]) => {
        const idempotencyKey = crypto.randomUUID()
        return [InlineKeyboard.text(String(label), `${callbackData.activity.selectActivity}${id}:${idempotencyKey}`)]
      })

    await ctx.reply(ctx.t('choose-activity'), { reply_markup: InlineKeyboard.from(buttonRow) })
  })

  bot.callbackQuery(callbackData.activity.selectActivityPattern, ...middleware, async (ctx) => {
    await ctx.answerCallbackQuery({ text: ctx.t('answer-is-accepted') })
    await ctx.deleteMessage()
    const { match, currentUser } = ctx

    if (typeof match === 'string') throw new Error('match is not an array')
    if (!currentUser) return await ctx.reply(ctx.t('registration-user-not-found'))

    const activityId = match.groups?.activityId
    const idempotencyKey = match.groups?.idempotencyKey

    if (!activityId) throw new Error('activityId is not defined')
    if (!idempotencyKey) throw new Error('idempotencyKey is not defined')

    const createdAward = await awardPointsService.createAward(currentUser.id, Number(activityId), idempotencyKey)

    if (!createdAward.ok) return await ctx.reply(ctx.t(createdAward.reason))
    const { activityTitle, transaction, balance } = createdAward.result

    if (createdAward.alreadyExists)
      return await ctx.reply(ctx.t('award-points-already-exists', {
        amount: transaction.amount,
        activityTitle,
        total: balance.total,
        reserved: balance.reserved,
        available: balance.available,
      }))

    return await ctx.reply(ctx.t('award-point-success', {
      amount: transaction.amount,
      activityTitle,
      total: balance.total,
      reserved: balance.reserved,
      available: balance.available,
    }))
  })
}
