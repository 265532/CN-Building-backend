# 图片资源访问 API 接口文档

## 一、概述

本文档描述了中国古建筑智慧学习平台的图片资源访问接口。该接口提供图片资源的查询、分类浏览、单张获取等功能，无需权限校验即可访问。

### 基础信息
- **Base URL**: `/api/v1`
- **认证方式**: 无需认证（公开接口）
- **数据格式**: JSON
- **字符编码**: UTF-8
- **支持格式**: PNG, JPG, JPEG, WebP, GIF, SVG

### 统一响应格式
```json
{
  "code": 200,
  "message": "success",
  "data": { ... }
}
```

---

## 二、接口列表

| 序号 | 接口名称 | 方法 | 路径 | 说明 |
|------|----------|------|------|------|
| 1 | 获取图片列表 | GET | /api/v1/images | 分页获取图片资源列表 |
| 2 | 获取图片分类 | GET | /api/v1/images/categories | 获取所有图片分类及统计 |
| 3 | 获取单张图片 | GET | /api/v1/images/:filename | 获取图片文件（二进制流） |
| 4 | 获取图片元数据 | GET | /api/v1/images/:filename/metadata | 获取图片详细信息 |

---

## 三、接口详细说明

### 3.1 获取图片列表

**接口地址**: `GET /api/v1/images`

**功能描述**: 分页获取静态资源目录下的所有图片列表，支持按分类、类型过滤和关键词搜索。

#### 请求参数（Query Parameters）

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | integer | 否 | 1 | 页码，从 1 开始 |
| limit | integer | 否 | 20 | 每页数量，最大 100 |
| category | string | 否 | - | 按分类筛选（见分类列表） |
| type | string | 否 | - | 按类型筛选（见类型枚举） |
| search | string | 否 | - | 关键词搜索（匹配文件名、原始名称、分类） |

#### 支持的分类值 (category)
- `皇宫建筑` - 中国古代皇家宫殿建筑
- `园林建筑` - 中国古典园林景观建筑
- `建筑构件` - 古建筑结构构件（斗拱、榫卯等）
- `楼阁建筑` - 古代楼阁塔式建筑
- `跨文化对照` - 中西方建筑对比素材
- `建筑装饰` - 建筑装饰元素
- `AI功能` - AI相关功能展示图片
- `地图图标` - 地图标记和导航图标
- `其他` - 未分类图片

#### 支持的类型值 (type)
- `palace` - 皇宫
- `garden` - 园林
- `component` - 构件
- `pavilion` - 楼阁
- `cross-cultural` - 跨文化对照
- `decoration` - 装饰
- `ai-feature` - AI功能
- `marker` - 标记图标
- `other` - 其他

#### 成功响应示例

**请求**:
```
GET /api/v1/images?page=1&limit=10&category=皇宫建筑
```

**响应 (200 OK)**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "items": [
      {
        "filename": "故宫.jpg",
        "originalName": "故宫.jpg",
        "extension": ".jpg",
        "mimeType": "image/jpeg",
        "size": 2456789,
        "category": "皇宫建筑",
        "type": "palace",
        "url": "/api/v1/images/%E6%95%85%E5%AE%AB.jpg",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "modifiedAt": "2024-01-15T10:30:00.000Z"
      },
      {
        "filename": "故宫皇宫.png",
        "originalName": "故宫皇宫.png",
        "extension": ".png",
        "mimeType": "image/png",
        "size": 3567890,
        "category": "皇宫建筑",
        "type": "palace",
        "url": "/api/v1/images/%E6%95%85%E5%AE%AB%E7%9A%87%E5%AE%AB.png",
        "createdAt": "2024-01-15T11:20:00.000Z",
        "modifiedAt": "2024-01-15T11:20:00.000Z"
      }
    ],
    "total": 4,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

#### 响应字段说明

| 字段名 | 类型 | 说明 |
|--------|------|------|
| items | array | 当前页的图片列表 |
| items[].filename | string | 文件名（URL安全编码） |
| items[].originalName | string | 原始文件名 |
| items[].extension | string | 文件扩展名 |
| items[].mimeType | string | MIME 类型 |
| items[].size | number | 文件大小（字节） |
| items[].category | string | 图片分类 |
| items[].type | string | 图片类型标识 |
| items[].url | string | 图片访问 URL |
| items[].createdAt | datetime | 创建时间 |
| items[].modifiedAt | datetime | 最后修改时间 |
| total | number | 总记录数 |
| page | number | 当前页码 |
| limit | number | 每页数量 |
| totalPages | number | 总页数 |

---

### 3.2 获取图片分类

**接口地址**: `GET /api/v1/images/categories`

**功能描述**: 获取所有可用的图片分类及其统计信息。

#### 请求参数
无

#### 成功响应示例

**请求**:
```
GET /api/v1/images/categories
```

**响应 (200 OK)**:
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "name": "皇宫建筑",
      "count": 4,
      "description": "中国古代皇家宫殿建筑，如故宫等"
    },
    {
      "name": "园林建筑",
      "count": 4,
      "description": "中国古典园林景观建筑"
    },
    {
      "name": "建筑构件",
      "count": 3,
      "description": "古建筑结构构件，如斗拱、榫卯等"
    },
    {
      "name": "楼阁建筑",
      "count": 6,
      "description": "古代楼阁塔式建筑，如黄鹤楼、应县木塔等"
    },
    {
      "name": "跨文化对照",
      "count": 3,
      "description": "中西方建筑对比素材"
    },
    {
      "name": "建筑装饰",
      "count": 3,
      "description": "建筑装饰元素，如灯笼、彩画等"
    },
    {
      "name": "AI功能",
      "count": 1,
      "description": "AI相关功能展示图片"
    },
    {
      "name": "地图图标",
      "count": 1,
      "description": "地图标记和导航图标"
    }
  ]
}
```

#### 响应字段说明

| 字段名 | 类型 | 说明 |
|--------|------|------|
| name | string | 分类名称 |
| count | number | 该分类下的图片数量 |
| description | string | 分类描述 |

---

### 3.3 获取单张图片

**接口地址**: `GET /api/v1/images/:filename`

**功能描述**: 根据文件名获取图片文件的二进制流数据。支持 HTTP 缓存机制（ETag）。

#### 路径参数 (Path Parameters)

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| filename | string | 是 | 图片文件名（需 URL 编码） |

#### 请求头 (Request Headers)

| 头部名称 | 必填 | 说明 |
|----------|------|------|
| If-None-Match | 否 | ETag 值，用于条件请求（缓存验证） |

#### 响应头 (Response Headers)

| 头部名称 | 说明 |
|----------|------|
| Content-Type | 图片 MIME 类型（如 image/jpeg） |
| Content-Length | 文件大小（字节） |
| ETag | 实体标签，用于缓存控制 |
| Cache-Control: public, max-age=86400 | 缓存策略（24小时） |
| Last-Modified | 最后修改时间 |

#### 成功响应示例

**请求**:
```
GET /api/v1/images/%E6%95%85%E5%AE%AB.jpg
```

**响应 (200 OK)**:
```
Content-Type: image/jpeg
Content-Length: 2456789
ETag: "a1b2c3d4e5f6"
Cache-Control: public, max-age=86400
Last-Modified: Mon, 15 Jan 2024 10:30:00 GMT

[Binary Image Data]
```

#### 缓存命中响应 (304 Not Modified)

当客户端发送 `If-None-Match` 头且与服务器 ETag 匹配时：

**响应 (304 Not Modified)**:
```
HTTP/1.1 304 Not Modified
ETag: "a1b2c3d4e5f6"
Cache-Control: public, max-age=86400
```

#### 错误响应 (404 Not Found)

**请求**:
```
GET /api/v1/images/nonexistent.jpg
```

**响应 (404 Not Found)**:
```json
{
  "code": 404,
  "message": "Image not found",
  "data": null
}
```

#### 使用示例

**前端 HTML img 标签使用**:
```html
<img src="/api/v1/images/%E6%95%85%E5%AE%AB.jpg" alt="故宫">
```

**JavaScript 动态加载**:
```javascript
const imageUrl = '/api/v1/images/' + encodeURIComponent('故宫.jpg')
const img = new Image()
img.src = imageUrl
document.body.appendChild(img)
```

**CSS 背景图使用**:
```css
.banner {
  background-image: url('/api/v1/images/%E9%BB%84%E9%B9%A4%E6%A5%BC.png');
}
```

---

### 3.4 获取图片元数据

**接口地址**: `GET /api/v1/images/:filename/metadata`

**功能描述**: 获取指定图片的详细元数据信息，不包含图片文件本身。

#### 路径参数 (Path Parameters)

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| filename | string | 是 | 图片文件名（需 URL 编码） |

#### 成功响应示例

**请求**:
```
GET /api/v1/images/%E6%95%85%E5%AE%AB.jpg/metadata
```

**响应 (200 OK)**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "filename": "故宫.jpg",
    "originalName": "故宫.jpg",
    "extension": ".jpg",
    "mimeType": "image/jpeg",
    "size": 2456789,
    "category": "皇宫建筑",
    "type": "palace",
    "url": "/api/v1/images/%E6%95%85%E5%AE%AB.jpg",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "modifiedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 错误响应 (404 Not Found)

**响应 (404 Not Found)**:
```json
{
  "code": 404,
  "message": "Image not found",
  "data": null
}
```

---

## 四、错误码说明

| HTTP 状态码 | 错误码 (code) | message | 说明 | 解决方案 |
|-------------|---------------|---------|------|----------|
| 200 | 200 | success | 请求成功 | - |
| 304 | - | - | 资源未修改（缓存命中） | 使用本地缓存 |
| 400 | 400 | Bad Request | 请求参数错误 | 检查参数格式和必填项 |
| 404 | 404 | Image not found | 图片不存在 | 检查文件名是否正确 |
| 500 | 500 | Internal server error | 服务器内部错误 | 稍后重试或联系管理员 |

---

## 五、性能优化特性

### 5.1 服务端缓存
- **内存缓存**: 图片列表数据在服务端缓存 5 分钟（300 秒），减少磁盘 I/O
- **自动刷新**: 缓存过期后自动重新扫描 static 目录

### 5.2 HTTP 缓存
- **ETag 支持**: 基于 MD5 哈希生成实体标签
- **Cache-Control**: 设置为 `public, max-age=86400`（24小时浏览器缓存）
- **条件请求**: 支持 `If-None-Match` 头，避免重复传输相同内容

### 5.3 流式传输
- **Stream 方式**: 使用 Node.js Stream 读取文件，内存占用低
- **大文件友好**: 适合处理大型高清图片

### 5.4 安全措施
- **路径遍历防护**: 自动过滤 `..` 和 `/` 等危险字符
- **文件名消毒**: 仅允许安全的文件名字符
- **MIME 类型白名单**: 仅返回已知的图片 MIME 类型

---

## 六、最佳实践建议

### 6.1 前端集成建议

#### 1. 列表展示场景
```javascript
async function loadImages(page = 1) {
  const response = await fetch(`/api/v1/images?page=${page}&limit=12`)
  const result = await response.json()
  
  if (result.code === 200) {
    renderImageList(result.data.items)
    updatePagination(result.data)
  }
}

function renderImageList(images) {
  images.forEach(img => {
    const card = document.createElement('div')
    card.innerHTML = `
      <img src="${img.url}" alt="${img.filename}" loading="lazy">
      <p>${img.category}</p>
      <span>${formatFileSize(img.size)}</span>
    `
    container.appendChild(card)
  })
}
```

#### 2. 分类筛选场景
```javascript
async function loadCategories() {
  const response = await fetch('/api/v1/images/categories')
  const result = await response.json()
  
  if (result.code === 200) {
    renderCategoryFilter(result.data)
  }
}

function renderCategoryFilter(categories) {
  categories.forEach(cat => {
    const option = document.createElement('option')
    option.value = cat.name
    option.textContent = `${cat.name} (${cat.count})`
    selectElement.appendChild(option)
  })
}
```

#### 3. 图片懒加载优化
```html
<img 
  data-src="/api/v1/images/%E6%95%85%E5%AE%AB.jpg" 
  alt="故宫"
  class="lazy-load"
>

<script>
const lazyImages = document.querySelectorAll('.lazy-load')
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      observer.unobserve(img)
    }
  })
})

lazyImages.forEach(img => observer.observe(img))
</script>
```

### 6.2 性能优化建议

1. **前端缓存**: 利用浏览器缓存，避免重复请求相同图片
2. **CDN 加速**: 生产环境建议将图片上传至 CDN
3. **图片压缩**: 上传前进行适当压缩（推荐 WebP 格式）
4. **缩略图生成**: 列表页使用缩略图，详情页再加载原图
5. **预加载关键图片**: 对首屏重要图片使用 `<link rel="preload">`

### 6.3 错误处理建议

```javascript
async function fetchImageWithFallback(filename) {
  try {
    const response = await fetch(`/api/v1/images/${encodeURIComponent(filename)}`)
    
    if (response.status === 404) {
      console.warn(`Image not found: ${filename}`)
      return getPlaceholderImage()
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.blob()
  } catch (error) {
    console.error('Failed to fetch image:', error)
    return getErrorImage()
  }
}

function getPlaceholderImage() {
  return '/placeholder.svg'
}

function getErrorImage() {
  return '/error-image.svg'
}
```

---

## 七、当前可用图片资源清单

根据 `static/` 目录扫描结果，当前共有 **25 张**图片资源：

| 文件名 | 分类 | 类型 | 大小估算 |
|--------|------|------|----------|
| AI拍照识别概念图.png | AI功能 | ai-feature | ~500KB |
| marker.png | 地图图标 | marker | ~10KB |
| 传统木结构.jpg | 建筑构件 | component | ~800KB |
| 古典中国园林.jpg | 园林建筑 | garden | ~1.2MB |
| 古典中国园林2.jpg | 园林建筑 | garden | ~1.0MB |
| 古希腊柱1.webp | 跨文化对照 | cross-cultural | ~600KB |
| 古希腊柱设计图.jpg | 跨文化对照 | cross-cultural | ~700KB |
| 圆形塔夜景.jpg | 楼阁建筑 | pavilion | ~900KB |
| 大殿.png | 皇宫建筑 | palace | ~1.5MB |
| 故宫.jpg | 皇宫建筑 | palace | ~2.3MB |
| 故宫皇宫.png | 皇宫建筑 | palace | ~3.4MB |
| 斗拱1.jpg | 建筑构件 | component | ~700KB |
| 斗拱2.jpg | 建筑构件 | component | ~750KB |
| 楼阁.png | 楼阁建筑 | pavilion | ~1.8MB |
| 法式园林.png | 跨文化对照 | cross-cultural | ~850KB |
| 法式园林设计图.jpg | 跨文化对照 | cross-cultural | ~900KB |
| 灯笼.jpg | 建筑装饰 | decoration | ~400KB |
| 皇宫正面.png | 皇宫建筑 | palace | ~2.8MB |
| 阁楼.png | 楼阁建筑 | pavilion | ~1.6MB |
| 非遗建筑技艺参观.png | 建筑装饰 | decoration | ~1.1MB |
| 飞檐1.jpg | 楼阁建筑 | pavilion | ~650KB |
| 飞檐2.png | 楼阁建筑 | pavilion | ~720KB |
| 飞檐大景.jpg | 楼阁建筑 | pavilion | ~1.4MB |
| 飞檐绿色.jpg | 楼阁建筑 | pavilion | ~950KB |
| 黄鹤楼.png | 楼阁建筑 | pavilion | ~2.1MB |

---

## 八、更新日志

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| v1.0.0 | 2024-01-15 | 初始版本发布 |
| - | - | 实现图片列表、分类、单张获取、元数据接口 |
| - | - | 支持分页、搜索、分类过滤 |
| - | - | 实现 ETag 缓存机制 |
| - | - | 添加性能优化和安全防护 |

---

## 九、联系方式与支持

如有问题或建议，请联系开发团队或查阅：
- 项目文档: `/docs/图片素材需求文档.md`
- API 规范: `/docs/backend/API-Spec.md`
- 技术文档: `/docs/backend/技术文档.md`

---

**文档版本**: v1.0.0
**最后更新**: 2024-01-15
**维护团队**: Backend Development Team
