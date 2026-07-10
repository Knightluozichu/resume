import type { ReviewQuestion } from "./types";

/** SOLID 原则复习题 */
export const addSolidPrinciplesQuestions: ReviewQuestion[] = [
  {
    id: "add-solid-principles-01",
    chapter: "add-solid-principles",
    level: 1,
    question: `SOLID 五原则分别是什么？用一句话概括每个原则的意图。`,
    answer:
      `SOLID 是五个面向对象设计原则的首字母缩写，由 Robert C. Martin（Uncle Bob）提出：\n\n1. S — 单一职责原则（Single Responsibility Principle, SRP）：\n一个类应该只有一个引起它变化的原因。即一个类只做一件事，职责单一。\n\n2. O — 开闭原则（Open-Closed Principle, OCP）：\n软件实体应该对扩展开放、对修改关闭。新增功能时加新代码，不改老代码。\n\n3. L — 里氏替换原则（Liskov Substitution Principle, LSP）：\n子类型必须能替换其基类型而不破坏程序正确性。所有用到父类的地方，换成子类应该照样工作。\n\n4. I — 接口隔离原则（Interface Segregation Principle, ISP）：\n客户端不应被迫依赖它不使用的方法。接口要小而专，不要造胖接口。\n\n5. D — 依赖倒置原则（Dependency Inversion Principle, DIP）：\n高层模块不应依赖低层模块，二者都应依赖抽象。抽象不依赖细节，细节依赖抽象。\n\n记忆口诀：单一职责管「一个类干几件事」，开闭原则管「扩展还是修改」，里氏替换管「子类能不能替父类」，接口隔离管「接口胖不胖」，依赖倒置管「谁依赖谁」。`,
    tags: ["SOLID", "SRP", "OCP", "LSP", "ISP", "DIP", "定义"],
  },
  {
    id: "add-solid-principles-02",
    chapter: "add-solid-principles",
    level: 2,
    question: `用代码示例说明开闭原则（OCP）。违反 OCP 的代码长什么样？重构后长什么样？`,
    answer:
      `场景：一个订单折扣计算器，支持不同类型的折扣规则。\n\n违反 OCP 的代码（每加一种折扣就改这个方法）：\n\`\`\`typescript\nfunction calculateDiscount(order: Order, type: string): number {\n  if (type === 'vip') {\n    return order.total * 0.8;          // VIP 打 8 折\n  } else if (type === 'regular') {\n    return order.total * 0.95;         // 普通客户打 95 折\n  } else if (type === 'employee') {\n    return order.total * 0.7;          // 员工打 7 折\n  }\n  // 每加一种折扣类型，都要改这个方法，加一个 else-if\n  return order.total;\n}\n\`\`\`\n问题：每新增一种折扣类型就要修改已有函数，违反「对修改关闭」。修改已有代码有回归风险——可能改坏 VIP 的逻辑。\n\n符合 OCP 的重构（用策略模式，新增折扣只加新类）：\n\`\`\`typescript\n// 抽象：折扣策略接口\ninterface DiscountStrategy {\n  calculate(order: Order): number;\n}\n\n// 已有实现，不需要修改\nclass VipDiscount implements DiscountStrategy {\n  calculate(order: Order) { return order.total * 0.8; }\n}\nclass RegularDiscount implements DiscountStrategy {\n  calculate(order: Order) { return order.total * 0.95; }\n}\n\n// 新增折扣类型：只加新类，不改老代码\nclass EmployeeDiscount implements DiscountStrategy {\n  calculate(order: Order) { return order.total * 0.7; }\n}\nclass AnniversaryDiscount implements DiscountStrategy {\n  calculate(order: Order) { return order.total * 0.5; }\n}\n\n// 调用方面向接口，不关心具体是哪个实现\nfunction calculateDiscount(order: Order, strategy: DiscountStrategy): number {\n  return strategy.calculate(order);\n}\n\`\`\`\n效果：新增折扣类型 = 新增一个类 + 注册，\`calculateDiscount\` 函数一行不改。扩展点开放（加新类），修改点关闭（不改老代码）。\n\nOCP 的核心手段是「抽象 + 多态」：把变化点抽象成接口，让新增行为通过新实现类接入，而非修改已有逻辑。`,
    tags: ["OCP", "开闭原则", "代码示例", "策略模式", "重构"],
  },
  {
    id: "add-solid-principles-03",
    chapter: "add-solid-principles",
    level: 3,
    question: `里氏替换原则（LSP）的经典违反案例是「正方形继承长方形」。请解释为什么这个继承违反 LSP，以及在实际项目中 LSP 违反的常见信号。`,
    answer:
      `经典案例：正方形继承长方形\n\n长方形的合理实现：\n\`\`\`typescript\nclass Rectangle {\n  setWidth(w: number) { this.width = w; }\n  setHeight(h: number) { this.height = h; }\n  getArea(): number { return this.width * this.height; }\n}\n\`\`\`\n\n正方形继承长方形（看起来很「自然」）：\n\`\`\`typescript\nclass Square extends Rectangle {\n  setWidth(w: number) { this.width = w; this.height = w; }  // 保证四边相等\n  setHeight(h: number) { this.width = h; this.height = h; }\n}\n\`\`\`\n\n为什么违反 LSP：\n\`\`\`typescript\nfunction testArea(r: Rectangle): void {\n  r.setWidth(5);\n  r.setHeight(4);\n  assert(r.getArea() === 20);  // 期望 5×4=20\n}\n\ntestArea(new Rectangle()); // 通过：5×4=20\ntestArea(new Square());     // 失败：Square 的 setHeight(4) 把 width 也改成 4，面积变成 16≠20\n\`\`\`\n\n子类 Square 无法替换父类 Rectangle 而不破坏调用方对父类行为的预期。调用方基于「setWidth 和 setHeight 互相独立」的前提使用 Rectangle，Square 打破了这个前提。这就是 LSP 违反——子类型改变了父类型的行为契约。\n\n实际项目中 LSP 违反的常见信号：\n\n1. 子类抛出父类不会抛的异常：\n父类方法 \`readFile()\` 不抛异常（返回 null 表示失败），子类重写后抛 \`FileNotFoundException\`。调用方没准备 catch，程序崩溃。\n\n2. 子类忽略或空实现父类方法：\n父类 \`Bird.fly()\` 会飞，子类 \`Penguin.fly()\` 里写 \`// do nothing\` 或抛 \`UnsupportedOperationException\`。企鹅不是「能飞的鸟」，这个继承关系本身就有问题。\n\n3. 调用方需要用 instanceof 判断具体子类型：\n\`\`\`typescript\nif (animal instanceof Dog) { animal.bark(); }\nelse if (animal instanceof Cat) { animal.meow(); }\n\`\`\`\n这说明子类型没有真正替换父类型——调用方必须知道具体子类才能正确工作，多态失效。\n\n4. 子类修改了父类方法的前置/后置条件：\n- 前置条件加强：父类 \`setAge(int)\` 接受任意正整数，子类要求 \`age > 18\`，否则抛异常。调用方按父类契约传值，子类拒绝。\n- 后置条件减弱：父类 \`sort()\` 保证返回有序列表，子类重写后不保证完全有序。\n\n5. 子类的行为语义与父类不兼容：\n父类 \`List.add()\` 总是添加元素并返回 true，子类 \`UniqueList.add()\` 在元素已存在时返回 false。语义不一致——调用方按「总是成功」的预期使用会出错。\n\nLSP 的本质：继承不仅是「is-a」的表面关系，更是「行为契约的承诺」。子类必须遵守父类建立的契约——不加强前置条件、不减弱后置条件、不抛意外异常。否则继承关系就是假的，多态就会在运行时炸。`,
    tags: ["LSP", "里氏替换", "正方形长方形", "行为契约", "instanceof"],
  },
  {
    id: "add-solid-principles-04",
    chapter: "add-solid-principles",
    level: 4,
    question: `SOLID 五原则之间有什么内在联系？为什么说 DIP 是其他四个原则的「 enabling principle 」？`,
    answer:
      `SOLID 不是五个孤立的原则，而是一个相互支撑的有机整体，共同指向「可维护、可扩展、可复用」的设计目标。\n\n五原则的内在联系：\n\n1. SRP 是基础：\n一个类只有一个变化原因，是其他原则的前提。如果类身兼多职，OCP 无法实现（一个变化点影响多个职责），LSP 容易违反（子类无法正确覆盖多职责方法），DIP 无从下手（不知道该抽象哪个职责）。\n\n2. OCP 是目标：\nOCP 是其他原则想要达到的结果——通过 SRP 拆分职责、通过 LSP 保证替换安全、通过 ISP 精确接口、通过 DIP 反转依赖，最终实现「加新功能不改老代码」。\n\n3. LSP 是保障：\nOCP 的扩展依赖于多态——通过新增子类扩展功能。但只有 LSP 成立，子类才能安全替换父类，OCP 的扩展才不会引入 bug。LSP 是 OCP 的安全网。\n\n4. ISP 是精度：\nISP 确保接口只暴露客户端需要的方法。胖接口会迫使客户端依赖不需要的方法，违反 SRP（客户端被迫关注无关功能），也为 LSP 埋雷（子类要实现一堆用不到的方法，容易空实现或抛异常）。\n\n5. DIP 是枢纽（enabling principle）：\n\n为什么说 DIP 是 enabling principle（使能原则）：\n\nDIP 规定「依赖抽象而非具体」。这条规则是其他原则能够落地的技术基础：\n\n- DIP 使 OCP 成为可能：\nOCP 要求「对扩展开放、对修改关闭」。实现手段是面向接口编程——客户端依赖抽象接口，新增行为通过新实现类接入。这正是 DIP。没有 DIP，客户端直接依赖具体类，新增实现就要改客户端，OCP 无法实现。\n\n- DIP 使 LSP 有意义：\nLSP 说「子类能替换父类」。但只有在客户端依赖的是抽象（父类/接口）而非具体类时，替换才能发生。如果客户端直接 new 具体子类，根本没有「替换」的余地。DIP 让客户端面向抽象，LSP 才有用武之地。\n\n- DIP 使 ISP 有效：\nISP 要求接口小而专。但接口本身就是一个抽象——DIP 鼓励依赖抽象，ISP 定义抽象该多大。没有 DIP，客户端直接依赖具体类，接口隔离毫无意义（根本不经过接口）。DIP 提供了「依赖抽象」的通道，ISP 才能在这个通道上做精化。\n\n- DIP 使 SRP 可扩展：\nSRP 拆分出的单一职责类，需要被其他模块使用。如果直接依赖具体类，类间耦合紧，职责拆分的收益被抵消。DIP 让模块间通过抽象（接口）连接，SRP 拆出的类可以被独立替换和复用。\n\n一句话总结五原则的关系：\n\nSRP 保证「每个类只管一件事」→ ISP 保证「接口只暴露需要的方法」→ LSP 保证「子类能安全替换父类」→ DIP 保证「依赖指向抽象而非具体」→ 四者共同支撑 OCP「扩展开放、修改关闭」。\n\n而 DIP 是这一切的「使能器」——没有依赖倒置，抽象就没有消费者，多态就没有入口，OCP 就只是一句口号。这也是为什么 DIP 在架构层面的影响最大——它是整洁架构、六边形架构等「依赖方向向内」原则的直接来源。`,
    tags: ["综合", "SOLID", "原则关系", "DIP", "enabling principle", "OCP"],
  },
];
