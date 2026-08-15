import { test, expect } from 'bun:test'
import { isUserRole } from './user'

test('recognises allowed roles', () => {
  expect(isUserRole('admin')).toBe(true)
  expect(isUserRole('tutor')).toBe(true)
  expect(isUserRole('random')).toBe(false)
})
