import { test } from '@japa/runner'
import { JwtUtil } from '#utils/jwt_util'
import assert from 'node:assert'

test.group('Auth Service', () => {
  test('generate and verify JWT token', async () => {
    // Setup env mock for test if needed, but typically env is loaded
    const payload = { userId: 1 }
    const token = JwtUtil.generateToken(payload)

    assert.strictEqual(typeof token, 'string')

    const decoded = JwtUtil.verifyToken(token)
    assert.strictEqual(decoded.userId, 1)
  })
})
