import type { ReviewQuestion } from "./types";

export const jfsFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "jfs-final-review-1",
    chapter: "jfs-final-review",
    level: 3,
    question: `用全栈请求生命周期描述一次「用户下单」的完整旅程，标注每章知识点。`,
    answer:
      `①前端：用户点击购买，React 事件触发（第 2 章），useState 更新 loading 状态驱动 UI 重渲染，购物车全局状态用 Zustand/Redux 管理（第 3 章）；②网络：fetch 发 POST 到后端，header 带 JWT Bearer token（第 8 章），async/await 不阻塞主线程；③后端：Node.js 事件循环接收请求（第 4 章），Express/Koa 中间件链先验签 JWT（第 8 章）再进路由（第 5 章）；④数据层：Mongoose 校验并写入 MongoDB（第 6 章），如用 GraphQL 则 Resolver 编排数据 + DataLoader 防 N+1（第 7 章）；⑤响应：后端 JSON 返回，前端 setState 更新 UI；⑥工程化：整条链路被 Jest 单元+集成测试覆盖，Docker 多阶段构建打包，CI/CD 自动部署（第 9 章）。一环断则全链断。`,
    tags: ["全栈", "请求生命周期", "综合"],
  },
  {
    id: "jfs-final-review-2",
    chapter: "jfs-final-review",
    level: 4,
    question: `列表页加载缓慢，作为全栈工程师你会如何逐层排查？`,
    answer:
      `分层定位而非盲猜：①前端——React DevTools Profiler 看是否有无谓重渲染、useEffect 是否死循环、列表是否缺 key 导致全量重渲染（第 2-3 章）；②网络——DevTools Network 看请求耗时、是否 N+1（一个列表页发了几十个请求）、payload 是否过度获取（第 7 章 GraphQL/REST）；③后端——Node 日志看接口响应时间、事件循环是否被 CPU 密集任务阻塞、中间件是否有同步重逻辑（第 4-5 章）；④数据库——MongoDB explain 看查询是否走索引、是否缺索引导致全表扫描、populate 是否 N+1（第 6 章）；⑤部署——服务器 CPU/内存是否打满、Docker 容器是否资源受限（第 9 章）。先量化（哪个环节慢）再优化，避免「感觉前端慢」式盲改。`,
    tags: ["性能排查", "全栈", "综合"],
  },
  {
    id: "jfs-final-review-3",
    chapter: "jfs-final-review",
    level: 4,
    question: `全栈架构选型：状态管理、Web 框架、数据建模、API 风格、认证各有哪些取舍？`,
    answer:
      `状态管理：本地够用就不上全局；高频细粒度用 selector 库（Zustand/Redux），低频配置用 Context。Web 框架：快速原型 Express；优雅中间件 Koa；高性能 schema 驱动 Fastify。数据建模：一起读用嵌入（原子写入、无 JOIN）；独立共享用引用（无冗余、可独立分页）。API 风格：简单固定缓存优先 REST（资源级 HTTP 缓存）；多端按需 GraphQL（按需取数、单端点）。认证：有状态易吊销用 Session；无状态易扩展用 JWT。每个选型都解决特定问题但有代价，全栈工程师需根据应用规模、团队能力、性能需求权衡，而非追新。`,
    tags: ["架构选型", "综合", "取舍"],
  },
  {
    id: "jfs-final-review-4",
    chapter: "jfs-final-review",
    level: 4,
    question: `「全栈工程师」和「全栈搬运工」的区别是什么？如何判断自己是前者？`,
    answer:
      `全栈搬运工会拼凑各层代码——前端抄组件、后端抄模板、数据库抄 Schema，能跑但不懂链路。全栈工程师理解整条链路的取舍：知道前端状态方案如何影响后端 API 设计、数据建模如何决定前端请求次数、认证方案如何影响水平扩展、测试分层如何影响迭代速度。判断标志：①遇到性能问题，能从浏览器到数据库逐层定位而非只会说「前端慢」或「后端慢」；②做技术选型时能说出「为什么选这个、代价是什么、什么场景该换」；③能独立设计一个功能从前端到数据库的完整方案，而非只会实现被分配的那一层。全栈的核心是「链路判断力」而非「会写更多层的代码」。`,
    tags: ["全栈", "工程思维", "综合"],
  },
];
