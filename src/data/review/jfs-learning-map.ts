import type { ReviewQuestion } from "./types";

export const jfsLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "jfs-learning-map-1",
    chapter: "jfs-learning-map",
    level: 2,
    question: `全书五阶段全栈进阶结构是什么？为什么是这个顺序？`,
    answer:
      `前端基础（React/状态管理）→ 后端服务（Node.js/Web 框架）→ 数据层（MongoDB/GraphQL）→ 工程化（认证安全/测试部署）→ 总复习。顺序由数据流决定：用户先看到前端，前端发请求到后端，后端读写数据层，工程化保障整条链路可信可上线。先有「能看」，再有「能处理」，然后「能存取」，接着「能保障」，最后「能复盘」。跳过前端直接学后端会脱离用户视角；跳过后端直接学数据库会脱离请求上下文。`,
    tags: ["架构", "学习路径"],
  },
  {
    id: "jfs-learning-map-2",
    chapter: "jfs-learning-map",
    level: 2,
    question: `为什么 JavaScript 能用同一种语言同时写前端和后端？`,
    answer:
      `JavaScript 的宿主环境决定能力边界：浏览器提供 DOM API 让 JS 操作页面，Node.js 提供 fs/http 模块让 JS 操作文件系统和网络。两者共享同一套语言核心（ECMAScript 规范——类型、函数、Promise、模块），但运行时 API 不同。这种「同语言、不同运行时」的设计让开发者只学一套语法就能在前后端复用逻辑（如表单校验、数据转换），降低全栈心智成本。代价是前后端的并发模型、模块系统、API 仍有差异，需理解运行时区别。`,
    tags: ["全栈", "运行时"],
  },
  {
    id: "jfs-learning-map-3",
    chapter: "jfs-learning-map",
    level: 3,
    question: `用「一次用户提交表单到数据落盘」的全栈请求旅程描述全书主线。`,
    answer:
      `①前端——React 组件捕获表单提交事件，useState 管本地状态、Zustand/Redux 管全局状态驱动 UI（第 2-3 章）；②网络——fetch 发 POST 请求到 Node.js 服务器，header 带 JWT 认证，async/await 不阻塞主线程（第 4-5、8 章）；③后端——Node.js 事件循环接收请求，Express/Koa 中间件链验签后进路由（第 4-5 章）；④数据层——Mongoose 校验写入 MongoDB，GraphQL Resolver 编排数据 + DataLoader 防 N+1（第 6-7 章）；⑤工程化——整条链路被 Jest 测试覆盖、Docker 多阶段构建打包、CI/CD 自动部署（第 9 章）。4 层代码，全链路参与。`,
    tags: ["架构", "请求旅程"],
  },
  {
    id: "jfs-learning-map-4",
    chapter: "jfs-learning-map",
    level: 4,
    question: `会写前端和真正懂全栈有什么本质区别？`,
    answer:
      `会写前端只是用户可见层的冰山一角——组件、样式照文档抄就能做出页面。真正的全栈难点在端到端：状态如何在前后端同步、请求如何鉴权、数据库如何建模、并发如何处理、部署如何自动化。这些是「前后端协作时」才显现的工程问题，也是全栈面试与生产实战的真正考点。把前端当终点的人，应用能看但不能用；把全栈当核心的人，才能做出可控、可扩展、可上线的完整产品。区分标志：遇到性能问题，能否从浏览器到数据库逐层定位而非只会说「前端慢」或「后端慢」。`,
    tags: ["架构", "工程思维", "全栈"],
  },
];
