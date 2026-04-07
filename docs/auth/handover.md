# 用户与认证模块 (Auth & User) 交接文档

## 1. 已实现功能

- **数据库与数据模型**
  - 成功更新了 `users` 表迁移脚本，包含了 `username`, `password_hash`, `wechat_openid`, `level`, `study_days`, `user_medals`, `user_knowledge_radar` 等核心业务字段。
  - 完成了 `app/models/user.ts` 模型的对应更新，确保强类型定义匹配。
- **工具类与中间件**
  - 实现了 `JwtUtil` (`app/utils/jwt_util.ts`)，封装了 JWT 的生成与解析逻辑。
  - 实现了 `CryptoUtil` (`app/utils/crypto_util.ts`)，基于 AdonisJS Core Hash 服务封装了密码哈希验证。
  - 实现了 `WechatUtil` (`app/utils/wechat_util.ts`)，包含 `code2Session` 调用及加密数据解密逻辑。
  - 增加了 `JwtAuthMiddleware` (`app/middleware/jwt_auth_middleware.ts`)，用于保护需要登录的路由。
- **业务逻辑层 (Services)**
  - `AuthService` (`app/services/auth_service.ts`)：支持账号密码登录与微信一键登录/静默注册，返回封装的 JWT Token。
  - `UserService` (`app/services/user_service.ts`)：实现通过 ID 获取用户聚合信息（含 medals 与 knowledgeRadar）。
- **接口路由层 (Controllers)**
  - `AuthController`：注册并实现了 `/api/v1/auth/wechat-login` 与 `/api/v1/auth/account-login`。
  - `UserController`：注册并实现了 `/api/v1/user/info`。
  - API 响应格式已严格封装为 `{"code": 200, "message": "success", "data": ...}`。

## 2. 技术决策说明

- **框架适配与语言**：虽然原计划中部分文件扩展名为 `.py`（如 `user_model.py`），但由于项目基座为 Node.js + AdonisJS + TypeScript，实际实现已完全适配 AdonisJS 规范（如使用 `app/models/user.ts`，基于 Lucid ORM 等）。
- **认证机制选择**：在遵循 AdonisJS 风格的基础上，通过引入 `jsonwebtoken` 独立封装了 JWT 认证流程，并通过自定义 `JwtAuthMiddleware` 扩展了 `HttpContext` 的 `jwtUserId`，以满足完全掌控 Token 流程的需求。
- **密码加密**：直接利用了 `@adonisjs/core/services/hash` 作为底层实现，确保安全性和对 AdonisJS 生态的兼容性。
- **环境变量**：向 `start/env.ts` 以及 `.env` 补充了 `JWT_SECRET`, `WECHAT_APP_ID`, `WECHAT_APP_SECRET` 等环境变量及校验规则，确保密钥不会硬编码在代码中。

## 3. 遗留 Todo 事项

- [ ] **环境变量配置**：需要在各部署环境（测试、生产）的 `.env` 文件中真实配置 `WECHAT_APP_ID` 和 `WECHAT_APP_SECRET`。
- [ ] **数据库同步**：需在开发/测试环境中运行 `node ace migration:run`，应用最新更新的 `users` 表结构。
- [ ] **前端联调**：前端对接 `wechat-login` 时，需确认微信端 `encryptedData` 与 `iv` 传参格式和触发时机。
- [ ] **测试完善**：当前在 `tests/unit/` 下仅搭建了基本测试骨架，后续需结合测试数据库完成针对 Service 层的完整集成和单元测试覆盖。
- [ ] **异常捕捉统一化**：建议进一步在 `app/exceptions/handler.ts` 中针对 JWT 过期、微信 API 报错等定义更优雅的全局错误转换机制。

## 4. 全局审查与后续规划 (2026-04-03)

在最近一次的项目全局审查中，我们确认了 Auth 模块的核心逻辑实现正确。但是，在路由设计与控制器规范上发现了可优化的空间：

1. 当前的 `UserController` 中路由定义为 `/api/v1/user/info`，违背了 RESTful 规范中的复数要求。已在 `docs/backend/dev_plan.md` 中计划统一变更为 `/api/v1/users/me` 等格式。
2. 当前控制器中大量存在 `{"code": 200, "message": "success", "data": ...}` 的冗余返回封装，将依赖全局 `FormatResponseMiddleware` 进行自动包装，清理手动返回逻辑。

具体详见 [后端开发计划](../../docs/backend/dev_plan.md)。
