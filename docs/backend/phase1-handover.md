# 中国古建筑智慧学习平台 - 阶段一后端交接文档

## 1. 数据库连接信息与配置方式

本项目使用 **PostgreSQL** 作为核心关系型数据库，通过 AdonisJS 的 **Lucid ORM** 进行交互。

### 本地开发环境
- 我们已通过 `docker-compose.yml` 提供了预配置的 PostgreSQL 容器。
- 启动数据库：运行 `docker-compose up -d postgres`
- 本地开发连接参数（定义在 `.env` 或 `.env.example` 中）：
  - `DB_HOST`: `localhost`
  - `DB_PORT`: `5432`
  - `DB_USER`: `postgres`
  - `DB_PASSWORD`: `postgres`
  - `DB_DATABASE`: `cp_backend`

### 数据表与迁移
- 所有的表结构迁移脚本存放在 `database/migrations/`。
- 运行迁移：`node ace migration:run`
- 回滚迁移：`node ace migration:rollback`

---

## 2. 全局响应的 JSON 数据结构约定

为了确保前后端交互的一致性，本项目已经配置了统一响应拦截器（`app/middleware/format_response_middleware.ts`）与全局异常处理器（`app/exceptions/handler.ts`）。

### 成功响应
所有由控制器直接返回的数据（对象、数组、字符串等），都会被中间件自动包装为以下标准格式：

```json
{
  "code": 200,
  "message": "success",
  "data": {
    // 实际的业务数据
    "id": 1,
    "name": "故宫"
  }
}
```

### 错误响应
业务异常或框架内部抛出的异常（如 404, 401），会被异常处理器捕获，并统一返回如下格式：

```json
{
  "code": 401,
  "message": "E_UNAUTHORIZED_ACCESS: Unauthorized access",
  "data": null
}
```

### 数据验证错误 (Validation Error)
表单/请求参数验证失败（422 Unprocessable Entity），其具体错误信息会挂载在 `data` 字段中：

```json
{
  "code": 422,
  "message": "Validation Error",
  "data": [
    {
      "field": "email",
      "message": "The email format is invalid",
      "rule": "email"
    }
  ]
}
```

---

## 3. 目录结构设计简要说明

当前采用标准的 AdonisJS MVC + Service 分层架构：

- `app/controllers/`: HTTP 层的入口，负责处理请求参数、调用 Service，直接返回原始数据即可（中间件会自动封装）。
- `app/services/`: **核心业务逻辑层**。所有的复杂逻辑（如积分计算、打卡逻辑等）应封装在此处。坚持 "Thin Controller, Fat Service"。
- `app/models/`: Lucid ORM 数据模型，对应数据库表。我们在阶段一已生成了 `User`, `Achievement`, `ArchitecturePoint`, `LearningRecord` 四个核心模型及它们的关系。
- `app/middleware/`: 包含统一返回格式中间件 (`format_response_middleware.ts`) 和 请求日志拦截 (`log_request_middleware.ts`)。
- `app/exceptions/`: 全局异常处理器 (`handler.ts`)。
- `app/validators/`: 存放 VineJS 数据校验器。

---

## 4. 后续开发注意事项

1. **类型安全**：项目已开启严格模式，新增环境变量必须在 `start/env.ts` 中通过 VineJS 配置 Schema 验证。
2. **代码规范**：项目集成了 ESLint + Prettier，并通过 Husky + lint-staged 开启了 pre-commit 钩子。请确保代码在 Commit 之前没有语法与格式错误。
3. **数据库关系**：在使用模型查询时，如需获取关联数据，请使用 `.preload()`（如 `User.query().preload('learningRecords')`）。
4. **日志**：可直接通过 `import logger from '@adonisjs/core/services/logger'` 使用 Pino 日志，开发环境会输出漂亮的彩色日志，生产环境会自动以 JSON 输出以便于收集。
