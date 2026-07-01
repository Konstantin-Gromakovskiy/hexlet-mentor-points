# Repository Guidelines

## Структура проекта и модулей

Проект написан на TypeScript и запускается через Bun. 
Схема PostgreSQL находится в `src/db/schemes/users.ts`; сгенерированные миграции и метаданные Drizzle лежат в `drizzle/`. 
Документация продукта и технического стека хранится в `docs/`. Локальная база описана в `compose.yaml`.

## Команды сборки, проверки и разработки

- `npm install` — установить зависимости из `package-lock.json`.
- `npm run dev` — запустить корневой `index.ts` в watch-режиме через Bun.
- `npm start` — запустить приложение один раз через `bun index.ts`.
- `npm run lint` — проверить `.js` и `.ts` файлы ESLint.
- `npm run lint:fix` — автоматически исправить поддерживаемые ESLint-проблемы.
- `npm run typecheck` — проверить типы TypeScript без генерации файлов.
- `npm run db:generate` — сгенерировать миграцию Drizzle из `src/db/schemes/users.ts`.
- `npm run db:migrate` — применить миграции из `drizzle/`.
- `npm run db:push` — синхронизировать схему напрямую с базой для локальной разработки.

Для команд Drizzle нужен `DATABASE_URL`. Для бота нужен `BOT_API_KEY`.

## Стиль кода и соглашения об именах

Используйте ES-модули, строгий TypeScript и настройки из `tsconfig.json`. 
Форматирование и базовые правила задаются `eslint.config.js`: `@eslint/js`, `typescript-eslint` и `@stylistic/eslint-plugin`. 

## Тестирование

Автоматические тесты пока не настроены: `npm test` намеренно завершается ошибкой. 

## Коммиты и Pull Request

В проекте используется Conventional Commits через `@commitlint/config-conventional`, пиши сообщения в формате `type(scope): описание`.

## Конфигурация и безопасность

Не коммить `.env` и реальные токены. 
PostgreSQL для локальной разработки поднимается из `compose.yaml`.
