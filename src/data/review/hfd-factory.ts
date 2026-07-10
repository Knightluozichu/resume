import type { ReviewQuestion } from "./types";

/** Head First 设计模式 · 工厂模式复习题 */
export const hfdFactoryQuestions: ReviewQuestion[] = [
  {
    id: "hfd-factory-1",
    chapter: "hfd-factory",
    level: 1,
    question: `简单工厂、工厂方法和抽象工厂三者的核心区别是什么？`,
    answer:
      `三者逐步升级：\n\n1. 简单工厂：\n- 一个工厂类，一个 create 方法，内部用 if-else 判断创建哪个产品。\n- 不是正式的 GoF 模式，只是把 new 集中到一处的编程习惯。\n- 加产品要改工厂的 if-else——违反开闭原则。\n\n2. 工厂方法：\n- 定义抽象工厂类（或接口），声明抽象 create 方法。\n- 每个具体产品对应一个具体工厂子类，由子类决定创建哪个对象。\n- 加产品只需加工厂子类和产品子类，不改抽象工厂——符合开闭原则。\n- 创建单个产品。\n\n3. 抽象工厂：\n- 定义工厂接口，声明多个 create 方法创建一族相关产品。\n- 每个具体工厂创建一套风格一致的产品族。\n- 加新产品族（新风格）加工厂实现即可，加新产品类型（新方法）要改接口。\n- 创建产品族。\n\n选择：产品少稳定 → 简单工厂；产品会持续增加 → 工厂方法；需要创建风格一致的产品族 → 抽象工厂。`,
    tags: ["三种工厂", "对比"],
  },
  {
    id: "hfd-factory-2",
    chapter: "hfd-factory",
    level: 2,
    question: `工厂方法模式如何体现「依赖倒置原则」？没有工厂之前，PizzaStore 直接 new 具体披萨有什么问题？`,
    answer:
      `没有工厂时的问题：\nPizzaStore.orderPizza() 里直接 \`new CheesePizza()\`、\`new PepperoniPizza()\`。这意味着：\n1. PizzaStore 依赖具体类（CheesePizza），不是抽象——违反依赖倒置原则。\n2. 加新披萨类型要改 orderPizza 的 if-else——违反开闭原则。\n3. orderPizza 既要管流程（准备→烘焙→切割→装盒）又要管创建——职责混乱。\n\n工厂方法的依赖倒置：\n1. PizzaStore 变成抽象类，createPizza() 声明为抽象方法返回 Pizza 抽象类。\n2. orderPizza() 只管流程，把创建委托给 createPizza()。\n3. NYPizzaStore 和 ChicagoPizzaStore 子类各自实现 createPizza()，返回各自风格的披萨。\n4. PizzaStore 只依赖 Pizza 抽象类，不依赖任何具体披萨——依赖倒置达成。\n\n效果：加新风味只需加 PizzaStore 子类 + 具体披萨类，不改 PizzaStore 抽象类和 orderPizza 流程。高层模块（PizzaStore）不依赖低层模块（具体披萨），两者都依赖抽象（Pizza）。`,
    tags: ["依赖倒置", "开闭原则", "工厂方法"],
  },
  {
    id: "hfd-factory-3",
    chapter: "hfd-factory",
    level: 3,
    question: `披萨店需要支持纽约风格和芝加哥风格，每种风格有不同的面团、酱料、奶酪。如何用抽象工厂实现？`,
    answer:
      `问题分析：需要创建一族相关产品（面团+酱料+奶酪），且不同风格的产品族不同——这是抽象工厂的典型场景。\n\n实现：\n\`\`\`java\n// 1. 抽象产品接口\npublic interface Dough { String toString(); }\npublic interface Sauce { String toString(); }\npublic interface Cheese { String toString(); }\n\n// 2. 抽象工厂接口\npublic interface PizzaIngredientFactory {\n    Dough createDough();\n    Sauce createSauce();\n    Cheese createCheese();\n}\n\n// 3. 纽约原料族\npublic class NYPizzaIngredientFactory\n    implements PizzaIngredientFactory {\n    public Dough createDough() { return new ThinCrustDough(); }\n    public Sauce createSauce() { return new MarinaraSauce(); }\n    public Cheese createCheese() { return new ReggianoCheese(); }\n}\n\n// 4. 芝加哥原料族\npublic class ChicagoPizzaIngredientFactory\n    implements PizzaIngredientFactory {\n    public Dough createDough() { return new ThickCrustDough(); }\n    public Sauce createSauce() { return new PlumTomatoSauce(); }\n    public Cheese createCheese() { return new Mozzarella(); }\n}\n\`\`\`\n披萨类持有一个 PizzaIngredientFactory 引用，prepare() 时调用工厂方法获取原料。切换工厂即切换整套风格，保证原料族一致性。\n\n关键：抽象工厂保证「NY 工厂不会配芝加哥面团」——产品族一致性。`,
    tags: ["抽象工厂", "应用", "产品族", "Java"],
  },
  {
    id: "hfd-factory-4",
    chapter: "hfd-factory",
    level: 4,
    question: `有人说「工厂模式就是多了一层间接调用，把 new 换成 create，纯属过度设计」。请分析这个观点的对错，给出你的判断。`,
    answer:
      `这个观点部分正确部分错误：\n\n正确的部分：\n- 如果产品类型只有一个且永不变化，直接 new 确实比工厂简单——此时工厂是过度设计。\n- 如果创建逻辑只是 \`return new Xxx()\`，没有任何复杂逻辑，工厂确实只是多一层间接。\n- 简单工厂在产品少时，和直接 if-else new 差别不大。\n\n错误的部分：\n工厂的真正价值在于「隔离变化」和「依赖倒置」，不只是「换 new 为 create」：\n1. 创建逻辑复杂时（需要条件判断、配置读取、依赖注入），集中到工厂避免重复。\n2. 客户端依赖抽象产品而非具体产品——解耦。\n3. 加新产品不改客户端代码——开闭原则。\n4. 抽象工厂保证产品族一致性——这是直接 new 做不到的。\n5. 工厂是很多框架的基础（DI 容器、ORM 的 SessionFactory）。\n\n判断框架：\n- 产品类型固定不变 + 创建逻辑简单 → 直接 new，不需要工厂。\n- 产品会变化 + 创建逻辑有条件判断 → 简单工厂或工厂方法。\n- 需要创建产品族 + 保证一致性 → 抽象工厂。\n- 不确定未来是否变化 → 先简单 new，变化来再重构。\n\n核心：工厂的价值是「管理变化」，不是「换语法」。没有变化时用工厂是过度设计，有变化时不用工厂是设计不足。`,
    tags: ["综合", "过度设计", "价值判断"],
  },
];
