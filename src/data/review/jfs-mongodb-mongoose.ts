import type { ReviewQuestion } from "./types";

export const jfsMongodbMongooseQuestions: ReviewQuestion[] = [
  {
    id: "jfs-mongodb-mongoose-1",
    chapter: "jfs-mongodb-mongoose",
    level: 2,
    question: "MongoDB 的嵌入和引用两种建模方式各自适合什么场景？",
    answer:
      "嵌入适合「数据自然成簇、读多写少、子文档随父文档生命周期一致」的场景，如文章+评论（评论只在文章上下文有意义）、订单+订单项。优点是一次读取拿到全部、原子写入、无 JOIN。缺点是子文档无限增长会撑爆 16MB 文档上限，且子文档多处共享时冗余。引用适合「数据独立、多处共享、需独立查询/更新」的场景，如用户被订单、评论、消息多处引用。优点是单一数据源无冗余、子集合可独立分页。缺点是查询需 populate/$lookup 多次往返。选型看访问模式：一起读的多用嵌入，分开操作的多用引用。",
    tags: ["MongoDB", "数据建模", "嵌入", "引用"],
  },
  {
    id: "jfs-mongodb-mongoose-2",
    chapter: "jfs-mongodb-mongoose",
    level: 3,
    question: "什么是 N+1 查询问题？Mongoose 中如何避免？",
    answer:
      "N+1 是指查 N 条主记录后，又对每条单独发一次查询取关联数据，共 N+1 次查询而非 1 次。Mongoose 中典型陷阱：循环 await Post.find().populate('author') 或在遍历中逐个 populate。避免方法：①批量 populate——Post.find().populate('author') 一次性把所有作者 id 收集再发一次查询，总共 2 次而非 N+1 次；②用 $lookup 聚合在数据库层 JOIN；③反范式嵌入避免关联；④用 lean() 减少每条 Document 实例化的开销。判断 N+1 的标志：列表页慢、数据库日志里同一条关联查询重复出现 N 次。",
    tags: ["N+1", "populate", "性能"],
  },
  {
    id: "jfs-mongodb-mongoose-3",
    chapter: "jfs-mongodb-mongoose",
    level: 3,
    question: "Mongoose 的 populate 等于 SQL 的 JOIN 吗？为什么？",
    answer:
      "不等。populate 根本不是数据库层面的 JOIN，而是「先查主文档，再拿 id 集合发第二个查询取关联文档，最后在内存拼接」。SQL 的 JOIN 在数据库引擎层一次查询完成；populate 是两次查询 + 内存拼接。后果：①性能——大数据集 populate 比真 JOIN 慢，且易 N+1；②一致性——两次查询之间数据可能变化；③能力——populate 只能做简单关联，复杂聚合还得用 $lookup。Mongoose 批量 populate（Post.find().populate('author')）会把 N+1 降为 2 次查询，但仍非数据库层 JOIN。需要真 JOIN 用聚合管道 $lookup。",
    tags: ["populate", "JOIN", "MongoDB"],
  },
  {
    id: "jfs-mongodb-mongoose-4",
    chapter: "jfs-mongodb-mongoose",
    level: 4,
    question: "Mongoose 的 Schema/Model/Document 三层抽象各自职责是什么？引入它有什么代价？",
    answer:
      "Schema 定义文档结构与校验规则（字段类型、required、unique、默认值）；Model 是编译 Schema 后的可操作集合类（提供 find/create/update 等方法，对应一个 MongoDB 集合）；Document 是 Model 的实例（单条文档，带 save/validate 等实例方法）。三层让无 schema 的 MongoDB 有了类型约束与校验，减少脏数据。代价：①性能开销——每条查询结果都要实例化为 Document 对象，比原生 driver 慢，大数据集用 lean() 跳过实例化；②学习成本——钩子、虚拟字段、中间件等概念多；③灵活性降低——Schema 变更需同步迁移。判断：需要校验和结构化操作用 Mongoose；极致性能或动态结构用原生 driver。",
    tags: ["Mongoose", "Schema", "Model", "Document"],
  },
];
