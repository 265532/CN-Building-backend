import hash from '@adonisjs/core/services/hash'

export class CryptoUtil {
  /**
   * Hash a plain text password
   * @param password The plain text password
   * @returns The hashed password
   */
  static async hashPassword(password: string): Promise<string> {
    return await hash.make(password)
  }

  /**
   * Verify a plain text password against a hash
   * @param hashedPassword The stored hash
   * @param plainPassword The plain text password to verify
   * @returns Boolean indicating if the password matches
   */
  static async verifyPassword(hashedPassword: string, plainPassword: string): Promise<boolean> {
    return await hash.verify(hashedPassword, plainPassword)
  }
}
