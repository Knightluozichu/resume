import type { ReviewQuestion } from "./types";

/** 策略模式章复习题 */
export const dpStrategyQuestions: ReviewQuestion[] = [
  {
    id: "dp-strategy-01",
    chapter: "dp-strategy",
    level: 1,
    question: `策略模式的意图是什么？`,
    answer: `策略模式定义一系列算法，将每一个封装起来，并使它们可以互相替换。\n\n核心意图：让算法的变化独立于使用算法的客户端。客户端不需要知道具体用哪个算法，只需要面向统一的接口编程；新增或切换算法时，客户端代码不需要改动。`,
    tags: ["意图", "基础概念"],
  },
  {
    id: "dp-strategy-02",
    chapter: "dp-strategy",
    level: 2,
    question: `策略模式的三要素（Context、Strategy 接口、ConcreteStrategy）各自承担什么职责？`,
    answer: `1. Strategy 接口：声明所有具体策略共有的方法（如 \`algorithm()\`），是客户端面向的抽象。\n2. ConcreteStrategy：实现 Strategy 接口的具体算法，每个类封装一种算法变体。\n3. Context（上下文）：持有一个 Strategy 引用，把算法调用委托给当前策略对象。Context 只和接口对话，不关心具体是哪个实现。\n\n关键点：Context 负责「用谁」，ConcreteStrategy 负责「怎么做」，两者通过接口解耦。`,
    tags: ["三要素", "结构"],
  },
  {
    id: "dp-strategy-03",
    chapter: "dp-strategy",
    level: 3,
    question: `一个支付系统里 \`pay()\` 方法用 if-else 判断支付宝/微信/银行卡，如何用策略模式重构？`,
    answer: `重构前：\`if (type === 'alipay') {...} else if (type === 'wechat') {...} else {...}\`，每加一种支付方式就要改这个方法，违反开闭原则。\n\n重构步骤：\n1. 定义策略接口 \`PaymentStrategy\`，声明 \`pay(amount)\` 方法。\n2. 为每种支付方式实现具体策略：\`AlipayStrategy\`、\`WechatPayStrategy\`、\`BankCardStrategy\`。\n3. Context 类 \`PaymentContext\` 持有一个 \`PaymentStrategy\` 引用，\`pay()\` 方法直接委托：\`strategy.pay(amount)\`。\n4. 新增支付方式时只需新建一个实现类，注册进去即可，\`PaymentContext\` 一行都不用改。\n\n效果：支付逻辑的扩展从「修改已有代码」变成了「新增代码」，符合开闭原则。`,
    tags: ["重构", "应用"],
  },
  {
    id: "dp-strategy-04",
    chapter: "dp-strategy",
    level: 4,
    question: `策略模式和简单的 if-else 各自适合什么场景？什么时候不该用策略模式？`,
    answer: `if-else 适合的场景：\n- 分支数量少（2-3 个）且基本稳定，不会频繁新增。\n- 每个分支逻辑很短，只是一个条件取值，没有复杂的算法差异。\n- 逻辑不会复用，也不需要独立测试。\n\n策略模式适合的场景：\n- 算法变体较多，且未来可能继续增加。\n- 不同算法之间是「平行的替代关系」，运行时需要动态切换。\n- 需要隔离算法的变化，让调用方不受影响。\n\n不该用的信号：只有两个分支且永远不变；策略类里只是包了一层壳但没有独立逻辑；为「可能将来会变」但实际从不变化的需求提前引入（过度设计）。简单问题用 if-else 更直白、更易读。`,
    tags: ["权衡", "工程实践"],
  },
];
