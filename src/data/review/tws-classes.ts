import { ReviewQuestion } from "../types";

export const twsClassesQuestions: ReviewQuestion[] = [
  {
    id: "tws-classes-1",
    chapter: "tws-classes",
    level: 1,
    question: "Stone 中如何定义类？构造参数和字段的关系是什么？",
    answer:
      "定义类用 class 语句：`class Point(x, y) { def move(dx, dy) { ... } }`。构造参数（x, y）在类定义的圆括号中声明，自动成为实例字段——创建对象时传入的参数值直接绑定到对象环境的字段中。类体内用 def 定义方法。创建实例用 `Point(1, 2)` 语法。构造参数不需要额外声明字段，Stone 自动将它们放入对象的字段环境中，方法内可通过名称直接访问。",
    tags: ["class", "类定义", "构造参数", "字段"],
  },
  {
    id: "tws-classes-2",
    chapter: "tws-classes",
    level: 2,
    question: "Stone 中如何实现继承？子类如何复用父类的构造和方法？",
    answer:
      "继承用 extends 关键字：`class Point3D(x, y, z) extends Point(x, y) { ... }`。extends 后的 `Point(x, y)` 表示调用父类构造器初始化继承的字段。子类自动获得父类定义的所有方法（如 move），也可新增自己的方法（如 moveZ）。方法查找时先在子类中找，找不到再到父类找。子类可以重写父类方法——定义同名方法，查找时优先找到子类版本。super.method() 可显式调用父类方法。",
    tags: ["extends", "继承", "方法复用", "super"],
  },
  {
    id: "tws-classes-3",
    chapter: "tws-classes",
    level: 3,
    question: "方法调用时 this 是如何绑定的？方法查找链是如何工作的？",
    answer:
      "this 绑定：调用 `p.move(1, 2)` 时，求值器将 p 绑定到方法执行环境中的 this 变量，方法体内通过 this 访问对象自身的字段和方法。方法查找链：①先在对象的 classInfo（类信息）中查找方法定义 ②如果当前类没有该方法，沿继承链到父类查找 ③一直找到 Object 根类 ④如果整条链都找不到，抛出方法不存在的异常。查找从子类开始，确保子类重写的方法优先被找到——这是动态分派的基础。",
    tags: ["this", "方法查找链", "动态分派", "classInfo"],
  },
  {
    id: "tws-classes-4",
    chapter: "tws-classes",
    level: 2,
    question: "StoneObject 内部包含哪些信息？它与 Environment 是什么关系？",
    answer:
      "StoneObject（实例对象）包含：①classInfo（StoneClassInfo）—— 类的元信息，包括方法定义表和父类引用 ②fields（Environment）—— 字段绑定环境，存储实例的字段值。StoneObject 复用 Environment 作为字段存储——字段就是环境中的变量绑定。方法执行时创建的新环境以 this 对象的 fields 环境为 outer，使方法体内能直接通过名称访问字段。这种设计让字段访问和方法内变量查找统一使用环境链机制，无需额外实现字段查找逻辑。",
    tags: ["StoneObject", "classInfo", "fields", "Environment", "对象模型"],
  },
];
