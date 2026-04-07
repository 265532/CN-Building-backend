# &#x20;用户与认证模块前端联调文档

本文档旨在为前端开发人员提供“用户与认证模块”的接口联调指南。所有接口均已在本地环境开发完成并符合 RESTful API 规范。

## 1. 基础说明

- **Base URL**: `http://<your-backend-host>:<port>/api/v1` (本地开发通常为 `http://localhost:8002/api/v1`)
- **数据格式**: 所有请求与响应均使用 `application/json` 格式。
- **全局响应体结构**: 接口统一返回如下结构的 JSON：
  ```json
  {
    "code": 200, // 状态码：200 表示成功，4xx/5xx 表示失败
    "message": "success", // 响应描述信息
    "data": {} // 实际业务数据，若失败可能为 null
  }
  ```
- **鉴权方式**: 登录成功后会返回 `token`，后续需要登录态的请求（如获取用户信息）需在 Request Header 中携带：
  ```http
  Authorization: Bearer <your_jwt_token_here>
  ```

---

## 2. 接口详细说明

### 2.1 微信登录/静默注册

用于微信小程序/公众号环境下的快速登录。如果用户首次登录，后端将自动创建新用户（静默注册）。

- **接口路径**: `POST /auth/wechat-login`
- **是否需要 Token**: 否
- **请求参数 (Body)**:
  | 字段名 | 类型 | 必填 | 说明 |
  | :-------------- | :----- | :- | :----------------------------------- |
  | `code` | string | 是 | 微信通过 `wx.login` 获取的临时登录凭证 |
  | `encryptedData` | string | 否 | 包括敏感数据在内的完整用户信息的加密数据（若需获取用户昵称等信息时传入） |
  | `iv` | string | 否 | 加密算法的初始向量 |
- **请求示例**:
  ```json
  {
    "code": "013xxxxx...",
    "encryptedData": "CiyLU1AWqcK...",
    "iv": "r7BXXKkLb8q..."
  }
  ```
- **响应示例 (成功)**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5...",
      "user": {
        "id": 1,
        "username": "wx_a1b2c3d4",
        "wechatOpenid": "oUpF8uMuAJO_M2pxb1Q9zNjWeS6o",
        "level": 1,
        "studyDays": 0
      }
    }
  }
  ```

### 2.2 账号密码登录

提供给管理后台或 Web 端的常规账号密码登录方式。

- **接口路径**: `POST /auth/account-login`
- **是否需要 Token**: 否
- **请求参数 (Body)**:
  | 字段名 | 类型 | 必填 | 说明 |
  | :--------- | :----- | :- | :----- |
  | `username` | string | 是 | 用户名或账号 |
  | `password` | string | 是 | 明文密码 |
- **请求示例**:
  ```json
  {
    "username": "test_user",
    "password": "my_secure_password"
  }
  ```
- **响应示例 (成功)**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5...",
      "user": {
        "id": 2,
        "username": "test_user",
        "level": 5,
        "studyDays": 12
      }
    }
  }
  ```

### 2.3 账号注册

提供给用户的账号注册接口。

- **接口路径**: `POST /auth/register`
- **是否需要 Token**: 否
- **请求参数 (Body)**:
  | 字段名 | 类型 | 必填 | 说明 |
  | :--------- | :----- | :- | :------------ |
  | `username` | string | 是 | 用户名 (3-20个字符) |
  | `password` | string | 是 | 密码 (最少6个字符) |
- **请求示例**:
  ```json
  {
    "username": "new_user",
    "password": "secure_password123"
  }
  ```
- **响应示例 (成功)**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5...",
      "user": {
        "id": 3,
        "username": "new_user",
        "level": 1,
        "studyDays": 0
      }
    }
  }
  ```

### 2.4 获取当前用户信息

获取当前登录用户的详细聚合信息，包括用户基础资料、徽章以及知识雷达数据。

- **接口路径**: `GET /users/me`
- **是否需要 Token**: **是** (需在 Header 添加 `Authorization: Bearer <token>`)
- **请求参数**: 无
- **响应示例 (成功)**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": {
      "id": 1,
      "username": "wx_a1b2c3d4",
      "level": 1,
      "studyDays": 0,
      "medals": [],
      "knowledgeRadar": {}
    }
  }
  ```

### 2.5 更新用户信息

允许用户修改部分个人资料。

- **接口路径**: `PUT /users/me`
- **是否需要 Token**: **是**
- **请求参数 (Body)**:
  | 字段名 | 类型 | 必填 | 说明 |
  | :--------- | :----- | :- | :-------------- |
  | `username` | string | 否 | 新的用户名 (3-20个字符) |
- **请求示例**:
  ```json
  {
    "username": "updated_username"
  }
  ```
- **响应示例 (成功)**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": {
      "id": 1,
      "username": "updated_username",
      "level": 1,
      "studyDays": 0,
      "medals": [],
      "knowledgeRadar": {}
    }
  }
  ```

### 2.6 获取用户成就列表

获取用户已解锁的成就及徽章列表。

- **接口路径**: `GET /users/achievements`
- **是否需要 Token**: **是**
- **请求参数**: 无
- **响应示例 (成功)**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": [
      {
        "id": "1",
        "title": "初学乍练",
        "description": "连续学习3天",
        "icon": "icon_url",
        "unlockedAt": "2023-10-01T12:00:00Z"
      }
    ]
  }
  ```

---

## 3. 联调常见问题排查

1. **401 Unauthorized 错误**：
   - 检查请求 Header 中是否正确携带了 `Authorization` 字段。
   - 检查格式是否为 `Bearer ` （注意后面有一个空格）。
   - Token 可能已过期（默认有效期为 7 天），尝试重新调用登录接口获取新 Token。
2. **微信登录报 400 错误**：
   - 确保 `wx.login` 获取的 `code` 未过期且未被使用过（`code` 仅 5 分钟内有效且只能使用一次）。
   - 检查后端的 `WECHAT_APP_ID` 和 `WECHAT_APP_SECRET` 配置是否与小程序/公众号对应的开发环境一致。
3. **跨域问题 (CORS)**：
   - 如果前端在浏览器联调时遇到跨域，请确认后端 `config/cors.ts` 及 `.env` 中配置的允许域名是否包含前端的本地开发地址（如 `http://localhost:5173` 等）。
