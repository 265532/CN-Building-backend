# 中国古建筑智慧学习平台 - RESTful API 规格说明 (API Spec)

## 1. 概述
本文档定义了中国古建筑智慧学习平台前后端交互的 RESTful API 接口规范。
所有接口的基础路径为：`https://api.example.com/v1`
所有返回数据均遵循统一结构：
```json
{
  "code": 200,
  "message": "success",
  "data": { ... }
}
```

## 2. 用户与认证模块 (Auth & User)

### 2.1 微信快捷登录
- **路径**: `/auth/wechat-login`
- **方法**: `POST`
- **请求体**:
  ```json
  {
    "code": "string",
    "encryptedData": "string",
    "iv": "string"
  }
  ```
- **响应体**:
  ```json
  {
    "token": "string"
  }
  ```

### 2.2 账号密码登录
- **路径**: `/auth/account-login`
- **方法**: `POST`
- **请求体**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **响应体**:
  ```json
  {
    "token": "string"
  }
  ```

### 2.3 获取当前用户信息
- **路径**: `/user/info`
- **方法**: `GET`
- **请求头**: `Authorization: Bearer <token>`
- **响应体**:
  ```json
  {
    "id": "string",
    "username": "string",
    "level": "string",
    "studyDays": "number",
    "medals": [
      { "id": "string", "name": "string", "type": "string" }
    ],
    "knowledgeRadar": [
      { "name": "string", "value": "number" }
    ]
  }
  ```

## 3. 智能导览与地图服务 (Map)

### 3.1 获取古建筑标记点
- **路径**: `/map/markers`
- **方法**: `GET`
- **查询参数**:
  - `latitude` (number, 必填)
  - `longitude` (number, 必填)
  - `category` (string, 选填, 默认 'all')
- **响应体**:
  ```json
  [
    {
      "id": "number",
      "name": "string",
      "latitude": "number",
      "longitude": "number",
      "category": "string",
      "address": "string",
      "distance": "string"
    }
  ]
  ```

### 3.2 获取附近地点列表
- **路径**: `/map/places`
- **方法**: `GET`
- **查询参数**:
  - `latitude` (number, 必填)
  - `longitude` (number, 必填)
  - `category` (string, 选填, 默认 'all')
- **响应体**:
  ```json
  [
    {
      "id": "number",
      "name": "string",
      "distance": "string",
      "address": "string",
      "category": "string"
    }
  ]
  ```

## 4. 学习与成就模块 (Learn & Achievement)

### 4.1 获取学习路径列表
- **路径**: `/learn/paths`
- **方法**: `GET`
- **响应体**:
  ```json
  {
    "headerTitle": "string",
    "headerSubtitle": "string",
    "paths": [
      {
        "id": "string",
        "title": "string",
        "desc": "string",
        "url": "string"
      }
    ]
  }
  ```

### 4.2 获取用户成就列表
- **路径**: `/user/achievements`
- **方法**: `GET`
- **请求头**: `Authorization: Bearer <token>`
- **响应体**:
  ```json
  [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "icon": "string",
      "unlockedAt": "string | null"
    }
  ]
  ```

## 5. 首页内容模块 (Home)

### 5.1 获取首页聚合数据
- **路径**: `/home/data`
- **方法**: `GET`
- **响应体**:
  ```json
  {
    "banners": [
      { "id": "string", "imageUrl": "string", "title": "string", "url": "string" }
    ],
    "quickActions": [
      { "id": "string", "icon": "string", "name": "string", "url": "string", "isTab": "boolean" }
    ],
    "recommendedList": [
      { "id": "string", "title": "string", "subtitle": "string", "coverUrl": "string", "tag": "string", "url": "string" }
    ],
    "topics": [
      { "id": "string", "name": "string", "url": "string" }
    ],
    "crossCulturalList": [
      { "id": "string", "tag": "string", "title": "string", "description": "string", "url": "string" }
    ]
  }
  ```

## 6. 知识图谱模块 (Knowledge Graph)

### 6.1 GraphQL 查询知识节点
- **路径**: `/graphql`
- **方法**: `POST`
- **请求体**: 
  ```json
  {
    "query": "query GetKnowledgeNode($id: ID!) { node(id: $id) { id title content type relatedNodes comparisons { aspect east west } } }",
    "variables": { "id": "string" }
  }
  ```
- **响应体**:
  ```json
  {
    "data": {
      "node": {
        "id": "string",
        "title": "string",
        "content": "string",
        "type": "string",
        "relatedNodes": ["string"],
        "comparisons": [
          { "aspect": "string", "east": "string", "west": "string" }
        ]
      }
    }
  }
  ```

## 7. AI 导学模块 (AI)

### 7.1 发送对话消息 (支持流式响应)
- **路径**: `/ai/chat`
- **方法**: `POST`
- **请求头**: `Authorization: Bearer <token>`
- **请求体**:
  ```json
  {
    "messages": [
      {
        "role": "string",
        "content": "string"
      }
    ],
    "imageUrl": "string", 
    "stream": "boolean"
  }
  ```
- **说明**: 
  - 大模型调用已全面迁移至后端实现，后端负责组装系统提示词（System Prompt）、处理大模型 API 鉴权以及进行内容安全审核。
  - 前端只需将用户的历史对话 `messages` 数组和可选的 `imageUrl` (支持 Base64 或线上 URL) 发送给该接口。
  - 如果 `stream` 为 `true`，后端将返回 SSE (Server-Sent Events) 数据流，前端使用 `uni.request` 配合 `enableChunked: true` 接收分块数据以实现逐字打印效果。

## 8. 错误码约定
- `200`: 请求成功
- `400`: 参数验证失败
- `401`: 未授权 (Token 过期或无效)
- `403`: 无权限访问
- `500`: 服务器内部错误
