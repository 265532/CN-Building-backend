export class HomeService {
  /**
   * Get home page aggregation data
   */
  async getHomeData() {
    // In a real application, these might be fetched from different tables or redis cache.
    // We mock the response as per API Spec for Phase 2.

    return {
      banners: [
        {
          id: '1',
          imageUrl: 'https://example.com/banner1.jpg',
          title: '探索故宫的奥秘',
          url: '/pages/detail/1',
        },
      ],
      quickActions: [
        {
          id: '1',
          icon: 'map',
          name: '地图导览',
          url: '/pages/map/index',
          isTab: true,
        },
        {
          id: '2',
          icon: 'book',
          name: '系统学习',
          url: '/pages/learn/index',
          isTab: true,
        },
      ],
      recommendedList: [
        {
          id: '1',
          title: '天坛祈年殿',
          subtitle: '古代木结构的巅峰之作',
          coverUrl: 'https://example.com/tiantan.jpg',
          tag: '必看',
          url: '/pages/detail/1',
        },
      ],
      topics: [
        {
          id: '1',
          name: '斗栱之美',
          url: '/pages/topic/1',
        },
      ],
      crossCulturalList: [
        {
          id: '1',
          tag: '中西对比',
          title: '故宫 vs 凡尔赛宫',
          description: '从皇家宫殿看东西方建筑理念差异',
          url: '/pages/compare/1',
        },
      ],
    }
  }
}
