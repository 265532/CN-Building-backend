import User from '#models/user'

export class UserService {
  /**
   * Get user info by ID, assembling medals and knowledgeRadar
   */
  async getUserInfo(userId: number) {
    const user = await User.find(userId)
    if (!user) {
      throw new Error('User not found')
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
   * Get user achievements
   */
  async getUserAchievements(userId: number) {
    // In a real app, this might query an Achievements table linked to the User.
    // For now, returning the medals from the user model as an example or an empty array.
    const user = await User.find(userId)
    if (!user) {
      throw new Error('User not found')
    }

    return user.userMedals || []
  }

  /**
   * Update user info
   */
  async updateUserInfo(userId: number, updateData: { username?: string }) {
    const user = await User.find(userId)
    if (!user) {
      throw new Error('User not found')
    }

    if (updateData.username) {
      // Check if new username is already taken by another user
      const existingUser = await User.findBy('username', updateData.username)
      if (existingUser && existingUser.id !== userId) {
        throw new Error('Username already exists')
      }
      user.username = updateData.username
    }

    await user.save()

    return this.getUserInfo(userId)
  }
}
