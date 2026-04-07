# 中国古建筑智慧学习平台 - RESTful API 规格说明 (API Spec)

## 1. 概述

本文档定义了中国古建筑智慧学习平台前后端交互的 RESTful API 接口规范。
所有接口的基础路径为：`/api/v1`
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
    "code": 200,
    "message": "success",
    "data": {
      "token": "string",
      "user": {
        "id": number,
        "username": string,
        "level": number,
        "studyDays": number
      }
    }
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
    "code": 200,
    "message": "success",
    "data": {
      "token": "string",
      "user": {
        "id": number,
        "username": string,
        "level": number,
        "studyDays": number
      }
    }
  }
  ```

### 2.3 账号注册

- **路径**: `/auth/register`
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
    "code": 200,
    "message": "success",
    "data": {
      "token": "string",
      "user": {
        "id": number,
        "username": string,
        "level": number,
        "studyDays": number
      }
    }
  }
  ```

### 2.4 获取当前用户信息

- **路径**: `/users/me`
- **方法**: `GET`
- **请求头**: `Authorization: Bearer <token>`
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": {
      "id": number,
      "username": string,
      "level": number,
      "studyDays": number,
      "userMedals": object,
      "userKnowledgeRadar": object
    }
  }
  ```

### 2.5 更新用户信息

- **路径**: `/users/me`
- **方法**: `PUT`
- **请求头**: `Authorization: Bearer <token>`
- **请求体**:
  ```json
  {
    "username": "string"
  }
  ```
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": {
      "id": number,
      "username": string,
      "level": number,
      "studyDays": number
    }
  }
  ```

### 2.6 获取用户成就列表

- **路径**: `/users/achievements`
- **方法**: `GET`
- **请求头**: `Authorization: Bearer <token>`
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": [
      {
        "id": number,
        "name": string,
        "description": string,
        "type": string,
        "iconUrl": string,
        "unlockedAt": string
      }
    ]
  }
  ```

## 3. 智能导览与地图服务 (Map)

### 3.1 获取古建筑标记点

- **路径**: `/maps/markers`
- **方法**: `GET`
- **查询参数**:
  - `latitude` (number, 必填)
  - `longitude` (number, 必填)
  - `category` (string, 选填)
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": [
      {
        "id": number,
        "name": string,
        "latitude": number,
        "longitude": number,
        "category": string
      }
    ]
  }
  ```

### 3.2 获取附近地点列表

- **路径**: `/maps/places`
- **方法**: `GET`
- **查询参数**:
  - `latitude` (number, 必填)
  - `longitude` (number, 必填)
  - `category` (string, 选填)
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": [
      {
        "id": number,
        "name": string,
        "latitude": number,
        "longitude": number,
        "category": string,
        "distance": number
      }
    ]
  }
  ```

## 4. 学习与成就模块 (Learn & Achievement)

### 4.1 获取学习路径列表

- **路径**: `/learn/paths`
- **方法**: `GET`
- **请求头**: `Authorization: Bearer <token>`
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": [
      {
        "id": number,
        "title": string,
        "description": string,
        "points": [
          {
            "id": number,
            "name": string,
            "latitude": number,
            "longitude": number
          }
        ]
      }
    ]
  }
  ```

### 4.2 记录每日学习

- **路径**: `/learn/record`
- **方法**: `POST`
- **请求头**: `Authorization: Bearer <token>`
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": {
      "studyDays": number,
      "level": number,
      "newAchievements": [
        {
          "id": number,
          "name": string,
          "description": string,
          "type": string
        }
      ]
    }
  }
  ```

## 5. 首页内容模块 (Home)

### 5.1 获取首页聚合数据

- **路径**: `/home/data`
- **方法**: `GET`
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": {
      "featuredPoints": [
        {
          "id": number,
          "name": string,
          "description": string,
          "latitude": number,
          "longitude": number
        }
      ],
      "statistics": {
        "totalUsers": number,
        "totalPoints": number,
        "totalRecords": number
      }
    }
  }
  ```

## 6. 知识图谱模块 (Knowledge Graph)

### 6.1 获取知识节点详情

- **路径**: `/knowledge-nodes/:id`
- **方法**: `GET`
- **路径参数**:
  - `id` (number, 必填)
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": {
      "id": number,
      "title": string,
      "content": string,
      "type": string,
      "comparisons": object,
      "relatedNodes": [
        {
          "id": number,
          "title": string,
          "type": string
        }
      ]
    }
  }
  ```

## 7. AI 导学模块 (AI)

### 7.1 发送对话消息

- **路径**: `/ai/chats`
- **方法**: `POST`
- **请求头**: `Authorization: Bearer <token>`
- **请求体**:
  ```json
  {
    "message": "string",
    "context": object
  }
  ```
- **响应体**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": {
      "response": string,
      "context": object
    }
  }
  ```

## 8. 错误码约定

- `200`: 请求成功
- `400`: 参数验证失败
- `401`: 未授权 (Token 过期或无效)
- `403`: 无权限访问
- `404`: 资源不存在
- `409`: 资源冲突（如用户名已存在）
- `500`: 服务器内部错误
