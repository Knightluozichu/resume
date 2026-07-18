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

export function Kia1StructureLab() { return <OfficialKia1BookLab mode="structure" unitTitle="《Kotlin实战》第1版权威学习地图" focus="沿2个分部、11章、3附录与索引参考建立Kotlin 1.0到Java互操作的完整依赖图" nodes={nodes} />; }
export function Kia1ExecutionLab() { return <OfficialKia1BookLab mode="execution" unitTitle="《Kotlin实战》第1版权威学习地图" focus="把2017年第1版与加入协程和Flow的第2版混成同一目录，或只保留八个主题概览" nodes={nodes} />; }
export function Kia1EvidenceLab() { return <OfficialKia1BookLab mode="evidence" unitTitle="《Kotlin实战》第1版权威学习地图" focus="17单元263节点矩阵、版本卡、章节依赖图、实验路线和第2版差异账本" nodes={nodes} />; }
