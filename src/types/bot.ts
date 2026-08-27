import type { I18nFlavor } from '@grammyjs/i18n'
import type { Bot, Context } from 'grammy'
import type { User } from '@/domains'

export type BotContext = Context & I18nFlavor & {
  currentUser?: User
}
export type AppBot = Bot<BotContext>
