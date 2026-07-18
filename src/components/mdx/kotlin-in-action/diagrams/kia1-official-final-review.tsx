import { OfficialKia1BookLab } from "./official-kia1-book-lab";

const nodes = [
  "第1部分 Kotlin简介",
  "第1章 Kotlin：定义和目的",
  "第2章 Kotlin基础",
  "第3章 函数的定义与调用",
  "第4章 类、对象和接口",
  "第5章 Lambda编程",
  "第6章 Kotlin的类型系统",
  "第2部分 拥抱Kotlin",
  "第7章 运算符重载及其他约定",
  "第8章 高阶函数：Lambda作为形参和返回值",
  "第9章 泛型",
  "第10章 注解与反射",
  "第11章 DSL构建",
  "附录A 构建Kotlin项目",
  "附录B Kotlin代码的文档化",
  "附录C Kotlin生态系统",
  "索引与图表代码清单"
];

export function Kia1StructureLab() { return <OfficialKia1BookLab mode="structure" unitTitle="《Kotlin实战》第1版全书总复习" focus="从语法、类型、抽象、运行时与Java互操作五条链路回放全部正式节点并完成迁移判断" nodes={nodes} />; }
export function Kia1ExecutionLab() { return <OfficialKia1BookLab mode="execution" unitTitle="《Kotlin实战》第1版全书总复习" focus="只会复述语法而不能解释解析方式、运行时代价、Java边界、失败条件与API设计取舍" nodes={nodes} />; }
export function Kia1EvidenceLab() { return <OfficialKia1BookLab mode="evidence" unitTitle="《Kotlin实战》第1版全书总复习" focus="节点闭环表、跨章实现、反例集、Java双向调用、口述答辩和版本迁移报告" nodes={nodes} />; }
