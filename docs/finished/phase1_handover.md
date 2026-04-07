# [已完成] Phase 1 现状评估与重构 - 交接文档

## 1. 已实现功能 (Completed Features)

1. **路由规范修复 (RESTful)**：
   - 将原有不符合规范的路由 `GET/PUT /api/v1/user/info` 重构为符合 RESTful 规范的 `GET/PUT /api/v1/users/me`。
   - 将 `GET /api/v1/user/achievements` 修改为 `GET /api/v1/users/achievements`。
   - 同步更新了对应的前后端联调文档 (`API-Spec.md` 和 `auth_user_integration.md`)。

2. **控制器瘦身与响应格式化**：
   - 彻底移除了 `UserController` 和 `AuthController` 中冗余的 `try-catch` 异常捕获块。
   - 移除了手动拼装的 `{"code": 200, "message": "success", "data": ...}` 响应封装。
   - 依赖全局注册的 `FormatResponseMiddleware` 和 `HttpExceptionHandler` 实现 JSON 标准格式的自动封装和错误处理。

3. **异常处理机制升级**：
   - 在 `UserService` 和 `AuthService` 业务层，将普通的 `Error` 抛出替换为 Adonis 框架内置的 `Exception` (从 `@adonisjs/core/exceptions` 引入)。
   - 配合状态码设置 `{ status: 400 }`，确保能够触发全局 HTTP 错误处理器，返回标准化的 400 状态码及错误信息。

## 2. Todo 事项 (Todo)

- **地图服务(Map)与首页聚合(Home)模块**：(Milestone 2) 准备着手开发相关模型和控制器。
- **知识图谱与学习成就模块**：(Milestone 3) 需要实现实际的业务逻辑并对接数据库。

## 3. 技术决策说明 (Technical Decisions)

- **Controller 层规范**：
  - 强制所有 Controller 只进行请求参数的提取和验证 (`validateUsing`)。
  - 直接返回 Service 层的结果（如 `return await this.userService.getUserInfo(...)`），将 JSON 格式化职责全权交由 `FormatResponseMiddleware` 处理，实现业务层与表现层解耦。
- **异常处理规范**：
  - Service 层如遇业务失败（如：密码错误、用户不存在等），统一使用 `throw new Exception('message', { status: 400 })`。
  - 由全局 `HttpExceptionHandler` 自动捕获异常并返回符合约定的 `code: 400` 错误体格式。
- **用户认证拦截**：
  - 由于路由使用了 `.use(middleware.jwtAuth())` 鉴权中间件，到达 Controller 的请求必定包含有效的 `jwtUserId`，因此去除了 Controller 层中冗余的 `if (!userId) return 401` 检查，并使用 `ctx.jwtUserId!` 断言非空。

## 4. 后续建议 (Next Steps)

- 在后续所有 Controller 和 Service 的开发中，必须严格遵循上述的响应封装及异常处理规范，禁止再手动拼装 `{code: 200}`。
- 在后续完成数据库表设计时，记得生成相关 Migration 脚本，并为模型加上公共的时间戳和标准字段。
