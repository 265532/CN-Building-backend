import Achievement from '#models/achievement'
import User from '#models/user'

export class AchievementService {
  /**
   * Get user achievements including unlocked status
   */
  async getUserAchievements(userId: number) {
    // Get all system achievements
    const allAchievements = await Achievement.all()

    // Get user's unlocked achievements
    const user = await User.query().where('id', userId).preload('achievements').first()
    const unlockedIds = new Map<number, Date>()

    if (user && user.achievements) {
      user.achievements.forEach((ach) => {
        // pivot data will contain unlocked_at
        const unlockedAt = ach.$extras.pivot_unlocked_at
        unlockedIds.set(ach.id, unlockedAt)
      })
    }

    return allAchievements.map((ach) => {
      const unlockedAt = unlockedIds.get(ach.id)
      return {
        id: ach.id.toString(),
        title: ach.name,
        description: ach.description,
        icon: ach.iconUrl,
        unlockedAt: unlockedAt ? unlockedAt : null,
      }
    })
  }
}
