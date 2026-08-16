export type Activity = {
  id: number
  title: string
  description: string | null
  points: number
}

export type NewActivity = Omit<Activity, 'id'>
