import { OfficialKia1BookLab } from "./official-kia1-book-lab";

const nodes = [
  "第7章 运算符重载及其他约定",
  "7.1 重载算术运算符",
  "7.1.1 重载二元算术运算",
  "7.1.2 重载复合赋值运算符",
  "7.1.3 重载一元运算符",
  "7.2 重载比较运算符",
  "7.2.1 等号运算符：equals",
  "7.2.2 排序运算符：compareTo",
  "7.3 集合与区间的约定",
  "7.3.1 通过下标来访问元素：get和set",
  "7.3.2 in的约定",
  "7.3.3 rangeTo的约定",
  "7.3.4 在for循环中使用iterator的约定",
  "7.4 解构声明和组件函数",
  "7.4.1 解构声明和循环",
  "7.5 重用属性访问的逻辑：委托属性",
  "7.5.1 委托属性的基本操作",
  "7.5.2 使用委托属性：惰性初始化和by lazy()",
  "7.5.3 实现委托属性",
  "7.5.4 委托属性的变换规则",
  "7.5.5 在map中保存属性值",
  "7.5.6 框架中的委托属性",
  "7.6 小结"
];

export function Kia1StructureLab() { return <OfficialKia1BookLab mode="structure" unitTitle="第7章 运算符重载及其他约定" focus="把运算符、比较、集合访问、区间、迭代、解构和委托属性还原为具名约定与可验证调用" nodes={nodes} />; }
export function Kia1ExecutionLab() { return <OfficialKia1BookLab mode="execution" unitTitle="第7章 运算符重载及其他约定" focus="重载出违背直觉的运算符，或忽略equals/hashCode一致性、委托所有者和属性元数据" nodes={nodes} />; }
export function Kia1EvidenceLab() { return <OfficialKia1BookLab mode="evidence" unitTitle="第7章 运算符重载及其他约定" focus="语法到函数映射、相等性合同、区间边界、解构顺序和委托get/set轨迹" nodes={nodes} />; }
