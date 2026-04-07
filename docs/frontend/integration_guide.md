# 前端联调文档 (Frontend Integration Guide)

本文档汇总了中国古建筑智慧学习平台**现阶段所有可用**的后端 API 接口，旨在为前端开发人员（Web/小程序端）提供联调参考。

所有接口均已在本地环境开发完成并符合 RESTful API 规范。

## 1. 基础约定

- **Base URL**: `http://<your-backend-host>:<port>/api/v1` (本地开发通常为 `http://localhost:8002/api/v1`)
- **全局响应格式**: 所有常规接口返回以下 JSON 结构：
  ```json
  {
    "code": 200, // 状态码：200 表示成功，4xx/5xx 表示业务或系统失败
    "message": "success", // 响应描述信息
    "data": {} // 实际业务数据，若失败可能为 null 或错误详情
  }
  ```
- **鉴权 (Auth)**:
  - 部分接口（标注为 `Token 必填`）需要在 Request Header 中携带 `Authorization: Bearer <your_jwt_token>`。
  - Token 可通过登录或注册接口获取。

---

## 2. 用户与认证模块 (Auth & User)

### 2.1 微信登录/静默注册

用于微信小程序环境下的快速登录。如果用户首次登录，后端将自动创建新用户。

- **接口**: `POST /auth/wechat-login`
- **Token 必填**: 否
- **Body 参数**:
  - `code` (string, 必填): `wx.login` 获取的临时登录凭证。
  - `encryptedData` (string, 选填): 包含敏感用户信息的加密数据。
  - `iv` (string, 选填): 加密算法初始向量。
- **返回数据 (`data`)**:
  ```json
  {
    "token": "eyJhbG...",
    "user": { "id": 1, "username": "wx_user", "level": 1, "studyDays": 0 }
  }
  ```

### 2.2 账号密码登录

提供给管理后台或 Web 端的常规账号密码登录。

- **接口**: `POST /auth/account-login`
- **Token 必填**: 否
- **Body 参数**:
  - `username` (string, 必填)
  - `password` (string, 必填)
- **返回数据 (`data`)**: 同微信登录，返回 `token` 和 `user` 信息。

### 2.3 账号注册

- **接口**: `POST /auth/register`
- **Token 必填**: 否
- **Body 参数**:
  - `username` (string, 必填): 3-20个字符。
  - `password` (string, 必填): 最少6个字符。
- **返回数据 (`data`)**: 同上。

### 2.4 获取当前用户信息

获取当前登录用户的聚合信息，包含徽章以及知识雷达数据。

- **接口**: `GET /users/me`
- **Token 必填**: **是**
- **返回数据 (`data`)**:
  ```json
  {
    "id": 1,
    "username": "user",
    "level": 1,
    "studyDays": 0,
    "medals": [],
    "knowledgeRadar": {}
  }
  ```

### 2.5 更新用户信息

- **接口**: `PUT /users/me`
- **Token 必填**: **是**
- **Body 参数**:
  - `username` (string, 选填): 新的用户名。
- **返回数据 (`data`)**: 更新后的用户信息。

### 2.6 获取用户成就列表

- **接口**: `GET /users/achievements`
- **Token 必填**: **是**
- **返回数据 (`data`)**:
  ```json
  [
    {
      "id": "1",
      "title": "初学乍练",
      "description": "连续学习3天",
      "icon": "icon_url",
      "unlockedAt": "2023-10-01T12:00:00Z" // 未解锁时为 null
    }
  ]
  ```

---

## 3. 地图导览服务 (Map Module)

### 3.1 获取古建筑地图标记点

- **接口**: `GET /maps/markers`
- **Token 必填**: 否
- **Query 参数**:
  - `latitude` (number, 必填)
  - `longitude` (number, 必填)
  - `category` (string, 选填): 按分类筛选。
- **返回数据 (`data`)**:
  ```json
  [
    {
      "id": 1,
      "name": "故宫",
      "latitude": 39.916,
      "longitude": 116.39,
      "category": "皇家建筑",
      "address": "北京市东城区景山前街4号",
      "distance": "1.2km"
    }
  ]
  ```

### 3.2 获取附近建筑列表

- **接口**: `GET /maps/places`
- **Token 必填**: 否
- **Query 参数**: 同上。
- **返回数据 (`data`)**: 结构与 markers 类似，但按距离从近到远排序，最多返回20条。

---

## 4. 首页数据聚合 (Home Module)

### 4.1 获取首页聚合数据

为前端首页提供一站式数据加载。

- **接口**: `GET /home/data`
- **Token 必填**: 否
- **返回数据 (`data`)**:
  ```json
  {
    "banners": [{ "id": "1", "imageUrl": "...", "title": "...", "url": "..." }],
    "quickActions": [{ "id": "1", "icon": "...", "name": "...", "url": "...", "isTab": true }],
    "recommendedList": [
      {
        "id": "1",
        "title": "...",
        "subtitle": "...",
        "coverUrl": "...",
        "tag": "...",
        "url": "..."
      }
    ],
    "topics": [{ "id": "1", "name": "...", "url": "..." }],
    "crossCulturalList": [
      { "id": "1", "tag": "...", "title": "...", "description": "...", "url": "..." }
    ]
  }
  ```

---

## 5. 学习进度模块 (Learn Module)

### 5.1 获取系统学习路径

- **接口**: `GET /learn/paths`
- **Token 必填**: **是**
- **返回数据 (`data`)**:
  ```json
  {
    "headerTitle": "中国古建筑",
    "headerSubtitle": "探索古人的智慧",
    "paths": [
      { "id": "1", "title": "木结构拆解", "desc": "斗栱、榫卯等", "url": "/pages/learn/wood" }
    ]
  }
  ```

### 5.2 记录每日打卡

- **接口**: `POST /learn/record`
- **Token 必填**: **是**
- **返回数据 (`data`)**:
  ```json
  {
    "studyDays": 5
  }
  ```

---

## 6. 知识图谱模块 (Knowledge Graph)

### 6.1 获取知识节点详情

- **接口**: `GET /knowledge-nodes/:id`
- **Token 必填**: 否
- **路径参数**: `id` 为知识节点 ID。
- **返回数据 (`data`)**:
  ```json
  {
    "id": "1",
    "title": "斗栱",
    "content": "斗栱是中国建筑特有的一种结构...",
    "type": "structure",
    "comparisons": [],
    "relatedNodes": ["榫卯", "梁架"] // 相关拓展节点名称或对象
  }
  ```

---

## 7. AI 导学对话模块 (AI Module)

### 7.1 发送 AI 对话 (流式)

此接口为 SSE (Server-Sent Events) 流式响应接口，**不会**被全局的 `FormatResponseMiddleware` 包裹成 `{"code": 200}` 格式。
前端（如小程序）需开启支持流式接收（如 `uni.request` 的 `enableChunked: true`）。

- **接口**: `POST /ai/chats`
- **Token 必填**: **是**
- **Body 参数**:
  - `messages` (Array, 必填): 对话历史，格式如 `[{ "role": "user", "content": "斗栱的作用是什么？" }]`。
  - `imageUrl` (string, 选填): 图片地址（用于多模态识别）。
  - `stream` (boolean, 选填): 默认为 `false`，如果为 `true` 则返回 SSE 流。
- **返回数据 (Stream = true 时)**:
  响应头 `Content-Type: text/event-stream`。数据将以 `data: {"text": "..."}` 的形式不断推送，结束时推送 `data: [DONE]`。
