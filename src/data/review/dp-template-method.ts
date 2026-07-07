import type { ReviewQuestion } from "./types";

/** 模板方法模式章复习题 */
export const dpTemplateMethodQuestions: ReviewQuestion[] = [
  {
    id: "dp-template-method-01",
    chapter: "dp-template-method",
    level: 1,
    question: "模板方法模式的意图是什么？",
    answer: "模板方法模式在一个方法中定义一个算法的骨架，而将一些步骤延迟到子类中实现。模板方法使得子类可以在不改变算法结构的情况下，重新定义算法中的某些特定步骤。\n\n核心意图：把「算法的固定流程」放在父类，把「流程中可变的步骤」留给子类去实现。父类用一个 `templateMethod()` 依次调用各个步骤方法（有些是父类已实现的公共逻辑，有些是声明为 `abstract` 的钩子步骤），子类只重写那些可变步骤，整体流程框架不可改。这样既保证了流程一致性，又允许步骤细节可变。",
    tags: ["意图", "基础概念", "算法骨架"],
  },
  {
    id: "dp-template-method-02",
    chapter: "dp-template-method",
    level: 2,
    question: "模板方法模式和策略模式的区别是什么（继承 vs 组合）？",
    answer: "两者都能让「算法可变」，但机制和粒度不同：\n\n- 模板方法用「继承」：父类定义算法骨架（哪些步骤、什么顺序），子类重写个别步骤的实现。变化的是「步骤的内部细节」，算法的整体结构（步骤数量和顺序）由父类锁定，子类不能改结构。依赖继承，编译期确定。\n- 策略模式用「组合」：定义一族完整算法，各自封装成策略对象，客户端持有策略引用，运行时替换整个策略。变化的是「整个算法」，每个策略是一个完整实现，互不共享流程骨架。依赖对象组合，运行时可切换。\n\n对比：\n① 变化粒度：模板方法变「步骤细节」，策略变「整条算法」。\n② 耦合方式：模板方法靠继承（子类和父类紧耦合，受父类约束），策略靠组合（策略对象与上下文松耦合）。\n③ 灵活性：策略可在运行时换，模板方法的子类在编译期定死。\n④ 复用：模板方法的公共步骤在父类只写一次，子类共享；策略之间不共享代码（除非也提取公共逻辑）。\n\n选择：流程骨架稳定、只想变个别步骤 → 模板方法；想整体替换算法、运行时切换 → 策略。",
    tags: ["对比", "策略模式", "继承", "组合"],
  },
  {
    id: "dp-template-method-03",
    chapter: "dp-template-method",
    level: 3,
    question: "数据处理场景：读取→解析→处理→输出，步骤固定但每步可变，用模板方法模式设计。",
    answer: "1. 父类 `DataProcessor` 定义模板方法 `process()`：\n```\nprocess() {\n  const raw = this.read();\n  const data = this.parse(raw);\n  const result = this.transform(data);\n  this.output(result);\n}\n```\n其中 `process()` 是 final（不可重写），固定「读取→解析→处理→输出」四步顺序。`read()` / `parse()` / `transform()` / `output()` 声明为抽象方法，交给子类实现。\n2. 子类 `CsvProcessor extends DataProcessor`：`read()` 从文件读 CSV 文本，`parse()` 按逗号分割成行，`transform()` 过滤空行并转小写，`output()` 写入数据库。\n3. 子类 `JsonProcessor extends DataProcessor`：`read()` 从 HTTP 拉取 JSON，`parse()` 用 `JSON.parse`，`transform()` 映射字段，`output()` 发送到下游服务。\n4. 客户端：`new CsvProcessor().process()` 或 `new JsonProcessor().process()`，流程一致，细节各异。\n\n关键点：流程骨架只在父类写一次，新增数据源（如 XML、Excel）只需加一个子类实现四步，不用改父类和其他子类。公共步骤（如日志、计时）可在父类模板方法里统一加，所有子类自动复用。",
    tags: ["应用", "数据处理", "流程骨架"],
  },
  {
    id: "dp-template-method-04",
    chapter: "dp-template-method",
    level: 4,
    question: "模板方法的「钩子方法」(hook) 是什么？与抽象方法有什么区别？",
    answer: "钩子方法：父类提供一个「默认空实现」（或默认返回 true/false）的方法，子类「可选」地重写它来影响模板方法的流程，但不重写也不报错。\n\n区别：\n- 抽象方法：父类只声明不实现，子类「必须」实现，否则编译不过。用于「必须由子类提供的步骤」。\n- 钩子方法：父类给了默认实现（通常是空方法或返回默认值），子类「可选」重写。用于「子类可选介入的扩展点」。\n\n典型用法：模板方法里用钩子控制流程走向，如：\n```\nprocess() {\n  if (this.isEnabled()) {   // 钩子，默认 true\n    this.doStep();\n  }\n}\n```\n子类不重写 `isEnabled()` 就走默认（执行 `doStep`），重写返回 false 就跳过——子类用钩子「微调」流程而不需要改模板方法本身。\n\n价值：钩子让模板方法更灵活——父类预留扩展点，子类按需挂钩，不挂也不影响主流程。这是「好莱坞原则」（别调用我，我会调用你）的体现：子类只填空/挂钩，控制流由父类主导。抽象方法强制填空，钩子方法允许跳过，二者配合让模板方法既有骨架约束又有弹性扩展。",
    tags: ["钩子方法", "抽象方法", "好莱坞原则"],
  },
];
