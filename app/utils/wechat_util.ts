import env from '#start/env'
import crypto from 'node:crypto'

export class WechatUtil {
  /**
   * Get WeChat session info (openid, session_key) from login code
   */
  static async code2Session(code: string): Promise<{
    openid?: string
    session_key?: string
    unionid?: string
    errcode?: number
    errmsg?: string
  }> {
    const appId = env.get('WECHAT_APP_ID')
    const appSecret = env.get('WECHAT_APP_SECRET')

    if (!appId || !appSecret) {
      throw new Error('WeChat APP_ID or APP_SECRET is not configured')
    }

    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to call WeChat API: ${response.statusText}`)
    }

    const data = await response.json()
    return data as {
      openid?: string
      session_key?: string
      unionid?: string
      errcode?: number
      errmsg?: string
    }
  }

  /**
   * Decrypt WeChat encrypted data
   */
  static decryptData(encryptedData: string, iv: string, sessionKey: string): any {
    const appId = env.get('WECHAT_APP_ID')

    const sessionKeyBuffer = Buffer.from(sessionKey, 'base64')
    const encryptedDataBuffer = Buffer.from(encryptedData, 'base64')
    const ivBuffer = Buffer.from(iv, 'base64')

    try {
      const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKeyBuffer, ivBuffer)
      decipher.setAutoPadding(true)

      let decoded = decipher.update(encryptedDataBuffer, undefined, 'utf8')
      decoded += decipher.final('utf8')

      const decodedData = JSON.parse(decoded)

      if (decodedData.watermark.appid !== appId) {
        throw new Error('Invalid watermark appid')
      }

      return decodedData
    } catch (err: any) {
      throw new Error(`Failed to decrypt WeChat data: ${err.message}`)
    }
  }
}
