import type { ReviewQuestion } from "./types";

/** HTTP 基础 复习题 */
export const gwpHttpBasicsQuestions: ReviewQuestion[] = [
  {
    id: "gwp-http-basics-1",
    chapter: "gwp-http-basics",
    level: 1,
    question: "HTTP 请求由哪三部分组成？Go 中如何访问它们？",
    answer: "HTTP 请求三部分：请求行（方法+路径+版本）、请求头（键值对）、请求体（可选数据）。Go 中通过 http.Request 访问：r.Method 获取方法、r.URL.Path 获取路径、r.Header 获取请求头（r.Header.Get(\"Content-Type\")）、r.Body 获取请求体（io.ReadCloser）。",
    tags: ["HTTP", "请求结构", "http.Request"],
  },
  {
    id: "gwp-http-basics-2",
    level: 2,
    chapter: "gwp-http-basics",
    question: "在 Go HTTP Handler 中，为什么 w.Header().Set() 必须在 w.WriteHeader() 和 w.Write() 之前调用？",
    answer: "HTTP 响应格式是状态行→响应头→空行→响应体。Go 的 ResponseWriter 在第一次调用 WriteHeader 或 Write 时会将响应头发送给客户端。一旦头已发送，之后的 Header().Set() 不会有任何效果。同样 WriteHeader 只能调用一次。正确顺序：先设置所有 Header，再 WriteHeader（非 200 时），最后 Write 写响应体。",
    tags: ["ResponseWriter", "顺序约束", "理解"],
  },
  {
    id: "gwp-http-basics-3",
    level: 3,
    chapter: "gwp-http-basics",
    question: "写一个 Go HTTP Handler，处理 POST /api/users 请求，解析 JSON 请求体为 User struct，验证 name 非空，返回 201 Created 和 JSON 响应。",
    answer: "func createUser(w http.ResponseWriter, r *http.Request) {\n  if r.Method != http.MethodPost {\n    w.WriteHeader(405); return\n  }\n  var u User\n  if err := json.NewDecoder(r.Body).Decode(&u); err != nil {\n    w.WriteHeader(400); w.Write([]byte(\"Invalid JSON\")); return\n  }\n  if u.Name == \"\" {\n    w.WriteHeader(422); w.Write([]byte(\"Name required\")); return\n  }\n  u.ID = 100\n  w.Header().Set(\"Content-Type\", \"application/json\")\n  w.WriteHeader(201)\n  json.NewEncoder(w).Encode(u)\n}。关键点：检查方法、解码 JSON、验证字段、正确设置 Content-Type 和状态码顺序。",
    tags: ["Handler", "JSON", "实践"],
  },
  {
    id: "gwp-http-basics-4",
    level: 4,
    chapter: "gwp-http-basics",
    question: "http.Handler 接口和 http.HandlerFunc 类型的关系是什么？这个设计为什么是 Go 的\"适配器模式\"经典案例？",
    answer: "http.Handler 是接口，定义 ServeHTTP(w ResponseWriter, r *Request) 方法。http.HandlerFunc 是类型，定义为 type HandlerFunc func(ResponseWriter, *Request)，它为自身添加了 ServeHTTP 方法——使得任何签名为 func(w, r) 的普通函数自动满足 http.Handler 接口。这是适配器模式：接口定义契约，HandlerFunc 把函数适配为接口实现。好处：开发者写普通函数就是写 Handler，无需定义结构体和方法。http.HandleFunc 进一步简化——直接注册函数到路由，内部用 HandlerFunc 包装。这让 Go Web 开发极其简洁，同时保持了接口的灵活性——你也可以用结构体实现 Handler 接口保存状态。",
    tags: ["Handler", "适配器模式", "接口设计", "综合"],
  },
];
