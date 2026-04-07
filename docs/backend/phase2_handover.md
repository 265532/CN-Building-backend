# 中国古建筑智慧学习平台 - 阶段二后端交接文档

## 1. 已实现功能 (Completed Features)

根据 `phase2_dev_plan.md`，目前我们已完成了五大核心业务模块的业务层（Service）、接口层（Controller）、数据模型（Models & Migrations）的基础架构搭建与功能实现。

### 1.1 智能导览与地图服务 (Map Module)

- **数据库与模型**：完成了 `ArchitecturePoint` 及其 Migration 脚本。
- **核心逻辑**：`MapService` 实现了基于坐标（Latitude/Longitude）的距离计算（使用 Haversine 公式计算直线距离），返回格式化后的 `distance` 字段。
- **接口**：提供 `GET /api/v1/maps/markers` 及 `GET /api/v1/maps/places` 接口，并配置了 VineJS 验证器。

### 1.2 学习与成就模块 (Learn & Achievement Module)

- **数据库与模型**：新增了 `LearningRecord`、`Achievement` 以及关系表 `UserAchievement`。
- **核心逻辑**：
  - `LearnService.recordDailyStudy`：记录用户每日打卡并增加连续学习天数（`studyDays`）。
  - `AchievementService.getUserAchievements`：使用 AdonisJS 的 `preload` 功能实现用户与徽章之间的多对多关联查询（读取 pivot 表中的解锁时间）。
- **接口**：在 `LearnController` 中提供学习路径和每日打卡接口；将用户成就列表按 RESTful 规范合并入 `GET /api/v1/users/me/achievements`。

### 1.3 首页内容聚合模块 (Home Module)

- **核心逻辑**：`HomeService` 完成了首页复杂聚合数据（Banners、快捷操作、推荐列表、专栏和跨文化对比）的组装，支持前台页面直接消费渲染。
- **接口**：提供 `GET /api/v1/home/data` 接口。

### 1.4 知识图谱模块 (Knowledge Graph Module)

- **数据库与模型**：新增了 `KnowledgeNode` 及其关联表，支持知识点间的自关联。
- **核心逻辑**：`KnowledgeGraphService.getNodeDetails` 利用 `.preload('relatedNodes')` 能够优雅地获取单个节点的关联拓展知识。
- **接口**：提供 `GET /api/v1/knowledge-nodes/:id`，放弃了复杂的 GraphQL 方案，回归 RESTful 接口架构。

### 1.5 AI 导学对话模块 (AI Module)

- **核心逻辑**：`AiService` 初步实现了大语言模型流式输出（SSE, Server-Sent Events）的模拟，通过 `ReadableStream` 每次推入 Chunk 并设置网络延迟，以实现“逐字打印”效果。
- **接口**：提供 `POST /api/v1/ai/chats` 接口，成功配置了响应头 `Content-Type: text/event-stream`。

## 2. 架构审查与技术决策说明 (Architecture Review & Decisions)

1. **彻底解耦与异常接管**：
   - 所有的 Controller 均**没有**手动拼装 `{"code": 200, "message": "success", "data": ...}`，完美执行了 Phase 1 制定的利用全局 `FormatResponseMiddleware` 自动封装的策略。
   - 所有业务逻辑中可能产生的预期错误（如：查询不到对应的知识节点），均使用 `throw new Exception('message', { status: 400 })` 直接抛出，由全局错误处理器兜底。
2. **类型安全与参数校验**：
   - 所有的外部输入请求（如 `latitude`, `longitude`, `messages`）均使用了 VineJS 在 Controller 层进行了严格的 Schema 过滤与类型转换，保障了下层 Service 不会收到脏数据。
3. **修复的历史 Bug**：
   - 在审查过程中，修复了 `LearnController` 中的参数结构错误（将 `async recordDaily({ ctx }: any)` 修复为 `async recordDaily(ctx: HttpContext)`），保障了 TypeScript 的类型校验和运行时正确获取 `ctx.jwtUserId`。

## 3. 遗留 Todo 事项 (Next Steps)

1. **补齐自动化测试**：目前 `tests/unit/` 目录下尚未建立针对 Map、Learn、Home、AI 模块的单元测试文件，需在下一阶段（Milestone 3/4 期间）补充 `map_service.spec.ts` 等测试用例。
2. **对接真实的 AI SDK**：已完成。在 `AiService.chatStream` 中集成了 `openai` SDK，成功接入阿里云通义千问大模型（`qwen3.5-27b`），通过兼容模式流式输出回答。
3. **数据填充 (Seeding)**：为了让前端更好地联调地图和知识图谱，需要编写 Database Seeder（`node ace make:seeder`）插入一批真实的故宫、天坛等测试数据。
