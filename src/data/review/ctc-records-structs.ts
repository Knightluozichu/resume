import type { ReviewQuestion } from "./types";

export const ctcRecordsStructsQuestions: ReviewQuestion[] = [
  {
    id: "ctc-records-structs-1",
    chapter: "ctc-records-structs",
    level: 1,
    question: `record 和 class 都分配在堆上，它们的 == 行为有什么不同？为什么？`,
    answer: `class的==默认是引用相等——两个变量指向同一堆对象才返回true。record的==是值相等——所有字段相同即返回true，即使不同堆对象。原因：record编译器自动重载==和!=，调用合成的Equals方法做值比较。record的设计目的是值语义的数据载体——两个Person如果Name和Age相同逻辑上就是同一个人。class的设计目的是有身份的对象——即使属性相同也是不同对象。`,
    tags: ["record", "class", "值相等", "引用相等"],
  },
  {
    id: "ctc-records-structs-2",
    chapter: "ctc-records-structs",
    level: 2,
    question: `with 表达式做了什么？p with { Age = 31 } 后原 p 变了吗？`,
    answer: `with表达式创建record/record struct的副本并修改指定属性。p with { Age = 31 }创建p的副本并将Age改为31，原p不变（Age仍为原值）。with是创建副本+修改的语法糖——对record在堆上创建新对象，对record struct创建值副本。with表达式依赖编译器自动生成的Clone方法和init-only setter。不可变修改的本质是用副本替代原地修改。`,
    tags: ["with表达式", "不可变", "副本", "init-only"],
  },
  {
    id: "ctc-records-structs-3",
    chapter: "ctc-records-structs",
    level: 3,
    question: `record struct 和普通 struct 有什么区别？为什么 new Point(1,2) == new Point(1,2) 对 record struct 是 true 对普通 struct 是编译错误？`,
    answer: `record struct自动合成Equals、GetHashCode、==、!=、ToString、Deconstruct、with——普通struct没有这些。new Point(1,2)==new Point(1,2)对record struct是true因为编译器自动生成了==操作符调用合成的Equals。对普通struct是编译错误因为struct没有自动定义==操作符（需要手动重写）。普通struct只能用Equals方法比较（ValueType.Equals用反射，较慢），record struct用编译器生成的高效Equals。record struct是struct的豪华版，省去大量样板代码。`,
    tags: ["record struct", "struct", "合成方法", "操作符重载"],
  },
  {
    id: "ctc-records-structs-4",
    chapter: "ctc-records-structs",
    level: 4,
    question: `在以下四种类型中为「三维坐标点」选择最合适的类型并说明理由：class、record、record struct、readonly record struct。`,
    answer: `选readonly record struct。理由：1）三维坐标点（X,Y,Z三个double，24字节）小型且≤16字节适合值类型。2）坐标是数据载体，值相等合理——两个(1,2,3)点逻辑上相等。3）不可变——坐标点不应被修改，readonly保证编译时不可变。4）栈分配避免GC压力——坐标点频繁创建销毁（如粒子系统），值类型在栈上分配不增加GC。5）with表达式方便创建修改后的副本。6）不选record因为坐标点不需要引用共享和继承。7）不选普通struct因为缺少自动值相等和with。8）不选class因为堆分配开销大且引用相等不合适。`,
    tags: ["类型选择", "readonly record struct", "值类型", "不可变", "性能"],
  },
];
