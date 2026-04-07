/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.wechat_login': {
    methods: ["POST"]
    pattern: '/api/v1/auth/wechat-login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['wechatLogin']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['wechatLogin']>>>
    }
  }
  'auth.account_login': {
    methods: ["POST"]
    pattern: '/api/v1/auth/account-login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['accountLogin']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['accountLogin']>>>
    }
  }
  'auth.account_register': {
    methods: ["POST"]
    pattern: '/api/v1/auth/register'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['accountRegister']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['accountRegister']>>>
    }
  }
  'user.get_info': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users/me'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_controller').default['getInfo']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_controller').default['getInfo']>>>
    }
  }
  'user.update_info': {
    methods: ["PUT"]
    pattern: '/api/v1/users/me'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_controller').default['updateInfo']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_controller').default['updateInfo']>>>
    }
  }
  'user.get_achievements': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users/achievements'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_controller').default['getAchievements']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_controller').default['getAchievements']>>>
    }
  }
  'map.get_markers': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/maps/markers'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/map_controller').default['getMarkers']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/map_controller').default['getMarkers']>>>
    }
  }
  'map.get_places': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/maps/places'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/map_controller').default['getPlaces']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/map_controller').default['getPlaces']>>>
    }
  }
  'home.get_data': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/home/data'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/home_controller').default['getData']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/home_controller').default['getData']>>>
    }
  }
  'learn.get_paths': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/learn/paths'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/learn_controller').default['getPaths']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/learn_controller').default['getPaths']>>>
    }
  }
  'learn.record_daily': {
    methods: ["POST"]
    pattern: '/api/v1/learn/record'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/learn_controller').default['recordDaily']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/learn_controller').default['recordDaily']>>>
    }
  }
  'knowledge_node.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/knowledge-nodes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/knowledge_node_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/knowledge_node_controller').default['show']>>>
    }
  }
  'ai.chat': {
    methods: ["POST"]
    pattern: '/api/v1/ai/chats'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/ai_controller').default['chat']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/ai_controller').default['chat']>>>
    }
  }
  'image.list': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/images'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/image_controller').default['list']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/image_controller').default['list']>>>
    }
  }
  'image.categories': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/images/categories'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/image_controller').default['categories']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/image_controller').default['categories']>>>
    }
  }
  'image.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/images/:filename'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { filename: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/image_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/image_controller').default['show']>>>
    }
  }
  'image.metadata': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/images/:filename/metadata'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { filename: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/image_controller').default['metadata']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/image_controller').default['metadata']>>>
    }
  }
}
