import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.wechat_login': { paramsTuple?: []; params?: {} }
    'auth.account_login': { paramsTuple?: []; params?: {} }
    'auth.account_register': { paramsTuple?: []; params?: {} }
    'user.get_info': { paramsTuple?: []; params?: {} }
    'user.update_info': { paramsTuple?: []; params?: {} }
    'user.get_achievements': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'user.get_info': { paramsTuple?: []; params?: {} }
    'user.get_achievements': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'user.get_info': { paramsTuple?: []; params?: {} }
    'user.get_achievements': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.wechat_login': { paramsTuple?: []; params?: {} }
    'auth.account_login': { paramsTuple?: []; params?: {} }
    'auth.account_register': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'user.update_info': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}