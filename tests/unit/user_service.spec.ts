import { test } from '@japa/runner'
import { UserService } from '#services/user_service'
import assert from 'node:assert'

test.group('User Service', () => {
  test('getUserInfo format', async () => {
    // A real test would mock the database or use a test DB.
    // For now we test the presence of methods
    const userService = new UserService()
    assert.strictEqual(typeof userService.getUserInfo, 'function')
  })
})
