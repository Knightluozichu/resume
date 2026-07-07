import type { ReviewQuestion } from "./types";

/** 建造者模式章复习题 */
export const dpBuilderQuestions: ReviewQuestion[] = [
  {
    id: "dp-builder-01",
    chapter: "dp-builder",
    level: 1,
    question: "建造者模式的意图是什么？",
    answer:
      "将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。\n\n核心：把复杂对象的构造拆成一步步的（step by step），由 Director 指挥构建顺序，Builder 负责每一步的具体实现，最终产出完整对象。适合构造参数很多、或构造过程有多步的对象。",
    tags: ["意图", "基础概念"],
  },
  {
    id: "dp-builder-02",
    chapter: "dp-builder",
    level: 2,
    question: "建造者模式和工厂模式有什么区别？",
    answer:
      "工厂模式：一次调用就产出完整对象（单步创建），关注「造哪个」，通常参数较少，创建逻辑简单。\n\n建造者模式：分多步逐步构建复杂对象（分步构建），关注「怎么造」，适合参数多、配置项多、或构造过程有顺序依赖的对象。\n\n对比：\n① 工厂像「点菜」——一句话出一道菜；建造者像「装配」——一步步装出一台车。\n② 工厂返回立即可用的对象；建造者中间过程可暂停、可复用、可产出不同表示。\n③ 工厂隐藏创建细节；建造者把创建过程显式化、可编排。\n\n例如 `new Car(type)` 用工厂；而「选引擎→选轮胎→选内饰→选颜色」组装一辆定制车用建造者。",
    tags: ["对比", "工厂模式", "分步构建"],
  },
  {
    id: "dp-builder-03",
    chapter: "dp-builder",
    level: 3,
    question: "设计一个 SQL 查询构建器，支持 SELECT / FROM / WHERE / ORDER BY，用建造者模式实现。",
    answer:
      "用 Fluent Builder（链式调用）逐步拼装 SQL：\n\n```\nclass SQLQueryBuilder {\n  private select = '*';\n  private from = '';\n  private where = '';\n  private orderBy = '';\n\n  select(fields: string): this {\n    this.select = fields;\n    return this;\n  }\n  from(table: string): this {\n    this.from = table;\n    return this;\n  }\n  where(condition: string): this {\n    this.where = `WHERE ${condition}`;\n    return this;\n  }\n  orderBy(field: string, dir: 'ASC' | 'DESC' = 'ASC'): this {\n    this.orderBy = `ORDER BY ${field} ${dir}`;\n    return this;\n  }\n  build(): string {\n    return `SELECT ${this.select} FROM ${this.from} ${this.where} ${this.orderBy}`.trim();\n  }\n}\n\n// 客户端\nconst sql = new SQLQueryBuilder()\n  .select('id, name')\n  .from('users')\n  .where('age > 18')\n  .orderBy('name', 'ASC')\n  .build();\n// => SELECT id, name FROM users WHERE age > 18 ORDER BY name ASC\n```\n\n要点：每步返回 `this` 实现链式；`build()` 收尾产出最终字符串。若要支持多种 SQL 方言（MySQL/Postgres），可抽象出 `SQLBuilder` 接口 + 各方言实现，再由 Director 编排步骤。",
    tags: ["应用", "SQL 构建器", "代码设计", "链式调用"],
  },
  {
    id: "dp-builder-04",
    chapter: "dp-builder",
    level: 4,
    question: "链式调用（Fluent Builder）如何实现？它有什么优缺点？",
    answer:
      "实现：每个配置方法完成设置后 `return this;`（返回当前 builder 实例），从而可以继续调用下一个方法，形成 `a().b().c()` 的链。\n\n优点：\n① 可读性强——接近自然语言，调用顺序即配置过程；\n② 可选参数友好——不需要的步骤直接跳过，避免构造函数一长串 null/undefined；\n③ 复用方便——同一个 builder 可构建多个对象，或用不可变 builder 派生新配置；\n④ 与不可变对象配合好——`build()` 才真正生成对象，中间 builder 可变不影响产物。\n\n缺点：\n① 调用顺序无法在类型层面强制（如必须先 `from()` 再 `where()` 才合理，但类型系统不拦），容易构造出非法中间态，需运行时校验；\n② 链中某步忘了 `return this` 会导致整条链断裂，调试麻烦；\n③ 对 IDE 跳转/静态分析不总是友好；\n④ 增加了类和方法数量，简单对象用链式属于过度设计。\n\n进阶：用「阶段性 Builder」（Phased Builder）通过泛型在类型层约束调用顺序，如 `Builder<HasFrom>` 才能调 `where()`，可缓解顺序问题。",
    tags: ["链式调用", "Fluent Builder", "优缺点"],
  },
];
