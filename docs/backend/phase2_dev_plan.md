# 核心业务模块开发 (Phase 2) - 详细开发计划

本文档基于 `docs/backend/dev_plan.md` 的 Phase 2 规划和项目 `API-Spec.md` 生成，为接下来的核心业务模块开发提供可执行的、详细的任务拆解。所有代码实现**必须**严格遵循 `.trae/rules/ai-coding.md` 的分层架构、RESTful 规范及类型安全等要求。

---

## 1. 智能导览与地图服务 (Map Module)

本模块负责提供基于地理位置的古建筑数据、距离计算及分类筛选功能。

### 1.1 数据层与模型 (Database & Models)

- [ ] **完善表结构**：修改 `database/migrations/*_create_architecture_points_table.ts`（若已存在需新建增量迁移脚本），补充字段：
  - `name` (string, 建筑名称)
  - `latitude` (decimal/float, 纬度)
  - `longitude` (decimal/float, 经度)
  - `category` (string, 分类，如'皇家建筑', '宗教建筑')
  - `address` (string, 地址)
  - `description` (text, 描述)
- [ ] **更新模型**：完善 `app/models/architecture_point.ts`，配置准确的类型和字段映射。

### 1.2 业务逻辑层 (Services)

- [ ] **新建 `app/services/map_service.ts`**
  - [ ] `getMarkers(latitude: number, longitude: number, category?: string)`: 获取视野内的地图标记点。
  - [ ] `getNearbyPlaces(latitude: number, longitude: number, category?: string)`: 基于 Haversine 公式或 SQL 地理距离计算函数，获取附近的古建筑列表并按距离排序。

### 1.3 接口路由层 (Controllers)

- [ ] **新建 `app/controllers/map_controller.ts`**
  - [ ] 实现 `GET /api/v1/maps/markers`：使用 VineJS 校验 `latitude` 和 `longitude`。
  - [ ] 实现 `GET /api/v1/maps/places`：同上校验。
- [ ] **路由注册**：在 `start/routes.ts` 注册以上路由。

---

## 2. 学习与成就模块 (Learn & Achievement Module)

本模块处理用户的学习进度、打卡记录以及勋章成就的解锁逻辑。

### 2.1 数据层与模型 (Database & Models)

- [ ] **完善表结构**：修改 `learning_records` 和 `achievements` 的迁移脚本，或创建关系表 `user_achievements`（记录用户解锁成就的时间）。
- [ ] **更新模型**：完善 `LearningRecord` 和 `Achievement` 模型，并使用 `@hasMany` 或 `@manyToMany` 定义 `User` 与 `Achievement` 之间的关联关系。

### 2.2 业务逻辑层 (Services)

- [ ] **新建/更新 `app/services/learn_service.ts`**
  - [ ] `getLearningPaths()`: 返回系统预设的学习路径及章节列表。
  - [ ] `recordDailyStudy(userId: number)`: 处理用户每日打卡逻辑，更新用户的 `studyDays` 并检测是否触发成就解锁。
- [ ] **新建/更新 `app/services/achievement_service.ts`**
  - [ ] `getUserAchievements(userId: number)`: 关联查询用户的成就，包含未解锁成就（灰色状态）和已解锁成就（点亮状态与时间）。

### 2.3 接口路由层 (Controllers)

- [ ] **新建 `app/controllers/learn_controller.ts`**
  - [ ] 实现 `GET /api/v1/learning-paths`
- [ ] **更新/新建 `app/controllers/achievement_controller.ts`** (或沿用 UserController)
  - [ ] 按照 RESTful 规范，将获取用户成就路由挂载到 `GET /api/v1/users/me/achievements`。
- [ ] **路由注册**：在 `start/routes.ts` 注册，并添加 JWT 鉴权中间件。

---

## 3. 首页内容聚合模块 (Home Module)

负责前端首页的复杂数据聚合加载，要求响应迅速。

### 3.1 业务逻辑层 (Services)

- [ ] **新建 `app/services/home_service.ts`**
  - [ ] `getHomeData()`: 并发调用 Banner数据、推荐建筑数据、专栏主题数据等。组装为符合 API 规范的 `banners`, `quickActions`, `recommendedList`, `topics`, `crossCulturalList` 结构。

### 3.2 接口路由层 (Controllers)

- [ ] **新建 `app/controllers/home_controller.ts`**
  - [ ] 实现 `GET /api/v1/home/data`：纯数据获取，不涉及用户鉴权（或作为可选鉴权）。
- [ ] **路由注册**：在 `start/routes.ts` 注册。

---

## 4. 知识图谱模块 (Knowledge Graph Module)

负责古建筑中西对比、结构拆解的知识节点关联查询。

### 4.1 数据层与模型 (Database & Models)

- [ ] **新建表与模型**：创建 `knowledge_nodes` (知识节点表) 和 `knowledge_relations` (节点关系表，支持图状数据结构)。
- [ ] **模型关联**：在 `KnowledgeNode` 模型中配置自关联 (Self-referencing relationships)。

### 4.2 业务逻辑层 (Services)

- [ ] **新建 `app/services/knowledge_graph_service.ts`**
  - [ ] `getNodeDetails(id: string)`: 获取指定节点内容、它的上下级关联节点，以及中西对比 (`comparisons`) 数据。

### 4.3 接口路由层 (Controllers)

- [ ] **新建 `app/controllers/knowledge_node_controller.ts`**
  - [ ] 实现 `GET /api/v1/knowledge-nodes/:id`：替代原定复杂的 GraphQL，采用更契合当前框架的 RESTful 实现。
- [ ] **路由注册**：在 `start/routes.ts` 注册。

---

## 5. AI 导学对话模块 (AI Module)

对接外部大语言模型，提供流式问答服务。

### 5.1 业务逻辑层 (Services)

- [ ] **新建 `app/services/ai_service.ts`**
  - [ ] 封装大模型 SDK (如 OpenAI / 阿里通义千问等)。
  - [ ] 实现 `chatStream(messages: any[], imageUrl?: string)`: 组装古建筑垂直领域的 System Prompt，向大模型发送请求，并返回 ReadableStream 以供控制器输出 Server-Sent Events (SSE)。

### 5.2 接口路由层 (Controllers)

- [ ] **新建 `app/controllers/ai_controller.ts`**
  - [ ] 实现 `POST /api/v1/ai/chats`：接收用户消息数组，设置 HTTP Header `Content-Type: text/event-stream`，将流数据 pipe 到客户端。
- [ ] **路由注册**：在 `start/routes.ts` 注册，并添加 JWT 鉴权中间件防刷。

---

## 6. 阶段交付规范

每完成上述任一子模块（如 1. Map Module），需：

1. 在 `tests/unit/` 下为其 Service 编写基本测试用例。
2. 确保没有任何 `try-catch` 掩盖底层错误，必须交由全局 Exception Handler。
3. 确保 Controller 中未手动组装 `{"code": 200}`，直接返回原始数据对象。
4. 更新 `docs/backend/handover.md` (或相应的模块交接文档) 记录该模块的技术决策。
