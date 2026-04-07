/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    wechatLogin: typeof routes['auth.wechat_login']
    accountLogin: typeof routes['auth.account_login']
    accountRegister: typeof routes['auth.account_register']
  }
  user: {
    getInfo: typeof routes['user.get_info']
    updateInfo: typeof routes['user.update_info']
    getAchievements: typeof routes['user.get_achievements']
  }
  map: {
    getMarkers: typeof routes['map.get_markers']
    getPlaces: typeof routes['map.get_places']
  }
  home: {
    getData: typeof routes['home.get_data']
  }
  learn: {
    getPaths: typeof routes['learn.get_paths']
    recordDaily: typeof routes['learn.record_daily']
  }
  knowledgeNode: {
    show: typeof routes['knowledge_node.show']
  }
  ai: {
    chat: typeof routes['ai.chat']
  }
  image: {
    list: typeof routes['image.list']
    categories: typeof routes['image.categories']
    show: typeof routes['image.show']
    metadata: typeof routes['image.metadata']
  }
}
