import type { ReviewQuestion } from "./types";

/** 总复习 复习题 */
export const gwpFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "gwp-final-review-1",
    chapter: "gwp-final-review",
    level: 1,
    question: "Go Web 编程全书四大板块是什么？它们如何对应一个 HTTP 请求的生命周期？",
    answer: "四大板块：Web 基础（HTTP 与标准库）→ 路由与中间件 → 数据层（数据库/模板/JSON）→ 生产部署（认证/部署/运维）。对应请求生命周期：请求到达服务器解析为 http.Request（Web 基础）→ ServeMux 按 Method+Path 匹配 Handler，中间件链做日志/认证/限流（路由与中间件）→ Handler 从数据库查数据，用模板或 JSON 编码响应（数据层）→ 整个应用需认证、部署、监控和优雅关闭保障生产运行（生产部署）。",
    tags: ["全书结构", "请求生命周期"],
  },
  {
    id: "gwp-final-review-2",
    level: 2,
    chapter: "gwp-final-review",
    question: "解释 http.Handler 接口在 Go Web 开发中的核心地位——为什么说它是所有组件的\"统一契约\"？",
    answer: "http.Handler 接口定义了 ServeHTTP(w ResponseWriter, r *Request) 方法。Go Web 的所有核心组件都实现这个接口：路由器（ServeMux）实现它来分发请求、中间件返回的包装 Handler 实现它、业务 Handler 实现它。因为有统一契约，组件可以任意组合——中间件 func(http.Handler) http.Handler 包装任何 Handler、路由器可以把另一个路由器作为子 Handler（嵌套路由）、第三方库只要满足接口就能接入。这种\"接口契约 + 组合\"设计让 Go Web 生态高度解耦、可替换。http.HandlerFunc 适配器进一步让普通函数也能满足接口，降低了使用门槛。",
    tags: ["http.Handler", "接口契约", "组合", "理解"],
  },
  {
    id: "gwp-final-review-3",
    level: 3,
    chapter: "gwp-final-review",
    question: "一个 GET /api/users/42 请求到达 Go Web 应用，请按顺序描述它经过的每个组件及各组件的职责。",
    answer: "1) TCP/HTTP层：net/http Server 接收 TCP 连接，解析 HTTP 请求行/头/体，构造 http.Request 和 ResponseWriter。2) 路由匹配：ServeMux 按 GET /api/users/42 匹配模式 GET /api/users/{id}，提取 id=42 到 r.PathValue。3) 中间件链（外→内）：Recovery 注册 defer recover → Logging 记录开始时间 → Auth 从 Authorization 头提取 JWT 验签，注入 userID 到 context → RateLimit 检查令牌桶放行。4) Handler：从 context 取认证信息，从 PathValue 取 id=42，调 db.QueryRow 查数据库，Scan 到 User struct。5) 响应构建：设 Content-Type: application/json，json.NewEncoder(w).Encode(user) 写 JSON 响应。6) 中间件链（内→外）：RateLimit 释放令牌 → Logging 记录耗时和状态码 → Recovery defer 执行（无 panic 无操作）。7) HTTP 响应通过 TCP 返回客户端。",
    tags: ["请求生命周期", "综合", "实践"],
  },
  {
    id: "gwp-final-review-4",
    level: 4,
    chapter: "gwp-final-review",
    question: "为创业公司设计一个 Go Web 后端架构，包含用户认证、文章 CRUD、API 服务。请从路由、中间件、数据层、认证、部署五个维度说明技术选型和理由。",
    answer: "路由：Go 1.22+ ServeMux（标准库原生支持方法和参数路由，无第三方依赖；如需分组/正则再迁移 chi）。中间件：自实现 Recovery（defer recover 捕获 panic）+ Logging（slog 结构化日志）+ Auth（JWT 验签）+ CORS。签名简单可控。数据层：PostgreSQL（功能强：JSON列/全文搜索/事务）+ database/sql（标准库连接池）+ sqlc（类型安全代码生成，避免手写 Scan）。认证：JWT（golang-jwt/jwt，无状态适合 API）+ bcrypt（密码哈希）。前端用 HttpOnly Cookie 存令牌防 XSS + SameSite 防 CSRF。部署：Docker 多阶段构建（scratch 镜像 ~15MB）+ Nginx 反向代理（TLS 终止+负载均衡）+ K8s 或 Docker Compose。运维：/health 健康检查 + /metrics Prometheus 指标 + slog JSON 日志 + 优雅关闭（SIGTERM → Shutdown → 30s 超时）。配置：环境变量（12-Factor App）。选型原则：标准库优先 → 成熟第三方 → 自实现，避免过度工程化，初期简单可控比完美架构更重要。",
    tags: ["综合设计", "架构", "技术选型"],
  },
];
