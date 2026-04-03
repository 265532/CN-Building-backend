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
    pattern: '/api/v1/user/info',
    tokens: [{"old":"/api/v1/user/info","type":0,"val":"api","end":""},{"old":"/api/v1/user/info","type":0,"val":"v1","end":""},{"old":"/api/v1/user/info","type":0,"val":"user","end":""},{"old":"/api/v1/user/info","type":0,"val":"info","end":""}],
    types: placeholder as Registry['user.get_info']['types'],
  },
  'user.update_info': {
    methods: ["PUT"],
    pattern: '/api/v1/user/info',
    tokens: [{"old":"/api/v1/user/info","type":0,"val":"api","end":""},{"old":"/api/v1/user/info","type":0,"val":"v1","end":""},{"old":"/api/v1/user/info","type":0,"val":"user","end":""},{"old":"/api/v1/user/info","type":0,"val":"info","end":""}],
    types: placeholder as Registry['user.update_info']['types'],
  },
  'user.get_achievements': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/user/achievements',
    tokens: [{"old":"/api/v1/user/achievements","type":0,"val":"api","end":""},{"old":"/api/v1/user/achievements","type":0,"val":"v1","end":""},{"old":"/api/v1/user/achievements","type":0,"val":"user","end":""},{"old":"/api/v1/user/achievements","type":0,"val":"achievements","end":""}],
    types: placeholder as Registry['user.get_achievements']['types'],
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
