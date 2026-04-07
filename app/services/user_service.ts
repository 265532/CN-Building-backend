import User from '#models/user'
import { Exception } from '@adonisjs/core/exceptions'

export class UserService {
  /**
   * Get user info by ID, assembling medals and knowledgeRadar
   */
  async getUserInfo(userId: number) {
    const user = await User.find(userId)
    if (!user) {
      throw new Exception('User not found', { status: 400 })
    }

    const userInfo = {
      id: user.id,
      username: user.username,
      level: user.level,
      studyDays: user.studyDays,
      medals: user.userMedals || [],
      knowledgeRadar: user.userKnowledgeRadar || {},
    }

    return userInfo
  }

  /**
   * Update user info
   */
  async updateUserInfo(userId: number, updateData: { username?: string }) {
    const user = await User.find(userId)
    if (!user) {
      throw new Exception('User not found', { status: 400 })
    }

    if (updateData.username) {
      // Check if new username is already taken by another user
      const existingUser = await User.findBy('username', updateData.username)
      if (existingUser && existingUser.id !== userId) {
        throw new Exception('Username already exists', { status: 400 })
      }
      user.username = updateData.username
    }

    await user.save()

    return this.getUserInfo(userId)
  }
}
