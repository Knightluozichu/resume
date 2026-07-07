import type { ReviewQuestion } from "./types";

/** Head First 设计模式 · 装饰器模式复习题 */
export const hfdDecoratorQuestions: ReviewQuestion[] = [
  {
    id: "hfd-decorator-1",
    chapter: "hfd-decorator",
    level: 1,
    question: "装饰器模式的定义是什么？装饰器和被装饰对象是什么关系？",
    answer:
      "装饰器模式定义：动态地给一个对象添加额外的职责。就增加功能而言，装饰器模式比生成子类更灵活。\n\n装饰器和被装饰对象的关系：\n1. 装饰器和被装饰对象实现同一个接口（或继承同一个抽象类）——对外类型一致。\n2. 装饰器内部持有一个被装饰对象的引用（HAS-A 关系）。\n3. 装饰器在调用被装饰对象方法的前后，可以添加自己的行为。\n4. 装饰器可以层层嵌套：A 装饰 B，C 装饰 A，形成链式结构。\n\n以咖啡为例：Whip(Mocha(DarkRoast))——Whip 是最外层装饰器，持有 Mocha 引用，Mocha 持有 DarkRoast 引用。调用 cost() 时层层委托累加。",
    tags: ["定义", "HAS-A", "嵌套"],
  },
  {
    id: "hfd-decorator-2",
    chapter: "hfd-decorator",
    level: 2,
    question: "装饰器模式为什么要「继承 Component 同时持有 Component 引用」？这两个 Component 各起什么作用？",
    answer:
      "装饰器同时有两个 Component：\n\n1. 继承 Component（IS-A）：\n- 目的：类型匹配。装饰器必须和被装饰对象是同一类型，才能替换被装饰对象。客户端面向 Component 编程，装饰后的对象仍然是 Component 类型，客户端无感知。\n- 不是为了「获得行为」，而是为了「获得类型」。\n\n2. 持有 Component 引用（HAS-A）：\n- 目的：行为委托。装饰器把核心操作委托给被装饰对象，在前后添加自己的行为。\n- 这才是真正「获得行为」的方式。\n\n关键洞察：装饰器的继承是「类型继承」不是「行为继承」。行为来自组合（持有引用），类型来自继承（实现接口）。如果只用继承不用组合，就是普通的子类扩展——无法运行时动态叠加。如果只用组合不用继承，装饰器无法替换被装饰对象的位置。",
    tags: ["IS-A", "HAS-A", "类型继承"],
  },
  {
    id: "hfd-decorator-3",
    chapter: "hfd-decorator",
    level: 3,
    question: "用 Java I/O 的 InputStream 为例，说明装饰器模式如何动态叠加功能。`new BufferedInputStream(new FileInputStream(\"f.txt\"))` 是什么结构？",
    answer:
      "Java I/O 是装饰器模式的经典应用：\n- InputStream 是 Component（抽象基类）。\n- FileInputStream 是 ConcreteComponent（直接读文件）。\n- BufferedInputStream 是 ConcreteDecorator（加缓冲功能）。\n- LineNumberInputStream 也是 Decorator（加行号功能）。\n\n`new BufferedInputStream(new FileInputStream(\"f.txt\"))` 结构：\n- 最内层：FileInputStream，负责从文件逐字节读取。\n- 外层：BufferedInputStream，持有 FileInputStream 引用，read() 时先读一大块到缓冲区，后续从缓冲区取——减少磁盘 I/O。\n- 对外类型仍是 InputStream，客户端无感知。\n\n可以继续叠加：\n```java\nInputStream s = new LineNumberInputStream(\n    new BufferedInputStream(\n        new FileInputStream(\"f.txt\")));\n```\n读文件 + 缓冲 + 行号三层装饰，每层只管自己的职责。这就是装饰器的威力——动态组合功能，比写一个 BufferedLineNumberFileInputStream 灵活得多。\n\n缺点：嵌套深时可读性差，创建代码冗长。",
    tags: ["Java IO", "应用", "实例"],
  },
  {
    id: "hfd-decorator-4",
    chapter: "hfd-decorator",
    level: 4,
    question: "装饰器模式和继承都能扩展功能，它们的本质区别是什么？什么场景下装饰器更好，什么场景下继承更好？",
    answer:
      "本质区别：\n1. 时机：继承在编译期确定行为（静态），装饰器在运行时动态叠加（动态）。\n2. 组合性：继承是单维度的（一个子类只能扩展一种功能），装饰器是多维度的（多个装饰器可任意组合叠加）。\n3. 修改影响：改父类影响所有子类，改装饰器只影响使用该装饰器的对象。\n4. 对象身份：继承创建新类型，装饰器不改变类型（仍是 Component）。\n\n装饰器更好的场景：\n- 功能需要运行时动态叠加或移除。\n- 多种功能需要自由组合（如 I/O 的缓冲+行号+压缩）。\n- 不想为每种功能组合创建子类（避免类爆炸）。\n- 想在不修改原有类的前提下扩展功能（开闭原则）。\n\n继承更好的场景：\n- 功能在编译期就确定，不需要运行时变化。\n- 扩展的是「本质属性」而非「附加功能」（如 Dog extends Animal）。\n- 子类需要覆盖父类多个方法且逻辑紧密耦合。\n- 功能维度少（1-2 个），组合简单不会爆炸。\n\n判断标准：问自己「这个功能需要运行时切换吗？」「功能组合会产生子类爆炸吗？」——是 → 装饰器，否 → 继承。",
    tags: ["综合", "装饰器 vs 继承", "对比"],
  },
];
