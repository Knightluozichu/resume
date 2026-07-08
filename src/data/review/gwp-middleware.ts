import type { ReviewQuestion } from "./types";

/** 中间件 复习题 */
export const gwpMiddlewareQuestions: ReviewQuestion[] = [
  {
    id: "gwp-middleware-1",
    chapter: "gwp-middleware",
    level: 1,
    question: "Go 中间件的函数签名是什么？洋葱模型的执行顺序是怎样的？",
    answer: "签名：func(http.Handler) http.Handler——接收下一个 Handler，返回包装后的 Handler。洋葱模型执行顺序：请求从外向内穿过各层中间件（前置处理），到达核心 Handler 后，响应从内向外返回（后置处理）。组合 h := Logging(Auth(RateLimit(final))) 中，Logging 最先执行前置、最后执行后置。",
    tags: ["中间件签名", "洋葱模型", "基础"],
  },
  {
    id: "gwp-middleware-2",
    level: 2,
    chapter: "gwp-middleware",
    question: "为什么 Recovery 中间件应该放在中间件链的最外层？如果放在内层会怎样？",
    answer: "Recovery 用 defer recover() 捕获后续所有代码的 panic。放在最外层时，它包裹了所有中间件和 Handler，任何层的 panic 都能被捕获。如果放在内层（如 Logging 外面没有 Recovery），Logging 自身的 panic 无法被 Recovery 捕获——因为 Recovery 的 defer 作用域只覆盖内层，不覆盖外层。Logging 的 panic 会导致进程崩溃。因此 Recovery 必须在最外层确保覆盖所有代码路径。",
    tags: ["Recovery", "中间件顺序", "理解"],
  },
  {
    id: "gwp-middleware-3",
    level: 3,
    chapter: "gwp-middleware",
    question: "写一个限流中间件，使用带缓冲 channel 作为令牌桶，每秒最多允许 N 个请求，超限返回 429。",
    answer: "func RateLimit(maxPerSec int) Middleware {\n  tokens := make(chan struct{}, maxPerSec)\n  go func() {\n    ticker := time.NewTicker(time.Second / time.Duration(maxPerSec))\n    for range ticker.C {\n      select {\n      case tokens <- struct{}{}:\n      default:\n      }\n    }\n  }()\n  return func(next http.Handler) http.Handler {\n    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n      select {\n      case <-tokens:\n        next.ServeHTTP(w, r)\n      default:\n        http.Error(w, \"Too Many Requests\", 429)\n      }\n    })\n  }\n}。关键点：带缓冲 channel 容量等于每秒上限、goroutine 定时填充令牌、非阻塞 select 判断。这是简化版令牌桶，生产版还需考虑突发流量和滑动窗口。",
    tags: ["限流", "令牌桶", "实践"],
  },
  {
    id: "gwp-middleware-4",
    level: 4,
    chapter: "gwp-middleware",
    question: "中间件如何通过 context 向后续 Handler 传递数据？为什么不能用字符串作为 context key？正确做法是什么？",
    answer: "中间件用 r.WithContext(context.WithValue(r.Context(), key, value)) 将数据注入请求上下文，Handler 用 r.Context().Value(key) 取出。不能用字符串做 key 因为容易冲突——其他包也可能用 \"user\" 字符串，导致数据覆盖或意外读取。正确做法是定义自定义类型：type contextKey string; const userKey contextKey = \"user\"，利用 Go 类型系统保证唯一性——不同类型不会冲突。context 适合传请求作用域的元数据（认证信息、trace ID），不要传业务参数（业务参数应通过函数参数传递）。取值时应用类型断言并处理 nil 情况。",
    tags: ["context", "中间件", "类型安全", "综合"],
  },
];
