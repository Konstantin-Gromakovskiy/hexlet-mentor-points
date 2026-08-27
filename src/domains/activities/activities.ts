export type Activity = {
  id: number
  title: string
  description: string | null
  points: number
  isActive: boolean
}

export type NewActivity = Omit<Activity, 'id'>
