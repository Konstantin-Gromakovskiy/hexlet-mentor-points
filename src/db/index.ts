import { drizzle } from 'drizzle-orm/node-postgres'
import { config } from '@/config'

export const db = drizzle(config.databaseUrl)
export * from './schemes'
