# 中国古建筑智慧学习平台 - 后端开发计划 (Dev Plan)

## 1. 现状评估与重构 (Phase 1)

根据对当前代码库的全面审查，目前项目已完成基础的 AdonisJS 框架搭建、数据库集成（Lucid ORM）、用户与认证模块（包含微信快捷登录）的初步实现，并配置了全局中间件与异常处理机制。
但部分代码仍存在不符合规范的地方，需要优先进行重构。

### 1.1 路由规范修复 (RESTful)

- **问题**：当前定义的路由（如 `/api/v1/user/info`，`/api/v1/auth/wechat-login`）未完全遵守 AI 编码规范中关于“复数名词，小写短横线”的规定。
- **计划**：
  - 修改 `start/routes.ts`，将路由标准化为 `/api/v1/users/me`（或 `/api/v1/users/info`）。
  - 同步调整 `UserController` 和前端接口联调文档（如 `API-Spec.md` 和 `../finished/auth_user_integration.md`）。

### 1.2 控制器瘦身与响应格式化

- **问题**：`app/controllers/user_controller.ts` 中手动组装并返回了 `{"code": 200, "message": "success", "data": ...}` 格式，且自行处理了 `try-catch`。而实际上 `start/kernel.ts` 已注册了全局的 `FormatResponseMiddleware` 和 `server.errorHandler`。
- **计划**：
  - 去除 `UserController` 中冗余的 `try-catch` 块，直接通过抛出异常的方式由全局 `app/exceptions/handler.ts` 处理错误。
  - 去除控制器中的响应封装，直接 `return data;`，利用中间件自动完成 JSON 标准格式的封装。
  - 将此规范作为后续所有 Controller 开发的强制标准。

---

## 2. 核心业务模块开发 (Phase 2)

根据需求规格说明书 (`docs/backend/API-Spec.md`)，需逐步实现以下未完成的核心业务模块：

### 2.1 智能导览与地图服务 (Map Module)

- **数据模型**：`ArchitecturePoint` (已存在基本迁移脚本，需补充具体的坐标字段与类别字段)。
- **接口需求**：
  - `GET /api/v1/maps/markers`: 获取古建筑标记点（支持按经纬度范围或分类筛选）。
  - `GET /api/v1/maps/places`: 获取附近地点列表及距离计算（可利用 PostgreSQL 的 PostGIS 或经纬度计算函数）。
- **任务分配**：创建 `MapController` 与 `MapService`。

### 2.2 学习与成就模块 (Learn & Achievement)

- **数据模型**：`LearningRecord`, `Achievement` (已存在基础模型，需实现业务逻辑关联)。
- **接口需求**：
  - `GET /api/v1/learning-paths`: 获取系统预设的学习路径与章节列表。
  - 完善 `/api/v1/users/achievements` 接口（当前仅返回空或 User 表内的简单 JSON，需改为关联 `Achievement` 表查询并校验解锁时间）。
- **任务分配**：创建 `LearnController` 与对应 Service，完善用户的打卡与进度更新逻辑。

### 2.3 首页内容聚合模块 (Home Module)

- **接口需求**：
  - `GET /api/v1/home/data`: 聚合获取首页所需的所有数据（Banner轮播图、金刚区操作、推荐建筑、主题专栏等）。
- **任务分配**：创建 `HomeController`，通过 `HomeService` 调用各个子模块的 Service 获取数据后统一组装并缓存（考虑引入 Redis 或简单的内存缓存以提升性能）。

### 2.4 知识图谱模块 (Knowledge Graph)

- **接口需求**：
  - `POST /api/v1/graphql`: (如果采用 GraphQL)，或将其转换为 RESTful 接口 `GET /api/v1/knowledge-nodes/:id`。根据具体业务场景决定是否真需要引入完整的 Apollo Server，还是基于现有 ORM 实现树状/图状结构的查询。
- **任务分配**：设计知识节点的自关联数据模型（`KnowledgeNode`），实现查询节点、相关节点与中西对比内容的逻辑。

### 2.5 AI 导学对话模块 (AI Module)

- **接口需求**：
  - `POST /api/v1/ai/chats`: 发送对话消息，支持流式响应 (SSE)。
- **任务分配**：
  - 创建 `AiController` 和 `AiService`。
  - 集成大模型 SDK（如 OpenAI SDK 或国内大模型接口）。
  - 实现基于流 (Server-Sent Events) 的数据推送，确保前端能实现“逐字打印”效果。

---

## 3. 测试、安全与部署 (Phase 3)

### 3.1 自动化测试覆盖

- 基于 AdonisJS 内置的 Japa 测试框架，对 `UserService`、`AuthService` 及后续的核心 Service 编写单元测试（存放于 `tests/unit/`）。
- 针对主要 API 接口编写集成测试（存放于 `tests/functional/`），覆盖主流程（如注册 -> 登录 -> 获取信息）。

### 3.2 环境变量与安全配置

- 完善 `.env.example` 中的 `WECHAT_APP_ID`, `WECHAT_APP_SECRET` 等密钥说明。
- 确保所有涉及用户密码、支付（如有）及第三方 API 的调用链路均已实现脱敏和日志安全打印。

### 3.3 文档更新与交接

- 每个阶段 (Phase) 完成后，更新 `docs/<module>/handover.md` 并记录关键技术决策。
- 使用 Swagger/OpenAPI 标准工具（如 `@adonisjs/core` 社区的 Swagger 插件）自动生成在线 API 接口文档，替代手写 `API-Spec.md`。

## 4. 里程碑与时间节点建议

- **Milestone 1 (本周)**：完成 Phase 1 路由重构与控制器瘦身，完成代码基建清理。
- **Milestone 2 (下周)**：完成 Phase 2 中的 地图服务(Map) 与 首页聚合(Home) 模块开发，支持前端主界面联调。
- **Milestone 3 (两周后)**：完成 学习成就(Learn) 与 知识图谱(Knowledge Graph) 模块的深度业务逻辑。
- **Milestone 4 (三周后)**：集成 AI 大模型，完成对话流式接口联调；补齐核心单元测试。
