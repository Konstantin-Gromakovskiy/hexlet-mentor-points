export const callbackData = {
  user: {
    roleTutor: 'user:select-role:tutor',
    roleAdmin: 'user:select-role:admin',
    rolePattern: /^user:select-role:(tutor|admin)$/,
    awardPoints: 'user:select-action:award-points',
    spendPoints: 'user:select-action:spendPoints',
    checkBalance: 'user:select-action:checkBalance',
  },
} as const
