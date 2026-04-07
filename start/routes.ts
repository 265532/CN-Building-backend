import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const UserController = () => import('#controllers/user_controller')
const MapController = () => import('#controllers/map_controller')
const LearnController = () => import('#controllers/learn_controller')
const HomeController = () => import('#controllers/home_controller')
const KnowledgeNodeController = () => import('#controllers/knowledge_node_controller')
const AiController = () => import('#controllers/ai_controller')
const ImageController = () => import('#controllers/image_controller')

router.get('/', async () => {
  return { hello: 'world' }
})

router
  .group(() => {
    // Auth routes
    router
      .group(() => {
        router.post('/wechat-login', [AuthController, 'wechatLogin'])
        router.post('/account-login', [AuthController, 'accountLogin'])
        router.post('/register', [AuthController, 'accountRegister'])
      })
      .prefix('auth')

    // User routes
    router
      .group(() => {
        router.get('/me', [UserController, 'getInfo'])
        router.put('/me', [UserController, 'updateInfo'])
        router.get('/achievements', [UserController, 'getAchievements'])
      })
      .prefix('users')
      .use(middleware.jwtAuth())

    // Map routes
    router
      .group(() => {
        router.get('/markers', [MapController, 'getMarkers'])
        router.get('/places', [MapController, 'getPlaces'])
      })
      .prefix('maps')
    // Home routes
    router
      .group(() => {
        router.get('/data', [HomeController, 'getData'])
      })
      .prefix('home')

    // Learn routes
    router
      .group(() => {
        router.get('/paths', [LearnController, 'getPaths'])
        router.post('/record', [LearnController, 'recordDaily'])
      })
      .prefix('learn')
      .use(middleware.jwtAuth())
    // Knowledge Graph routes
    router
      .group(() => {
        router.get('/:id', [KnowledgeNodeController, 'show'])
      })
      .prefix('knowledge-nodes')
    // AI routes
    router
      .group(() => {
        router.post('/chats', [AiController, 'chat'])
      })
      .prefix('ai')
      .use(middleware.jwtAuth())

    // Image resource routes (public, no auth required)
    router
      .group(() => {
        router.get('/', [ImageController, 'list'])
        router.get('/categories', [ImageController, 'categories'])
        router.get('/:filename', [ImageController, 'show'])
        router.get('/:filename/metadata', [ImageController, 'metadata'])
      })
      .prefix('images')
  })
  .prefix('api/v1')
