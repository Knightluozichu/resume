import type { ReviewQuestion } from "./types";

/** 原型模式章复习题 */
export const dpPrototypeQuestions: ReviewQuestion[] = [
  {
    id: "dp-prototype-01",
    chapter: "dp-prototype",
    level: 1,
    question: `原型模式的意图是什么？`,
    answer:
      `用原型实例指定创建对象的种类，并通过拷贝（克隆）这些原型来创建新对象。\n\n核心：不通过 \`new\` + 构造函数从零创建，而是复制一个已有对象得到新对象。关键操作是 \`clone()\`，由对象自己负责复制自己的状态。`,
    tags: ["意图", "克隆", "基础概念"],
  },
  {
    id: "dp-prototype-02",
    chapter: "dp-prototype",
    level: 2,
    question: `深拷贝和浅拷贝有什么区别？原型模式通常需要哪种？`,
    answer:
      `浅拷贝（Shallow Copy）：只复制对象本身的基本类型字段，引用类型字段只复制引用——副本和原对象共享被引用的对象，修改一方会影响另一方。\n\n深拷贝（Deep Copy）：递归复制所有引用类型字段，副本与原对象完全独立，互不影响。\n\n原型模式通常需要深拷贝，因为克隆出的对象应该是一个独立副本，修改它不应波及原型。但深拷贝成本高（递归、可能涉及循环引用），所以实践中要权衡：\n① 若对象只含基本类型或不可变对象，浅拷贝够用；\n② 含可变引用类型时需深拷贝，可用序列化/反序列化、手写递归克隆、或结构化克隆 API（\`structuredClone\`）。\n\n注意：浅拷贝若共享了可变内部状态，会埋下隐蔽 bug。`,
    tags: ["深拷贝", "浅拷贝", "克隆"],
  },
  {
    id: "dp-prototype-03",
    chapter: "dp-prototype",
    level: 3,
    question: `游戏里需要批量生成怪物：已有一个配置好的怪物对象，如何用原型模式快速复制出多个？`,
    answer:
      `让怪物实现 \`clone()\`，复制时直接克隆原型：\n\n\`\`\`\ninterface Monster {\n  clone(): Monster;\n  attack(): void;\n}\n\nclass Goblin implements Monster {\n  constructor(\n    public hp: number,\n    public attack: number,\n    public position: { x: number; y: number },\n    public loot: string[]\n  ) {}\n\n  // 深拷贝：position 和 loot 都要复制\n  clone(): Monster {\n    return new Goblin(\n      this.hp,\n      this.attack,\n      { ...this.position },\n      [...this.loot]\n    );\n  }\n\n  attack() { /* 攻击逻辑 */ }\n}\n\n// 原型：一个配置好的精英哥布林\nconst prototypeGoblin = new Goblin(100, 15, { x: 0, y: 0 }, ['gold', 'potion']);\n\n// 批量克隆，每个副本独立\nconst army: Monster[] = [];\nfor (let i = 0; i < 10; i++) {\n  const g = prototypeGoblin.clone() as Goblin;\n  g.position = { x: i * 10, y: 0 }; // 各自摆位\n  army.push(g);\n}\n// 修改某个副本的 loot 不会影响原型\n\`\`\`\n\n要点：\`clone()\` 内部对引用类型字段做深拷贝，保证副本独立；批量生成时只需改副本的少量字段（如位置），避免重复执行昂贵的构造初始化。`,
    tags: ["应用", "游戏开发", "代码设计", "深拷贝"],
  },
  {
    id: "dp-prototype-04",
    chapter: "dp-prototype",
    level: 4,
    question: `原型模式在什么场景下比 new 更优？它有什么风险？`,
    answer:
      `比 new 更优的场景：\n① 创建成本高——构造过程涉及复杂计算、IO、网络请求等，克隆现有对象远比重新构造快；\n② 批量生成相似对象——只需克隆原型再微调几个字段，比逐个 new + 配置简洁；\n③ 运行时动态决定类型——不知道具体类，只有一个原型实例，靠 \`clone()\` 繁衍；\n④ 保留中间状态作模板——如配置好一套默认值的对象作为原型，克隆后微调。\n\n风险与注意点：\n① 深拷贝实现复杂——含嵌套引用、循环引用时，克隆逻辑易出错，需小心实现或用 \`structuredClone\`；\n② 克隆破坏不变性——若原型持有对外暴露的可变引用，浅拷贝会泄漏内部状态；\n③ 与 final/不可变设计冲突——有些语言字段是 final 的，克隆需要绕过构造函数赋值；\n④ 隐藏类信息——客户端只看到 \`clone()\`，不知道产物确切类型，调试和理解成本上升；\n⑤ 不会调用构造函数——构造函数里的初始化/校验/计数逻辑不会触发，可能埋下隐患。\n\n结论：原型模式适合「创建贵 + 结构相对固定 + 需要独立副本」的场景；对象结构复杂、含循环引用时要慎重设计克隆方法。`,
    tags: ["优缺点", "风险", "权衡", "使用场景"],
  },
];
