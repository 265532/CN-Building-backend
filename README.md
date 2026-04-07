# 中国古建筑智慧学习平台 - 后端 (CP-Backend)

## 1. 项目简介

中国古建筑智慧学习平台 (China Ancient Architecture Smart Learning Platform) 的后端服务，提供用户认证、地图导览、学习成就、首页数据、知识图谱查询及 AI 导学等核心功能接口。

本项目基于 **Node.js** 环境，采用 **AdonisJS v6** 框架开发，并全面使用 **TypeScript** 保证代码类型的安全与规范。数据库选用 **PostgreSQL**，通过 **Lucid ORM** 进行数据管理。

## 2. 技术栈

- **框架**: [AdonisJS v6](https://docs.adonisjs.com/)
- **语言**: TypeScript
- **数据库**: PostgreSQL (开发环境通过 Docker 容器化部署)
- **ORM**: Lucid ORM
- **数据校验**: VineJS
- **代码规范**: ESLint + Prettier + Husky (pre-commit hook)

## 3. 本地开发指南

### 3.1 环境要求

- Node.js (推荐 v20+)
- pnpm (推荐的包管理器)
- Docker & Docker Compose (用于启动本地数据库)

### 3.2 快速启动

1. **安装依赖**

   ```bash
   pnpm install
   ```

2. **环境变量配置**
   复制 `.env.example` 到 `.env` 文件，并根据需要配置参数（如微信 App ID / Secret, 数据库连接等）。

   ```bash
   cp .env.example .env
   ```

3. **启动数据库容器**
   本项目包含预配置的 `docker-compose.yml`，可通过 Docker 快速启动 PostgreSQL：

   ```bash
   docker-compose up -d postgres
   ```

4. **执行数据库迁移**
   创建必要的数据表结构：

   ```bash
   node ace migration:run
   ```

5. **启动开发服务器**
   启动带有热更新（HMR）的开发服务器：
   ```bash
   pnpm run dev
   ```

### 3.3 常用命令

- `pnpm run build`: 编译构建生产环境代码
- `pnpm run test`: 运行单元测试
- `pnpm run lint`: 执行 ESLint 代码检查
- `pnpm run format`: 执行 Prettier 格式化
- `node ace migration:rollback`: 回滚上一次数据库迁移
- `node ace make:controller <name>`: 生成新的控制器
- `node ace make:model <name>`: 生成新的数据模型
- `node ace make:migration <name>`: 生成新的迁移脚本

## 4. 目录结构说明

```text
├── app/
│   ├── controllers/      # HTTP 控制器层 (薄逻辑，负责路由请求分发)
│   ├── exceptions/       # 全局异常处理机制
│   ├── middleware/       # 中间件 (如统一响应格式、日志记录、JWT 鉴权)
│   ├── models/           # Lucid 数据模型 (数据库表映射)
│   ├── services/         # 核心业务逻辑层 (胖逻辑)
│   ├── utils/            # 通用工具类 (如加密解密、微信 API 封装等)
│   └── validators/       # VineJS 请求数据验证器
├── bin/                  # 服务启动与控制台入口脚本
├── config/               # 框架各模块的配置文件
├── database/
│   └── migrations/       # 数据库表结构变更脚本
├── docs/                 # 项目级别的 API 文档、需求规划、交接文档与历史 Prompt 记录
├── providers/            # AdonisJS 服务提供者
├── start/                # 启动脚本 (环境变量验证、路由注册等)
└── tests/                # 单元测试与集成测试目录
```

## 5. 编码规约 (基于 AI-Coding 规范)

1. **分层架构**：遵循 `Controller -> Service -> Repository (Model)`。Controller 仅处理请求/响应和参数校验，核心业务必须下沉至 Service。
2. **命名规范**：文件使用 `snake_case`，类名使用 `PascalCase`。
3. **接口规范**：API 路径严格遵循 RESTful 风格（复数名词，如 `/api/v1/users`）。接口统一返回结构：`{"code": 200, "message": "success", "data": ...}`。
4. **类型安全**：所有函数必须包含完整的 TypeScript Type Hints。
5. **数据库操作**：表名复数，必须包含 `id`, `created_at`, `updated_at` 字段。严禁手动修改数据库结构，必须使用 Migration 脚本。
6. **安全配置**：所有密钥和敏感信息必须使用 `.env` 环境变量读取，严禁硬编码。
