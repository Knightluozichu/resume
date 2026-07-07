import type { ReviewQuestion } from "./types";

export const ctcPatternsQuestions: ReviewQuestion[] = [
  {
    id: "ctc-patterns-1",
    chapter: "ctc-patterns",
    level: 1,
    question: "模式匹配与传统 if-else 的本质区别是什么？shape is Circle c 一行做了什么？",
    answer: "模式匹配是声明式数据提取，不只是更短的if-else。shape is Circle c一行完成三件事：类型检查（shape is Circle）、类型转换（(Circle)shape）、变量绑定（c = 转换结果）。传统写法需要两步：先if (shape is Circle)检查，再var c = (Circle)shape转换。模式匹配的组合嵌套（is Circle { Radius: > 5 }）和穷尽性检查是传统if-else做不到的。",
    tags: ["模式匹配", "类型模式", "声明式", "数据提取"],
  },
  {
    id: "ctc-patterns-2",
    chapter: "ctc-patterns",
    level: 2,
    question: "switch 表达式和 switch 语句有什么区别？_（弃元）的作用是什么？枚举类型需要 _ 吗？",
    answer: "switch表达式是表达式形式——有返回值，用=>映射模式到结果，可直接赋值。switch语句是语句——无返回值，用case:和break。_是弃元模式，匹配任意值，类似switch语句的default。对枚举类型，如果覆盖了所有枚举成员，不需要_——编译器知道已穷尽。加_反而掩盖未来新增枚举成员时的遗漏警告。只有非枚举类型（string、int）或不确定穷尽的场景才需要_兜底。",
    tags: ["switch表达式", "弃元", "穷尽性", "枚举"],
  },
  {
    id: "ctc-patterns-3",
    chapter: "ctc-patterns",
    level: 3,
    question: "C# 10 的列表模式 [var first, .. var rest] 匹配什么？.. 是什么？写出三个列表模式的例子。",
    answer: "[var first, .. var rest]匹配至少1个元素的数组/列表：first绑定第一个元素，rest绑定剩余元素。..是切片模式，匹配零个或多个元素。三个例子：1）[1, 2, 3]精确匹配三个元素。2）[1, .., 3]首尾分别匹配1和3，中间任意。3）[var first, .. var middle, var last]提取首元素、尾元素和中间段。[]匹配空数组，[single]匹配单元素数组。列表模式适合解析固定格式数据序列、命令行参数、解构数组。",
    tags: ["列表模式", "切片模式", "C# 10", "数组解构"],
  },
  {
    id: "ctc-patterns-4",
    chapter: "ctc-patterns",
    level: 4,
    question: "用模式匹配写一个方法，根据不同 Shape 子类和属性返回面积，要求覆盖 Circle、Rectangle、Triangle，对未知类型返回 0。分析编译器的穷尽性检查。",
    answer: "double Area(Shape shape) => shape switch { Circle c => Math.PI * c.Radius * c.Radius, Rectangle r => r.Width * r.Height, Triangle t => TriangleArea(t), _ => 0 }; 因为Shape是抽象类而非sealed，编译器无法知道所有子类——所以必须用_兜底覆盖未知子类。如果Shape是sealed或用 discriminated union（C#未来特性），编译器可以检查穷尽性，不需要_。对于枚举类型的switch表达式，编译器会强制覆盖所有值或加_，否则编译警告。模式匹配的穷尽性检查是类型安全的额外保障——防止遗漏新分支。",
    tags: ["模式匹配", "switch表达式", "穷尽性", "类型安全"],
  },
];
