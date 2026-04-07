# [已完成] 用户与认证模块 (Auth & User) 开发计划

基于项目 API 规格说明书 (`docs/backend/API-Spec.md`) 以及 AI 专属编码规约 (`.trae/rules/ai-coding.md`)，为“2. 用户与认证模块”制定以下详细开发计划。

## 1. 数据库与数据模型 (Models & Migrations)

- **任务 1.1: 编写数据库迁移脚本**
  - 设计 `users` 表，强制包含公共字段：`id`, `created_at`, `updated_at`。
  - 业务字段包括：`username`, `password_hash`, `wechat_openid`, `level`, `study_days` 等。
  - （可选）设计辅助表 `user_medals`（勋章）和 `user_knowledge_radar`（知识雷达），或采用 JSON 字段存储以简化初始版本。
- **任务 1.2: 定义数据模型**
  - 在 `models/user_model.py` (或对应的 js/ts 文件) 中创建 `UserModel` 类。
  - 完善模型字段定义与类型提示（Type Hints）。

## 2. 工具类与中间件 (Utils & Core)

- **任务 2.1: 认证鉴权工具**
  - 在 `utils/jwt_util.py` 中封装 JWT Token 的生成与解析方法。
  - 密钥（Secret）必须从环境变量（如 `process.env.JWT_SECRET` / `os.getenv('JWT_SECRET')`）读取。
- **任务 2.2: 加密工具**
  - 在 `utils/crypto_util.py` 中实现密码哈希（如 bcrypt）的加密和比对。
- **任务 2.3: 微信服务端交互**
  - 在 `utils/wechat_util.py` 封装微信 `code2Session` 接口调用以及 `encryptedData` 数据解密逻辑。

## 3. 业务逻辑层 (Services)

- **任务 3.1: 认证服务 (`services/auth_service.py`)**
  - 实现 `wechat_login(code, encryptedData, iv)`: 处理微信登录，若用户不存在则静默注册，成功后返回 JWT Token。
  - 实现 `account_login(username, password)`: 验证账号密码，成功后返回 JWT Token。
- **任务 3.2: 用户服务 (`services/user_service.py`)**
  - 实现 `get_user_info(user_id)`: 根据 Token 中的用户 ID 获取用户信息，并组装 `medals` 和 `knowledgeRadar` 聚合数据。

## 4. 接口路由层 (Controllers / API)

- **任务 4.1: 认证接口 (`api/auth_api.py`)**
  - 注册路由 `POST /api/v1/auth/wechat-login`
  - 注册路由 `POST /api/v1/auth/account-login`
  - _规范约束_: 仅进行入参校验，逻辑调用转交 Service，返回结果严格封装为 `{"code": 200, "message": "success", "data": ...}`。
- **任务 4.2: 用户接口 (`api/user_api.py`)**
  - 注册路由 `GET /api/v1/user/info`
  - _规范约束_: 需增加 Token 鉴权中间件拦截未登录请求。

## 5. 测试与交付文档 (Tests & Handover)

- **任务 5.1: 单元测试**
  - 在 `tests/` 目录下编写 `auth_service` 和 `user_service` 的核心逻辑测试用例。
- **任务 5.2: 编写交接文档**
  - 按照规约要求，在开发完成后生成 `docs/auth/handover.md`，记录已实现功能、遗留 Todo 及技术决策。
