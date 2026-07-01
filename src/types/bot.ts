import type { I18nFlavor } from '@grammyjs/i18n'
import type { Bot, Context } from 'grammy'

export type BotContext = Context & I18nFlavor
export type AppBot = Bot<BotContext>
