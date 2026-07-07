import type { ReviewQuestion } from "./types";

/** 装饰器模式章复习题 */
export const dpDecoratorQuestions: ReviewQuestion[] = [
  {
    id: "dp-decorator-01",
    chapter: "dp-decorator",
    level: 1,
    question: "装饰器模式的意图是什么？",
    answer: "装饰器模式动态地给一个对象添加额外的职责，而不改变其接口。\n\n核心意图：在不使用继承的情况下「扩展对象的功能」。装饰器和被装饰对象实现同一个接口，调用方完全无感知；装饰器在调用前后可以附加行为。相比继承（编译期静态决定），装饰器在运行时灵活组合，且可以「层层嵌套」叠加多个职责。",
    tags: ["意图", "基础概念"],
  },
  {
    id: "dp-decorator-02",
    chapter: "dp-decorator",
    level: 2,
    question: "装饰器和继承有什么区别？为什么说「组合优于继承」？",
    answer: "继承的问题：\n- 静态：在编译期就固定了，运行时无法改变对象的类型。\n- 爆炸：想组合多种可选功能时，子类数量呈指数增长（如「带牛奶」「带糖」「带牛奶+糖」各需要一个子类）。\n- 强耦合：子类依赖父类的实现细节，父类变化会波及所有子类。\n\n装饰器的优势（组合）：\n- 动态：运行时可以任意组合装饰器，`new Milk(new Sugar(new Coffee()))`。\n- 正交：每种功能一个装饰器，需要几个就套几个，类的数量是线性的。\n- 单一职责：每个装饰器只管一件事，符合 SRP。\n\n「组合优于继承」的本质：通过持有对象引用（has-a）而非继承（is-a）来复用行为，让功能扩展更灵活、耦合更低。继承用于「真正的类型层次」，装饰器用于「功能的动态叠加」。",
    tags: ["继承", "组合优于继承", "对比"],
  },
  {
    id: "dp-decorator-03",
    chapter: "dp-decorator",
    level: 3,
    question: "咖啡订单场景：基础咖啡可以加牛奶、加糖，如何用装饰器模式实现计价？",
    answer: "1. 定义抽象组件 `Beverage`，声明 `cost()` 和 `getDescription()`。\n2. 具体组件 `SimpleCoffee` 实现 `Beverage`，`cost()` 返回 15。\n3. 装饰器基类 `CondimentDecorator` 实现 `Beverage`，内部持有一个 `Beverage` 引用（被装饰对象），把方法委托给它。\n4. 具体装饰器：\n- `MilkDecorator`：`cost()` 返回 `beverage.cost() + 3`。\n- `SugarDecorator`：`cost()` 返回 `beverage.cost() + 1`。\n\n使用：\n`const coffee = new SugarDecorator(new MilkDecorator(new SimpleCoffee()));`\n`coffee.cost()` → 15 + 3 + 1 = 19。\n\n关键点：每个装饰器都「是」一个 Beverage（接口一致），同时又「持有」一个 Beverage（组合）。调用时层层委托，从外到内传递，从内到外累加结果。新增「奶油」只需加一个 `CreamDecorator`，不改任何已有类。",
    tags: ["应用", "咖啡订单"],
  },
  {
    id: "dp-decorator-04",
    chapter: "dp-decorator",
    level: 4,
    question: "装饰器链套得过深会有什么问题？如何判断装饰器的合理层数？",
    answer: "问题：\n1. 可读性下降：`new A(new B(new C(new D(new E()))))` 很难一眼看出实际包装了哪些功能，调试时需要层层剥开。\n2. 调用栈变长：每层装饰器都多一次方法调用，嵌套深时性能有损耗，栈溢出风险也存在（极端情况）。\n3. 排序敏感：装饰器的顺序影响结果（如日志装饰器放在缓存装饰器外层还是内层，日志内容不同），顺序错了会出 bug，但顺序语义不直观。\n4. 初始化代码臃肿：构造对象时一长串嵌套，容易写错配对。\n\n合理层数的判断：\n- 通常 2-3 层以内是健康的，超过 5 层就该警惕。\n- 如果多个装饰器经常固定组合出现，可以提供一个 Builder 或工厂封装常用组合，让调用方不直接拼链。\n- 如果装饰器之间有顺序依赖且难以理解，说明职责划分可能有问题，考虑用其他模式（如责任链、组合）重构。\n- 装饰器应该是「正交可选」的；如果某些装饰器必须同时存在，那它们可能该合并成一个。",
    tags: ["问题", "权衡", "工程实践"],
  },
];
