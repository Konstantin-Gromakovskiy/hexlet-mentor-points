import type { CreateActivityData, CreateRewardData } from '@/domains'

export const activitySeeds: CreateActivityData[] = [
  {
    title: 'Ведение Telegram-чата',
    description: 'Один месяц ведения: ответы на вопросы и публикация сообщений',
    points: 150,
  },
  {
    title: 'Активность в Telegram-сообществе',
    description: 'Один отдельный ответ или комментарий в телеграмме Хекслета',
    points: 10,
  },
  {
    title: 'Активность со студентами',
    description: 'Одна активность или созвон',
    points: 50,
  },
  {
    title: 'Создание материалов: лонгрид',
    description: 'Один материал: лонгрид, гайд, мини-статья или контент-план',
    points: 50,
  },
  {
    title: 'Активность в социальных сетях о Хекслете',
    description: 'Одна отдельная публикация или один комментарий в социальных сетях о Хекслете',
    points: 20,
  },
] as const

export const rewardSeeds: CreateRewardData[] = [
  {
    title: 'Доступ по базовому плану',
    description: 'Один месяц доступа',
    price: 150,
  },
  {
    title: 'Доступ по оптимальному тарифу',
    description: 'Две недели доступа',
    price: 150,
  },
  {
    title: 'Консультация с карьерным консультантом',
    description: 'Созвон продолжительностью 30–40 минут',
    price: 150,
  },
  {
    title: 'Доступ к Хекслет Карьере',
    description: 'Шесть месяцев доступа',
    price: 1200,
  },
  {
    title: 'Участие в open source проектах',
    description: 'Участие в проекте',
    price: 1000,
  },
  {
    title: 'Следующая профессия: пакет на 10 месяцев',
    description: 'Десять месяцев доступа',
    price: 3000,
  },
  {
    title: 'Следующая профессия: пакет на 8 месяцев',
    description: 'Восемь месяцев доступа',
    price: 2500,
  },
  {
    title: 'Следующая профессия: пакет на 6 месяцев',
    description: 'Шесть месяцев доступа',
    price: 2000,
  },
  {
    title: 'Следующая профессия: пакет на 1–4 месяца',
    description: 'От одного до четырех месяцев доступа',
    price: 1500,
  },
] as const
