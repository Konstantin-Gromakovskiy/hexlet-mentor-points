import 'dotenv/config'

export const config = {
  botToken: import.meta.env.BOT_API_KEY!,
  databaseUrl: import.meta.env.DATABASE_URL!,
} as const
