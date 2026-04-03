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
}
