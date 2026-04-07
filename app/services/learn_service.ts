import User from '#models/user'

export class LearnService {
  /**
   * Get learning paths
   */
  async getLearningPaths() {
    // Return static paths for MVP, later can be queried from DB
    return {
      headerTitle: '中国古建筑',
      headerSubtitle: '探索古人的智慧',
      paths: [
        {
          id: '1',
          title: '木结构拆解',
          desc: '斗栱、榫卯等核心结构',
          url: '/pages/learn/wood',
        },
        {
          id: '2',
          title: '建筑风格分类',
          desc: '皇家、宗教、民居等',
          url: '/pages/learn/styles',
        },
        {
          id: '3',
          title: '著名建筑赏析',
          desc: '故宫、天坛、布达拉宫',
          url: '/pages/learn/buildings',
        },
      ],
    }
  }

  /**
   * Record daily study and update user study days
   */
  async recordDailyStudy(userId: number) {
    const user = await User.find(userId)
    if (!user) {
      return
    }

    // Logic to increment studyDays.
    // In a real app, check if user already studied today.
    // Assuming this function is called once per day for simplicity here.
    user.studyDays += 1
    await user.save()

    // TODO: Trigger achievement checks if needed

    return { studyDays: user.studyDays }
  }
}
