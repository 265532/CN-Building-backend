FROM node:20-alpine AS base

# All deps stage
FROM base AS deps
WORKDIR /app
RUN corepack enable pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build stage
FROM deps AS build
WORKDIR /app
COPY . .
# 使用 ts-node 运行 ace 命令
RUN npx ts-node bin/console.ts build

# Production stage
FROM base
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/build /app/build
WORKDIR /app/build
RUN corepack enable pnpm && pnpm install --frozen-lockfile --prod
EXPOSE 3333
CMD ["node", "bin/server.js"]
