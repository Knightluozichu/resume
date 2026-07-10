import type { ReviewQuestion } from "./types";

/** 路由 复习题 */
export const gwpRoutingQuestions: ReviewQuestion[] = [
  {
    id: "gwp-routing-1",
    chapter: "gwp-routing",
    level: 1,
    question: `Go 1.22 增强版 ServeMux 如何注册带方法和参数的路由？如何获取路径参数？`,
    answer: `注册路由时在 pattern 中指定方法和参数：mux.HandleFunc(\"GET /users/{id}\", handler)。获取路径参数用 r.PathValue(\"id\")。方法约束确保只有 GET 请求匹配，非 GET 请求自动返回 405 Method Not Allowed。`,
    tags: ["ServeMux", "参数路由", "Go 1.22"],
  },
  {
    id: "gwp-routing-2",
    level: 2,
    chapter: "gwp-routing",
    question: `ServeMux 中 /users 和 /users/ （带尾部斜杠）的匹配行为有什么区别？可能导致什么问题？`,
    answer: `/users 精确匹配，只匹配路径恰好为 /users 的请求。/users/ 以斜杠结尾，匹配 /users/ 及其所有子路径（如 /users/42/profile）。如果只注册了 /users/ 但用户访问 /users（无斜杠），ServeMux 会自动 301 重定向到 /users/。这可能导致 POST 请求丢失请求体（重定向变 GET），或造成意外的重定向循环。应明确路由是否需要尾部斜杠并测试两种访问方式。`,
    tags: ["尾部斜杠", "匹配规则", "理解"],
  },
  {
    id: "gwp-routing-3",
    level: 3,
    chapter: "gwp-routing",
    question: `设计一个 RESTful API 路由方案，包含文章的 CRUD 和评论的嵌套资源。列出路由表并说明匹配优先级。`,
    answer: `路由表：GET /posts（列表）、POST /posts（创建）、GET /posts/{id}（详情）、PUT /posts/{id}（更新）、DELETE /posts/{id}（删除）、GET /posts/{id}/comments（文章评论列表）、POST /posts/{id}/comments（添加评论）、GET /comments/{id}（直接查评论）。匹配优先级：静态路径优先于参数路径——/posts/admin 优先于 /posts/{id}。Go 1.22 ServeMux 自动按特异度选择最佳匹配。嵌套路由 /posts/{id}/comments 表达\"属于文章的子资源\"，顶层路由 /comments/{id} 用于独立操作评论。`,
    tags: ["RESTful", "路由设计", "实践"],
  },
  {
    id: "gwp-routing-4",
    level: 4,
    chapter: "gwp-routing",
    question: `对比 Go 标准库 ServeMux 和第三方路由库（如 chi）的优劣，在什么场景下应该选择哪个？`,
    answer: `ServeMux 优势：标准库无依赖、Go 1.22+ 支持方法和参数路由、零额外学习成本、足够简单项目使用。劣势：不支持路由分组（/api/v1 前缀需重复写）、无内置中间件链管理、无正则约束（{id:[0-9]+}）。chi 优势：路由分组（r.Route）、中间件管理（r.Use）、正则约束、成熟生态、兼容 net/http 接口。劣势：引入第三方依赖、需学习 API。选型：简单项目/微服务用 ServeMux（标准库够用）；中大型项目/RESTful API/需分组和中间件管理用 chi。两者都基于 http.Handler 接口，迁移成本低。原则：标准库能解决就不引入第三方，但不要为了\"无依赖\"而忍受重复代码。`,
    tags: ["ServeMux", "chi", "技术选型", "综合"],
  },
];
