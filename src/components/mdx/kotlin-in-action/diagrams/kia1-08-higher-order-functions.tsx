import { OfficialKia1BookLab } from "./official-kia1-book-lab";

const nodes = [
  "第8章 高阶函数：Lambda作为形参和返回值",
  "8.1 声明高阶函数",
  "8.1.1 函数类型",
  "8.1.2 调用作为参数的函数",
  "8.1.3 在Java中使用函数类",
  "8.1.4 函数类型的参数默认值和null值",
  "8.1.5 返回函数的函数",
  "8.1.6 通过lambda去除重复代码",
  "8.2 内联函数：消除lambda带来的运行时开销",
  "8.2.1 内联函数如何运作",
  "8.2.2 内联函数的限制",
  "8.2.3 内联集合操作",
  "8.2.4 决定何时将函数声明成内联",
  "8.2.5 使用内联lambda管理资源",
  "8.3 高阶函数中的控制流",
  "8.3.1 lambda中的返回语句：从一个封闭的函数返回",
  "8.3.2 从lambda返回：使用标签返回",
  "8.3.3 匿名函数：默认使用局部返回",
  "8.4 小结"
];

export function Kia1StructureLab() { return <OfficialKia1BookLab mode="structure" unitTitle="第8章 高阶函数：Lambda作为形参和返回值" focus="从函数类型、Java调用、返回函数、内联代价和lambda控制流建立高阶函数的源码与运行时模型" nodes={nodes} />; }
export function Kia1ExecutionLab() { return <OfficialKia1BookLab mode="execution" unitTitle="第8章 高阶函数：Lambda作为形参和返回值" focus="把inline当作无条件优化，忽略代码膨胀、可内联限制、非局部返回和资源释放合同" nodes={nodes} />; }
export function Kia1EvidenceLab() { return <OfficialKia1BookLab mode="evidence" unitTitle="第8章 高阶函数：Lambda作为形参和返回值" focus="函数类型签名、对象分配对照、内联字节码、资源关闭测试和返回路径图" nodes={nodes} />; }
