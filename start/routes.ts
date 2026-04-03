import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const UserController = () => import('#controllers/user_controller')

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
        router.get('/info', [UserController, 'getInfo'])
        router.put('/info', [UserController, 'updateInfo'])
        router.get('/achievements', [UserController, 'getAchievements'])
      })
      .prefix('user')
      .use(middleware.jwtAuth())
  })
  .prefix('api/v1')
