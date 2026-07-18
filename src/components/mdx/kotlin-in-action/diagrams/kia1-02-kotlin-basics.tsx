import { OfficialKia1BookLab } from "./official-kia1-book-lab";

const nodes = [
  "第2章 Kotlin基础",
  "2.1 基本要素：函数和变量",
  "2.1.1 Hello, world!",
  "2.1.2 函数",
  "2.1.3 变量",
  "2.1.4 更简单的字符串格式化：字符串模板",
  "2.2 类和属性",
  "2.2.1 属性",
  "2.2.2 自定义访问器",
  "2.2.3 Kotlin源码布局：目录和包",
  "2.3 表示和处理选择：枚举和when",
  "2.3.1 声明枚举类",
  "2.3.2 使用when处理枚举类",
  "2.3.3 在when结构中使用任意对象",
  "2.3.4 使用不带参数的when",
  "2.3.5 智能转换：合并类型检查和转换",
  "2.3.6 重构：用when代替if",
  "2.3.7 代码块作为if和when的分支",
  "2.4 迭代事物：while循环和for循环",
  "2.4.1 while循环",
  "2.4.2 迭代数字：区间和数列",
  "2.4.3 迭代map",
  "2.4.4 使用in检查集合和区间的成员",
  "2.5 Kotlin中的异常",
  "2.5.1 try、catch和finally",
  "2.5.2 try作为表达式",
  "2.6 小结"
];

export function Kia1StructureLab() { return <OfficialKia1BookLab mode="structure" unitTitle="第2章 Kotlin基础" focus="用表达式、变量、属性、when、区间、循环和异常建立Kotlin控制流与数据模型" nodes={nodes} />; }
export function Kia1ExecutionLab() { return <OfficialKia1BookLab mode="execution" unitTitle="第2章 Kotlin基础" focus="机械照搬Java语句思维，忽略Kotlin中if、when和try可产生值以及属性不等于字段" nodes={nodes} />; }
export function Kia1EvidenceLab() { return <OfficialKia1BookLab mode="evidence" unitTitle="第2章 Kotlin基础" focus="表达式求值轨迹、属性访问器、when穷尽表、区间边界测试和异常路径" nodes={nodes} />; }
