import type { ReviewQuestion } from "./types";

export const jfsGraphqlApiQuestions: ReviewQuestion[] = [
  {
    id: "jfs-graphql-api-1",
    chapter: "jfs-graphql-api",
    level: 2,
    question: `GraphQL 解决了 REST 的哪两个核心痛点？如何解决？`,
    answer:
      `两个痛点：①过度获取（over-fetching）——REST 端点返回固定字段，客户端只要用户名却连地址、头像一起返回，浪费带宽；②欠获取（under-fetching）——要用户的基本信息和最近文章，REST 要分别请求 /users/1 和 /users/1/posts 两个端点，多次往返。GraphQL 用单一端点 + 客户端声明式查询解决：客户端在 query 里精确写要哪些字段、嵌套几层，服务器只返回这些。一次请求拿到用户名+文章标题，不多不少。代价是服务器需实现逐字段 Resolver、处理 N+1、单端点缓存复杂。`,
    tags: ["GraphQL", "REST", "过度获取", "欠获取"],
  },
  {
    id: "jfs-graphql-api-2",
    chapter: "jfs-graphql-api",
    level: 3,
    question: `GraphQL 的 N+1 问题是怎么产生的？DataLoader 如何解决？`,
    answer:
      `产生：GraphQL 按「字段」而非「资源」解析。查 10 个用户各取 posts 字段时，User.posts 的 Resolver 对每个用户单独发一次 Post.find，共 10 次查询 + 1 次取用户 = 11 次。解决：DataLoader 把「同一事件循环 tick 内」对同一 loader 的多次 load(id) 调用收集起来，在 tick 结束时合并成一次批量查询（如 find({ _id: { $in: [所有 id] } })），结果按 id 映射回去并缓存。这样 10 个用户的 posts 查询从 10 次降为 1 次。原理是「批量 + 去重 + 缓存」，每个请求新建一个 loader 实例避免跨请求缓存污染。`,
    tags: ["GraphQL", "N+1", "DataLoader"],
  },
  {
    id: "jfs-graphql-api-3",
    chapter: "jfs-graphql-api",
    level: 3,
    question: `GraphQL 的 Schema 和 Resolver 是什么关系？解析过程如何进行？`,
    answer:
      `Schema 是 API 的类型契约，定义可查询的类型、字段及入口（Query/Mutation/Subscription）；Resolver 是每个字段对应的取数函数。解析过程：客户端发 query → 服务器先按 Schema 类型系统校验查询合法性（字段存不存在、类型对不对）→ 校验通过后从 Query 入口开始，按字段逐个调用 Resolver 取值 → 父字段返回值作为子 Resolver 的 parent 参数，形成解析树 → 所有叶子字段解析完，拼装成结果返回。Schema 定义「能查什么」，Resolver 决定「怎么取」。一个字段可以没有自定义 Resolver（默认从 parent 取同名字段），复杂字段才需手写 Resolver。`,
    tags: ["GraphQL", "Schema", "Resolver"],
  },
  {
    id: "jfs-graphql-api-4",
    chapter: "jfs-graphql-api",
    level: 4,
    question: `GraphQL 一定比 REST 快吗？什么场景该用 GraphQL，什么场景该用 REST？`,
    answer:
      `不一定。GraphQL 解决的是「过度/欠获取」和「多次往返」，不是绝对延迟。它的逐字段解析天生容易 N+1（不配 DataLoader 反而比 REST 慢），单端点让 HTTP 缓存（CDN/浏览器按 URL 缓存）失效，复杂查询的解析+校验有 CPU 成本，恶意深层嵌套查询可 DoS。选型：多端（Web/App/小程序）、字段需求多变、嵌套关联多、想一个端点搞定用 GraphQL；简单固定接口、强缓存需求（资源级 HTTP 缓存）、CRUD 为主、团队不熟用 REST。GraphQL 不是银弹，它的灵活性带来复杂度，REST 的简单和缓存语义在简单场景仍占优。两者可共存：核心用 GraphQL，文件上传/ webhook 用 REST。`,
    tags: ["GraphQL", "REST", "选型", "性能"],
  },
];
