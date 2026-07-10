import type { ReviewQuestion } from "./types";

/** Head First 设计模式 · 模板方法复习题 */
export const hfdTemplateMethodQuestions: ReviewQuestion[] = [
  {
    id: "hfd-template-method-1",
    chapter: "hfd-template-method",
    level: 1,
    question: `模板方法模式的定义是什么？「模板方法」和「抽象方法」的区别是什么？`,
    answer:
      `模板方法模式定义：在一个方法中定义算法的骨架，将一些步骤延迟到子类中实现。模板方法让子类在不改变算法结构的情况下，重新定义算法中的某些步骤。\n\n模板方法 vs 抽象方法：\n1. 模板方法（templateMethod）：\n- 是具体方法（非 abstract），定义在抽象父类中。\n- 定义算法骨架——步骤的调用顺序。\n- 通常声明为 final，防止子类覆盖改变流程。\n- 内部调用其他方法（抽象的或具体的）。\n\n2. 抽象方法（primitive operation）：\n- 是 abstract 方法，声明在抽象父类中，由子类实现。\n- 是算法的「填空」部分——具体步骤的实现。\n- 子类必须实现（除非子类也是抽象的）。\n\n以咖啡因饮料为例：\n- prepareRecipe() 是模板方法：boilWater() → brew() → pourInCup() → addCondiments()。\n- brew() 和 addCondiments() 是抽象方法，Coffee 和 Tea 各自实现。\n- boilWater() 和 pourInCup() 是具体方法，父类实现，子类共用。\n\n关键：模板方法控制流程（高层），抽象方法提供实现（低层）——控制权反转。`,
    tags: ["定义", "模板方法", "抽象方法"],
  },
  {
    id: "hfd-template-method-2",
    chapter: "hfd-template-method",
    level: 2,
    question: `什么是「好莱坞原则」？模板方法模式如何体现它？它和依赖倒置原则有什么关系？`,
    answer:
      `好莱坞原则（Hollywood Principle）：「别调用我们，我们会调用你」（Don't call us, we'll call you）。\n\n含义：高层组件（父类）控制流程，主动调用低层组件（子类）的方法；低层组件不要主动调用高层组件，只等着被调用。\n\n模板方法如何体现：\n- 父类的 prepareRecipe()（模板方法）控制算法流程，在适当的时候调用 brew() 和 addCondiments()。\n- 子类只实现 brew() 和 addCondiments()，不主动调用 prepareRecipe()。\n- 子类「填空」但不「主导」——流程由父类说了算。\n- 防止子类乱改流程：模板方法声明为 final。\n\n与依赖倒置原则的关系：\n- 依赖倒置：高层不依赖低层，两者都依赖抽象。\n- 好莱坞原则是依赖倒置在「方法调用」层面的体现：父类（高层）不直接依赖子类（低层）的具体实现，而是通过抽象方法（抽象）间接调用。\n- 依赖倒置关注「类之间的依赖方向」，好莱坞原则关注「调用方向」（谁调用谁）。\n- 两者都防止低层组件反向控制高层流程——避免「依赖腐烂」。\n\n对比：\n- 策略模式中客户端主动选择策略——客户端调用策略。\n- 模板方法中父类主动调用子类方法——父类调用子类（好莱坞原则）。`,
    tags: ["好莱坞原则", "依赖倒置", "控制反转"],
  },
  {
    id: "hfd-template-method-3",
    chapter: "hfd-template-method",
    level: 3,
    question: `模板方法中的「钩子方法（hook）」是什么？它和抽象方法有什么区别？写一个用钩子控制流程的 Java 示例。`,
    answer:
      `钩子方法：\n- 是具体方法（非 abstract），在父类中有默认实现（通常是空方法或返回默认值）。\n- 子类「可以」覆盖但不「必须」覆盖。\n- 用于让子类「有机会」影响模板方法的流程，但不强制。\n\n与抽象方法的区别：\n- 抽象方法：子类必须实现，是算法的必要步骤。\n- 钩子方法：子类可选覆盖，是算法的可选扩展点。\n- 抽象方法 = 必填填空，钩子方法 = 可选开关。\n\n用钩子控制流程的示例（咖啡加调料前问用户是否要）：\n\`\`\`java\npublic abstract class CaffeineBeverage {\n    final void prepareRecipe() {\n        boilWater();\n        brew();\n        pourInCup();\n        if (customerWantsCondiments()) {  // 钩子控制流程\n            addCondiments();\n        }\n    }\n\n    abstract void brew();\n    abstract void addCondiments();\n\n    void boilWater() { System.out.println(\"烧水\"); }\n    void pourInCup() { System.out.println(\"倒杯\"); }\n\n    // 钩子方法——默认返回 true，子类可覆盖\n    boolean customerWantsCondiments() {\n        return true;\n    }\n}\n\n// 不加调料的子类：覆盖钩子返回 false\npublic class BlackCoffee extends CaffeineBeverage {\n    void brew() { System.out.println(\"冲咖啡\"); }\n    void addCondiments() { System.out.println(\"加糖\"); }\n    boolean customerWantsCondiments() { return false; }  // 不加\n}\n\`\`\`\n\n关键：钩子让子类在不改变算法骨架的前提下影响流程——条件分支的决策权交给子类。如果用抽象方法强制子类实现就没有「可选」的灵活性。`,
    tags: ["钩子方法", "hook", "流程控制", "Java"],
  },
  {
    id: "hfd-template-method-4",
    chapter: "hfd-template-method",
    level: 4,
    question: `模板方法模式和策略模式都能封装算法变化，它们的本质区别是什么？什么场景下选哪个？`,
    answer:
      `本质区别：\n\n1. 变化方式：\n- 模板方法：算法骨架不变，个别步骤变化——「整体不变，部分变化」。用继承实现，子类覆盖步骤。\n- 策略模式：整个算法替换——「整体变化」。用组合实现，运行时切换策略对象。\n\n2. 控制权：\n- 模板方法：父类控制流程（好莱坞原则），子类只填空。流程的调用顺序由父类决定。\n- 策略模式：Context 把整个算法委托给策略对象，策略对象内部自己决定流程。Context 不关心算法内部步骤。\n\n3. 粒度：\n- 模板方法：细粒度——控制到每个步骤。子类只能改变个别步骤，不能改变步骤顺序。\n- 策略模式：粗粒度——整个算法作为一个整体替换。策略内部怎么组织步骤是策略自己的事。\n\n4. 机制：\n- 模板方法：继承（IS-A），子类是父类的特化。\n- 策略模式：组合（HAS-A），策略是 Context 的可替换部件。\n\n5. 运行时行为：\n- 模板方法：编译期确定（子类类型决定），运行时不切换。\n- 策略模式：运行时可切换（调 setStrategy 替换）。\n\n选择框架：\n- 算法骨架固定，只有个别步骤不同 → 模板方法。（如：所有报告都经过「收集数据→格式化→输出」骨架，但数据源和格式不同）\n- 整个算法需要整体替换 → 策略模式。（如：支付方式从支付宝换成微信，整个支付流程不同）\n- 需要运行时动态切换 → 策略模式。\n- 需要父类强制流程一致性 → 模板方法。\n- 不想用继承（类层次太深） → 策略模式。\n\n两者可以结合：模板方法定义骨架，某些步骤委托给策略对象——既有骨架控制又有运行时灵活性。`,
    tags: ["综合", "模板方法 vs 策略", "对比", "选择"],
  },
];
