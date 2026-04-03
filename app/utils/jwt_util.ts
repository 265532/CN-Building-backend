import jwt from 'jsonwebtoken'
import env from '#start/env'

export class JwtUtil {
  /**
   * Generate a JWT token
   */
  static generateToken(payload: object, expiresIn: string | number = '7d'): string {
    const secret = env.get('JWT_SECRET')
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables')
    }
    return jwt.sign(payload, secret, { expiresIn: expiresIn as any })
  }

  /**
   * Verify a JWT token
   */
  static verifyToken(token: string): any {
    const secret = env.get('JWT_SECRET')
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables')
    }
    return jwt.verify(token, secret)
  }
}
