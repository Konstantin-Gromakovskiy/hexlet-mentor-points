import 'dotenv/config'

if (!import.meta.env.BOT_API_KEY) throw new Error('BOT_API_KEY is not defined')
if (!import.meta.env.DATABASE_URL) throw new Error('DATABASE_URL is not defined')
if (!import.meta.env.WORK_CHAT_ID) throw new Error('WORK_CHAT_ID is not defined')

export const config = {
  botToken: import.meta.env.BOT_API_KEY,
  databaseUrl: import.meta.env.DATABASE_URL,
  workChatId: import.meta.env.WORK_CHAT_ID,
} as const
