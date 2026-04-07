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
    'map.get_markers': { paramsTuple?: []; params?: {} }
    'map.get_places': { paramsTuple?: []; params?: {} }
    'home.get_data': { paramsTuple?: []; params?: {} }
    'learn.get_paths': { paramsTuple?: []; params?: {} }
    'learn.record_daily': { paramsTuple?: []; params?: {} }
    'knowledge_node.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ai.chat': { paramsTuple?: []; params?: {} }
    'image.list': { paramsTuple?: []; params?: {} }
    'image.categories': { paramsTuple?: []; params?: {} }
    'image.show': { paramsTuple: [ParamValue]; params: {'filename': ParamValue} }
    'image.metadata': { paramsTuple: [ParamValue]; params: {'filename': ParamValue} }
  }
  GET: {
    'user.get_info': { paramsTuple?: []; params?: {} }
    'user.get_achievements': { paramsTuple?: []; params?: {} }
    'map.get_markers': { paramsTuple?: []; params?: {} }
    'map.get_places': { paramsTuple?: []; params?: {} }
    'home.get_data': { paramsTuple?: []; params?: {} }
    'learn.get_paths': { paramsTuple?: []; params?: {} }
    'knowledge_node.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'image.list': { paramsTuple?: []; params?: {} }
    'image.categories': { paramsTuple?: []; params?: {} }
    'image.show': { paramsTuple: [ParamValue]; params: {'filename': ParamValue} }
    'image.metadata': { paramsTuple: [ParamValue]; params: {'filename': ParamValue} }
  }
  HEAD: {
    'user.get_info': { paramsTuple?: []; params?: {} }
    'user.get_achievements': { paramsTuple?: []; params?: {} }
    'map.get_markers': { paramsTuple?: []; params?: {} }
    'map.get_places': { paramsTuple?: []; params?: {} }
    'home.get_data': { paramsTuple?: []; params?: {} }
    'learn.get_paths': { paramsTuple?: []; params?: {} }
    'knowledge_node.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'image.list': { paramsTuple?: []; params?: {} }
    'image.categories': { paramsTuple?: []; params?: {} }
    'image.show': { paramsTuple: [ParamValue]; params: {'filename': ParamValue} }
    'image.metadata': { paramsTuple: [ParamValue]; params: {'filename': ParamValue} }
  }
  POST: {
    'auth.wechat_login': { paramsTuple?: []; params?: {} }
    'auth.account_login': { paramsTuple?: []; params?: {} }
    'auth.account_register': { paramsTuple?: []; params?: {} }
    'learn.record_daily': { paramsTuple?: []; params?: {} }
    'ai.chat': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'user.update_info': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}