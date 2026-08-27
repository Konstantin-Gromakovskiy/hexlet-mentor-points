registration-already-registered = Вы уже зарегистрированы
registration-choose-role = Выберите роль
registration-role-tutor = Тьютор
registration-role-admin = Админ
registration-user-undefined = Не удалось определить пользователя
registration-role-undefined = Не удалось определить роль
registration-success = Вы зарегистрированы
registration-failed = Не удалось зарегистрироваться
registration-membership-check-failed = Не удалось проверить доступ. Попробуйте позже
registration-user-not-found = Зарегестированный пользователь не найден

# tutor action
choose-actions = Выберите действие
award-points = Начислить баллы
spend-points = Потратить баллы
check-balance = Посмотреть баланс

# activities
choose-activity = Выберите активность

# transactions
award-point-success = { $amount ->
  [one] Вам начислен { $amount } балл за "{ $activityTitle }"
    Общий баланс: { $total }
    Зарезервировано: { $reserved }
    Доступно: { $available }
  [few] Вам начислено { $amount } балла за "{ $activityTitle }"
    Общий баланс: { $total }
    Зарезервировано: { $reserved }
    Доступно: { $available }
 *[many] Вам начислено { $amount } баллов за "{ $activityTitle }"
    Общий баланс: { $total }
    Зарезервировано: { $reserved }
    Доступно: { $available }
}
award-points-already-exists = { $amount ->
  [one] Ранее уже был начислен { $amount } балл за "{ $activityTitle }"
    Общий баланс: { $total }
    Зарезервировано: { $reserved }
    Доступно: { $available }
  [few] Ранее уже было начислено { $amount } балла за "{ $activityTitle }"
    Общий баланс: { $total }
    Зарезервировано: { $reserved }
    Доступно: { $available }
 *[many] Ранее уже было начислено { $amount } баллов за "{ $activityTitle }"
    Общий баланс: { $total }
    Зарезервировано: { $reserved }
    Доступно: { $available }
}


#failures
access-denied = Доступ отклонен
activity_archived = Активность архивирована
activity_not_found = Активность не найдена
invalid_award_request = Эта кнопка больше не действительна. Откройте меню начисления заново


# other
answer-is-accepted = Ответ принят
