/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.wechat_login': {
    methods: ["POST"],
    pattern: '/api/v1/auth/wechat-login',
    tokens: [{"old":"/api/v1/auth/wechat-login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/wechat-login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/wechat-login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/wechat-login","type":0,"val":"wechat-login","end":""}],
    types: placeholder as Registry['auth.wechat_login']['types'],
  },
  'auth.account_login': {
    methods: ["POST"],
    pattern: '/api/v1/auth/account-login',
    tokens: [{"old":"/api/v1/auth/account-login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/account-login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/account-login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/account-login","type":0,"val":"account-login","end":""}],
    types: placeholder as Registry['auth.account_login']['types'],
  },
  'auth.account_register': {
    methods: ["POST"],
    pattern: '/api/v1/auth/register',
    tokens: [{"old":"/api/v1/auth/register","type":0,"val":"api","end":""},{"old":"/api/v1/auth/register","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/register","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.account_register']['types'],
  },
  'user.get_info': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/users/me',
    tokens: [{"old":"/api/v1/users/me","type":0,"val":"api","end":""},{"old":"/api/v1/users/me","type":0,"val":"v1","end":""},{"old":"/api/v1/users/me","type":0,"val":"users","end":""},{"old":"/api/v1/users/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['user.get_info']['types'],
  },
  'user.update_info': {
    methods: ["PUT"],
    pattern: '/api/v1/users/me',
    tokens: [{"old":"/api/v1/users/me","type":0,"val":"api","end":""},{"old":"/api/v1/users/me","type":0,"val":"v1","end":""},{"old":"/api/v1/users/me","type":0,"val":"users","end":""},{"old":"/api/v1/users/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['user.update_info']['types'],
  },
  'user.get_achievements': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/users/achievements',
    tokens: [{"old":"/api/v1/users/achievements","type":0,"val":"api","end":""},{"old":"/api/v1/users/achievements","type":0,"val":"v1","end":""},{"old":"/api/v1/users/achievements","type":0,"val":"users","end":""},{"old":"/api/v1/users/achievements","type":0,"val":"achievements","end":""}],
    types: placeholder as Registry['user.get_achievements']['types'],
  },
  'map.get_markers': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/maps/markers',
    tokens: [{"old":"/api/v1/maps/markers","type":0,"val":"api","end":""},{"old":"/api/v1/maps/markers","type":0,"val":"v1","end":""},{"old":"/api/v1/maps/markers","type":0,"val":"maps","end":""},{"old":"/api/v1/maps/markers","type":0,"val":"markers","end":""}],
    types: placeholder as Registry['map.get_markers']['types'],
  },
  'map.get_places': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/maps/places',
    tokens: [{"old":"/api/v1/maps/places","type":0,"val":"api","end":""},{"old":"/api/v1/maps/places","type":0,"val":"v1","end":""},{"old":"/api/v1/maps/places","type":0,"val":"maps","end":""},{"old":"/api/v1/maps/places","type":0,"val":"places","end":""}],
    types: placeholder as Registry['map.get_places']['types'],
  },
  'home.get_data': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/home/data',
    tokens: [{"old":"/api/v1/home/data","type":0,"val":"api","end":""},{"old":"/api/v1/home/data","type":0,"val":"v1","end":""},{"old":"/api/v1/home/data","type":0,"val":"home","end":""},{"old":"/api/v1/home/data","type":0,"val":"data","end":""}],
    types: placeholder as Registry['home.get_data']['types'],
  },
  'learn.get_paths': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/learn/paths',
    tokens: [{"old":"/api/v1/learn/paths","type":0,"val":"api","end":""},{"old":"/api/v1/learn/paths","type":0,"val":"v1","end":""},{"old":"/api/v1/learn/paths","type":0,"val":"learn","end":""},{"old":"/api/v1/learn/paths","type":0,"val":"paths","end":""}],
    types: placeholder as Registry['learn.get_paths']['types'],
  },
  'learn.record_daily': {
    methods: ["POST"],
    pattern: '/api/v1/learn/record',
    tokens: [{"old":"/api/v1/learn/record","type":0,"val":"api","end":""},{"old":"/api/v1/learn/record","type":0,"val":"v1","end":""},{"old":"/api/v1/learn/record","type":0,"val":"learn","end":""},{"old":"/api/v1/learn/record","type":0,"val":"record","end":""}],
    types: placeholder as Registry['learn.record_daily']['types'],
  },
  'knowledge_node.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/knowledge-nodes/:id',
    tokens: [{"old":"/api/v1/knowledge-nodes/:id","type":0,"val":"api","end":""},{"old":"/api/v1/knowledge-nodes/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/knowledge-nodes/:id","type":0,"val":"knowledge-nodes","end":""},{"old":"/api/v1/knowledge-nodes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['knowledge_node.show']['types'],
  },
  'ai.chat': {
    methods: ["POST"],
    pattern: '/api/v1/ai/chats',
    tokens: [{"old":"/api/v1/ai/chats","type":0,"val":"api","end":""},{"old":"/api/v1/ai/chats","type":0,"val":"v1","end":""},{"old":"/api/v1/ai/chats","type":0,"val":"ai","end":""},{"old":"/api/v1/ai/chats","type":0,"val":"chats","end":""}],
    types: placeholder as Registry['ai.chat']['types'],
  },
  'image.list': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/images',
    tokens: [{"old":"/api/v1/images","type":0,"val":"api","end":""},{"old":"/api/v1/images","type":0,"val":"v1","end":""},{"old":"/api/v1/images","type":0,"val":"images","end":""}],
    types: placeholder as Registry['image.list']['types'],
  },
  'image.categories': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/images/categories',
    tokens: [{"old":"/api/v1/images/categories","type":0,"val":"api","end":""},{"old":"/api/v1/images/categories","type":0,"val":"v1","end":""},{"old":"/api/v1/images/categories","type":0,"val":"images","end":""},{"old":"/api/v1/images/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['image.categories']['types'],
  },
  'image.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/images/:filename',
    tokens: [{"old":"/api/v1/images/:filename","type":0,"val":"api","end":""},{"old":"/api/v1/images/:filename","type":0,"val":"v1","end":""},{"old":"/api/v1/images/:filename","type":0,"val":"images","end":""},{"old":"/api/v1/images/:filename","type":1,"val":"filename","end":""}],
    types: placeholder as Registry['image.show']['types'],
  },
  'image.metadata': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/images/:filename/metadata',
    tokens: [{"old":"/api/v1/images/:filename/metadata","type":0,"val":"api","end":""},{"old":"/api/v1/images/:filename/metadata","type":0,"val":"v1","end":""},{"old":"/api/v1/images/:filename/metadata","type":0,"val":"images","end":""},{"old":"/api/v1/images/:filename/metadata","type":1,"val":"filename","end":""},{"old":"/api/v1/images/:filename/metadata","type":0,"val":"metadata","end":""}],
    types: placeholder as Registry['image.metadata']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
