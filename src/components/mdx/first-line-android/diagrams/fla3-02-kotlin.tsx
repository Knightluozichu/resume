import { OfficialFla3BookLab } from "./official-fla3-book-lab";

const nodes = [
  "第2章 探究新语言，快速入门Kotlin编程",
  "2.1 Kotlin语言简介",
  "2.2 如何运行Kotlin代码",
  "2.3 编程之本：变量和函数",
  "2.4 程序的逻辑控制",
  "2.5 面向对象编程",
  "2.6 Lambda编程",
  "2.7 空指针检查",
  "2.8 Kotlin中的小魔术",
  "2.9 小结与点评"
];

export function FlaLifecycleLab() { return <OfficialFla3BookLab mode="lifecycle" unitTitle="第2章 探究新语言，快速入门Kotlin编程" focus="掌握Kotlin变量、函数、控制流、面向对象、Lambda、集合、空安全与扩展语法，并理解其在Android字节码与Java互操作中的边界" nodes={nodes} />; }
export function FlaStateLab() { return <OfficialFla3BookLab mode="state" unitTitle="第2章 探究新语言，快速入门Kotlin编程" focus="为同一数据转换分别写命令式和函数式Kotlin实现，加入可空输入、继承和Java调用，比较类型推断与生成行为" nodes={nodes} />; }
export function FlaEvidenceLab() { return <OfficialFla3BookLab mode="evidence" unitTitle="第2章 探究新语言，快速入门Kotlin编程" focus="Kotlin语义卡、空安全反例、Lambda与集合变换实验、Java互操作字节码记录" nodes={nodes} />; }
