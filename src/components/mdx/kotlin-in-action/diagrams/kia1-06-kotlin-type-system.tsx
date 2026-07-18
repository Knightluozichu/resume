import { OfficialKia1BookLab } from "./official-kia1-book-lab";

const nodes = [
  "第6章 Kotlin的类型系统",
  "6.1 可空性",
  "6.1.1 可空类型",
  "6.1.2 类型的含义",
  "6.1.3 安全调用运算符：?.",
  "6.1.4 Elvis运算符：?:",
  "6.1.5 安全转换：as?",
  "6.1.6 非空断言：!!",
  "6.1.7 let函数",
  "6.1.8 延迟初始化的属性",
  "6.1.9 可空类型的扩展",
  "6.1.10 类型参数的可空性",
  "6.1.11 可空性和Java",
  "6.2 基本数据类型和其他基本类型",
  "6.2.1 基本数据类型：Int、Boolean及其他",
  "6.2.2 可空的基本数据类型：Int?、Boolean?及其他",
  "6.2.3 数字转换",
  "6.2.4 Any和Any?：根类型",
  "6.2.5 Unit类型：Kotlin的void",
  "6.2.6 Nothing类型：这个函数永不返回",
  "6.3 集合与数组",
  "6.3.1 可空性和集合",
  "6.3.2 只读集合与可变集合",
  "6.3.3 Kotlin集合和Java",
  "6.3.4 作为平台类型的集合",
  "6.3.5 对象和基本数据类型的数组",
  "6.4 小结"
];

export function Kia1StructureLab() { return <OfficialKia1BookLab mode="structure" unitTitle="第6章 Kotlin的类型系统" focus="把可空性、基本类型、Any、Unit、Nothing、集合可变性、平台类型和数组连接成跨Java边界的类型证明" nodes={nodes} />; }
export function Kia1ExecutionLab() { return <OfficialKia1BookLab mode="execution" unitTitle="第6章 Kotlin的类型系统" focus="用非空断言掩盖未知空值，或把只读集合误当作不可变集合并信任未经标注的Java平台类型" nodes={nodes} />; }
export function Kia1EvidenceLab() { return <OfficialKia1BookLab mode="evidence" unitTitle="第6章 Kotlin的类型系统" focus="空值流图、平台类型审计、集合可变性合同、数字转换测试和数组装箱对照" nodes={nodes} />; }
