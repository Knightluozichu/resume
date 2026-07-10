import type { ReviewQuestion } from "./types";

/** Head First 设计模式 · 总复习复习题 */
export const hfdFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "hfd-final-review-1",
    chapter: "hfd-final-review",
    level: 1,
    question: `GoF 设计模式分为哪三大分类？本书覆盖了哪些模式？`,
    answer:
      `GoF 三大分类：\n1. 创建型：关注对象的创建——单例模式、工厂方法、抽象工厂、建造者模式、原型模式。本书覆盖：单例、工厂方法、抽象工厂（3 个）。\n2. 结构型：关注对象的组合——装饰器模式、适配器模式、外观模式、代理模式、组合模式、桥接模式、享元模式。本书覆盖：装饰器、适配器、外观（3 个）。\n3. 行为型：关注对象的交互——策略模式、观察者模式、命令模式、模板方法、状态模式、责任链、迭代器、中介者、备忘录、访问者、解释器。本书覆盖：策略、观察者、命令、模板方法（4 个）。\n\n本书共覆盖 10 个核心模式（含学习地图和总复习章），是 GoF 23 个模式中最常用的入门子集。`,
    tags: ["GoF分类", "全书覆盖", "创建型", "结构型", "行为型"],
  },
  {
    id: "hfd-final-review-2",
    chapter: "hfd-final-review",
    level: 2,
    question: `「针对接口编程」和「多用组合少用继承」这两条原则，分别在哪些模式中得到了体现？`,
    answer:
      `「针对接口编程，不针对实现编程」：\n- 策略模式：Duck 面向 FlyBehavior 接口，不依赖具体飞行类。\n- 观察者模式：Subject 面向 Observer 接口，不依赖具体观察者。\n- 装饰器模式：客户端面向 Beverage 抽象类，装饰器也面向 Beverage。\n- 工厂方法：PizzaStore 面向 Pizza 抽象类，不依赖具体披萨。\n- 命令模式：Invoker 面向 Command 接口，不依赖具体命令。\n- 适配器模式：Client 面向 Target 接口，不直接接触 Adaptee。\n\n「多用组合，少用继承」：\n- 策略模式：Duck 组合 FlyBehavior（而非继承飞行行为）——最经典的组合应用。\n- 装饰器模式：装饰器组合被装饰对象（而非继承来获得行为）。\n- 观察者模式：Subject 组合 Observer 列表。\n- 命令模式：ConcreteCommand 组合 Receiver。\n- 外观模式：Facade 组合子系统组件。\n- 适配器模式：对象适配器组合 Adaptee。\n\n对比：模板方法模式用了继承（子类覆盖步骤），是少数「继承为主」的模式。但它的继承是「骨架共享」而非「行为复用」——控制流程而非获得行为。`,
    tags: ["原则", "针对接口编程", "组合优于继承"],
  },
  {
    id: "hfd-final-review-3",
    chapter: "hfd-final-review",
    level: 3,
    question: `如果让你设计一个智能家居控制系统，需要支持多种设备（灯、空调、窗帘）、多种控制方式（按钮、语音、定时）和撤销操作，你会用哪些模式？如何组合？`,
    answer:
      `综合应用多个模式：\n\n1. 命令模式——封装控制请求：\n每种设备的操作封装成命令对象（LightOnCommand、ACOffCommand...）。支持 undo、宏命令（「回家模式」一键执行多操作）。定时任务 = 命令队列。语音控制 = 语音解析后触发对应命令。\n\n2. 工厂方法——创建命令对象：\nCommandFactory 根据设备类型和操作创建对应命令。加新设备只需加工厂子类，不改已有代码。\n\n3. 观察者模式——设备状态同步：\n设备状态变化时通知 UI 面板更新显示。Device 作为 Subject，UIPanel 作为 Observer。支持多面板同时显示。\n\n4. 单例模式——全局控制器：\nSmartHomeController 作为单例，管理所有设备和命令历史。全局唯一访问点。\n\n5. 外观模式——简化客户端调用：\nSmartHomeFacade 提供 turnOnAllLights()、goHome() 等简化方法，内部协调多个设备。客户端不需要知道每个设备的接口。\n\n6. 适配器模式——兼容第三方设备：\n不同厂商的设备接口不同（ PhilipsLight vs XiaomiLight），用适配器统一成 Device 接口。\n\n7. 模板方法——设备初始化流程：\nDevice 基类定义 init() 模板：connect → authenticate → register → ready。不同设备子类覆盖具体步骤。\n\n组合方式：\n- Facade 调用 Command，Command 调用 Device（经 Adapter 适配）。\n- Device 状态变化通知 Observer（UI 更新）。\n- CommandFactory 创建 Command，Singleton 管理全局。\n- Device 初始化用 TemplateMethod。\n\n这就是「复合模式」——多个模式协同工作，各自解决一个问题域。`,
    tags: ["综合", "复合模式", "系统设计", "应用"],
  },
  {
    id: "hfd-final-review-4",
    chapter: "hfd-final-review",
    level: 4,
    question: `「模式是用出来的，不是套上去的」。请论述：何时应该引入设计模式？何时应该避免？如何判断「这是模式解决的问题」还是「过度设计」？`,
    answer:
      `何时应该引入设计模式：\n\n1. 变化已经发生或明确即将发生：\n- 不用为「可能将来会变」提前引入模式（YAGNI）。\n- 当变化第一次发生时引入——重构到模式，而非预先设计。\n\n2. 重复的代码异味出现：\n- 多处 if-else / switch 判断类型 → 考虑策略或工厂。\n- 一个类承担太多职责 → 考虑拆分 + 模式。\n- 修改一个功能波及多个类 → 考虑解耦模式。\n\n3. 需求明确需要模式解决的核心问题：\n- 需要运行时切换算法 → 策略。\n- 需要一对多通知 → 观察者。\n- 需要撤销操作 → 命令。\n- 需要全局唯一 → 单例。\n\n何时应该避免：\n\n1. 系统简单、变化少：2-3 个分支且稳定，if-else 比策略更直白。\n2. 团队不熟悉模式：引入不熟悉的模式增加理解成本，得不偿失。\n3. 性能敏感：模式增加间接调用层次，极端性能场景需权衡。\n4. 一次性脚本或原型：快速验证想法时简单直接优先。\n5. 为了用模式而用模式：「我学了装饰器，所有功能都要用装饰器叠加」——这是最危险的心态。\n\n判断「模式解决的问题」vs「过度设计」：\n\n问三个问题：\n1. 这个变化是真实的还是想象的？\n- 真实发生 → 模式有价值。想象中的 → 过度设计。\n\n2. 模式是否真的降低了复杂度？\n- 模式后代码更简单、更易扩展 → 正确使用。\n- 模式后类更多、理解更难 → 过度设计。\n\n3. 团队能看懂吗？\n- 模式是通用词汇，团队熟悉 → 沟通成本降低。\n- 模式很生僻，需要大量注释 → 未必值得。\n\n核心原则：「模式是重构的目标，不是设计的起点」。先写简单的代码，当变化来时重构到模式。KISS（Keep It Simple, Stupid）永远优先于模式。`,
    tags: ["综合", "何时用模式", "过度设计", "工程哲学"],
  },
];
