import type { TransactionFailureReasons } from '@/repositories/pointTransactions.repository.interface'

// единый список ошибок, выводимый пользователю для удобства локализации
export const failureMessageKeys: Record<TransactionFailureReasons, string> = {
  activity_archived: 'activity_archived',
  activity_not_found: 'activity_not_found',
  invalid_award_request: 'invalid_award_request',
}
