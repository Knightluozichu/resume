import type { ReviewQuestion } from "./types";

export const jfsExpressKoaQuestions: ReviewQuestion[] = [
  {
    id: "jfs-express-koa-1",
    chapter: "jfs-express-koa",
    level: 2,
    question: `Express 的回调中间件和 Koa 的洋葱模型有什么本质区别？`,
    answer:
      `Express 中间件是回调式单向链：next() 把控制权交给下游，但下游执行完不会自动「回到」上游——上游在 next() 之后的代码除非用回调否则无法作为「响应后处理」执行，且异步错误必须 next(err) 手动传递。Koa 中间件是 async 函数，await next() 会暂停当前中间件、等下游全部执行完后再恢复，形成「洋葱」——请求穿透时执行前置逻辑、响应回溯时执行后续逻辑，天然支持用 try/catch 在最外层捕获整条链的错误。这让日志、计时、错误处理这类横切逻辑在 Koa 中写起来远比 Express 优雅。代价是 Koa 剥离了路由等内置功能，需自行组合。`,
    tags: ["Express", "Koa", "中间件", "洋葱模型"],
  },
  {
    id: "jfs-express-koa-2",
    chapter: "jfs-express-koa",
    level: 3,
    question: `Fastify 为什么比 Express 快？schema 驱动带来什么？`,
    answer:
      `Fastify 快的核心是「把运行期能做的事挪到编译/启动期」：它根据 schema 在启动时预编译 JSON 序列化和参数校验函数（用 fast-json-stringify 和 ajv），运行时直接调用编译产物，跳过逐字段反射。Express 的 res.json 每次都做运行时序列化，校验靠手写或中间件运行时执行。schema 驱动还带来：自动生成 OpenAPI 文档、请求/响应类型契约、更早暴露数据错误。代价是必须维护 schema（额外书写成本），且对动态结构不友好。性能敏感、接口契约清晰的服务（高 QPS API 网关）最适合 Fastify；快速原型和小项目 Express 更省事。`,
    tags: ["Fastify", "schema", "性能"],
  },
  {
    id: "jfs-express-koa-3",
    chapter: "jfs-express-koa",
    level: 3,
    question: `什么是中间件？它如何处理横切关注点？`,
    answer:
      `中间件是处理请求-响应周期的函数链，每个中间件可读取/修改 req/res（或 Koa 的 ctx），并决定是否交给下一个中间件。横切关注点是「所有路由都要做」的逻辑（日志、认证、计时、错误处理、CORS），通过中间件统一注入，避免每个 handler 重复写。例如认证中间件在路由前验证 JWT，日志中间件记录每个请求耗时，错误中间件统一捕获异常返回 500。中间件按注册顺序执行，Express 用 next() 传递，Koa 用 await next() 形成洋葱。设计原则：横切逻辑放中间件，业务逻辑放 handler，两者分离提升可维护性。`,
    tags: ["中间件", "横切关注点"],
  },
  {
    id: "jfs-express-koa-4",
    chapter: "jfs-express-koa",
    level: 4,
    question: `Express 和 Koa 的中间件能否混用？为什么？选型时要注意什么？`,
    answer:
      `不能混用。两者中间件签名和执行模型根本不同：Express 中间件收 (req, res, next)，Koa 收 (ctx, next) 且必须 async。Express 的 next() 是同步接力，异步错误要 next(err) 显式传递；Koa 的 await next() 天然支持 async/await，错误用 try/catch 捕获。把 Express 中间件直接搬进 Koa 会因 ctx/res 不兼容而崩；反之亦然。选型时一个项目只用一套生态：Express 生态最大、中间件最多、学习曲线低，适合快速上手；Koa 更现代、洋葱模型优雅、但需自行组合路由等；Fastify 性能最高、schema 驱动、适合高 QPS。混搭会导致维护混乱，应从一而终。`,
    tags: ["Express", "Koa", "选型", "兼容性"],
  },
];
