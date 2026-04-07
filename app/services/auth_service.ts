import User from '#models/user'
import { Exception } from '@adonisjs/core/exceptions'
import { JwtUtil } from '#utils/jwt_util'
import { CryptoUtil } from '#utils/crypto_util'
import { WechatUtil } from '#utils/wechat_util'

export class AuthService {
  /**
   * Account login with username and password
   */
  async accountLogin(username: string, passwordPlain: string) {
    const user = await User.findBy('username', username)
    if (!user) {
      throw new Exception('Invalid credentials', { status: 400 })
    }

    if (!user.passwordHash) {
      throw new Exception('Invalid credentials', { status: 400 })
    }

    const isValid = await CryptoUtil.verifyPassword(user.passwordHash, passwordPlain)
    if (!isValid) {
      throw new Exception('Invalid credentials', { status: 400 })
    }

    const token = JwtUtil.generateToken({ userId: user.id })
    return { token, user }
  }

  /**
   * Account registration
   */
  async accountRegister(username: string, passwordPlain: string) {
    const existingUser = await User.findBy('username', username)
    if (existingUser) {
      throw new Exception('Username already exists', { status: 400 })
    }

    const passwordHash = await CryptoUtil.hashPassword(passwordPlain)

    const user = new User()
    user.username = username
    user.passwordHash = passwordHash
    user.level = 1
    user.studyDays = 0
    await user.save()

    const token = JwtUtil.generateToken({ userId: user.id })
    return { token, user }
  }

  /**
   * WeChat login with code
   */
  async wechatLogin(code: string, encryptedData?: string, iv?: string) {
    const sessionData = await WechatUtil.code2Session(code)
    if (sessionData.errcode || !sessionData.openid) {
      throw new Exception(`WeChat login failed: ${sessionData.errmsg || 'Unknown error'}`, {
        status: 400,
      })
    }

    const openid = sessionData.openid

    let userInfo = null
    if (encryptedData && iv && sessionData.session_key) {
      userInfo = WechatUtil.decryptData(encryptedData, iv, sessionData.session_key)
    }

    let user = await User.findBy('wechatOpenid', openid)
    if (!user) {
      user = new User()
      user.wechatOpenid = openid
      user.username = userInfo?.nickName || `wx_${Math.random().toString(36).substring(2, 10)}`
      await user.save()
    }

    const token = JwtUtil.generateToken({ userId: user.id })
    return { token, user }
  }
}
