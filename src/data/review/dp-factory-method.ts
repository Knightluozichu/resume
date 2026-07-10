import type { ReviewQuestion } from "./types";

/** 工厂方法模式章复习题 */
export const dpFactoryMethodQuestions: ReviewQuestion[] = [
  {
    id: "dp-factory-method-01",
    chapter: "dp-factory-method",
    level: 1,
    question: `工厂方法模式的意图是什么？`,
    answer:
      `定义一个用于创建对象的接口，但由子类决定要实例化哪个类。工厂方法使一个类的实例化延迟到其子类。\n\n核心：把「使用对象」和「创建对象」分离，客户端依赖抽象的工厂接口和产品接口，不关心具体产品是怎么 new 出来的。`,
    tags: ["意图", "基础概念"],
  },
  {
    id: "dp-factory-method-02",
    chapter: "dp-factory-method",
    level: 2,
    question: `简单工厂和工厂方法有什么区别？为什么说简单工厂违反开闭原则（OCP）？`,
    answer:
      `简单工厂：一个工厂类里用 if-else / switch 根据参数返回不同产品。优点是简单；缺点是每加一种新产品都要改工厂类的 \`create()\` 方法，违反 OCP（对扩展开放、对修改关闭）。\n\n工厂方法：把工厂本身抽象化，每种产品对应一个工厂子类，由子类实现 \`createProduct()\`。加新产品时只需新增「产品类 + 工厂子类」，不改已有代码，符合 OCP。\n\n简单工厂 = 一个工厂 + 条件分支；工厂方法 = 多个工厂子类 + 多态。代价是工厂方法会让类的数量成对增加。`,
    tags: ["简单工厂", "OCP", "对比"],
  },
  {
    id: "dp-factory-method-03",
    chapter: "dp-factory-method",
    level: 3,
    question: `设计一个日志系统：支持文件日志、数据库日志、控制台日志，用工厂方法模式实现。`,
    answer:
      `抽象产品 + 具体产品，抽象工厂 + 具体工厂：\n\n\`\`\`\n// 抽象产品\ninterface Logger { log(msg: string): void; }\n// 具体产品\nclass FileLogger implements Logger {\n  log(msg: string) { /* 写文件 */ }\n}\nclass DbLogger implements Logger {\n  log(msg: string) { /* 写数据库 */ }\n}\nclass ConsoleLogger implements Logger {\n  log(msg: string) { console.log(msg); }\n}\n// 抽象工厂\nabstract class LoggerFactory {\n  abstract createLogger(): Logger;\n  log(msg: string) { this.createLogger().log(msg); }\n}\n// 具体工厂\nclass FileLoggerFactory extends LoggerFactory {\n  createLogger() { return new FileLogger(); }\n}\nclass DbLoggerFactory extends LoggerFactory {\n  createLogger() { return new DbLogger(); }\n}\nclass ConsoleLoggerFactory extends LoggerFactory {\n  createLogger() { return new ConsoleLogger(); }\n}\n// 客户端\nconst factory: LoggerFactory = new FileLoggerFactory();\nfactory.log('hello');\n\`\`\`\n\n新增「网络日志」时，只需加 \`NetworkLogger\` 和 \`NetworkLoggerFactory\`，不改任何已有类，符合 OCP。`,
    tags: ["应用", "日志系统", "代码设计"],
  },
  {
    id: "dp-factory-method-04",
    chapter: "dp-factory-method",
    level: 4,
    question: `工厂方法模式有什么缺点？`,
    answer:
      `① 类的数量爆炸：每加一种产品就要加一个产品类 + 一个工厂子类，系统类数量成对增长，增加复杂度；\n② 增加抽象层：客户端需要选择具体工厂，理解成本上升；\n③ 不适合产品种类频繁变化的场景：如果产品族维度多，工厂方法会退化成一堆平行类，不如抽象工厂或简单工厂实用；\n④ 对单语言冗余：在支持高阶函数的语言（如 JS/TS）里，工厂方法往往可以用「传工厂函数」替代一整套类层级，过度套用 GoF 写法属于过度设计。\n\n权衡建议：产品种类少且稳定时，简单工厂更轻；产品种类多且各自创建逻辑复杂、需要子类化扩展时，才用工厂方法。`,
    tags: ["缺点", "权衡", "过度设计"],
  },
];
