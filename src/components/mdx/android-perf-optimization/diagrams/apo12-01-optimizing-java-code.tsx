import { OfficialApo12BookLab } from "./official-apo12-book-lab";

const nodes = [
  "第1章 Java代码优化",
  "1.1 Android如何执行代码",
  "1.2 优化斐波纳契数列",
  "1.2.1 从递归到迭代",
  "1.2.2 BigInteger",
  "1.3 缓存结果",
  "1.4 API等级",
  "1.5 数据结构",
  "1.6 响应能力",
  "1.6.1 推迟初始化",
  "1.6.2 StrictMode",
  "1.7 SQLite",
  "1.7.1 SQLite语句",
  "1.7.2 事务",
  "1.7.3 查询",
  "1.8 总结"
];

export function Apo12PipelineLab() { return <OfficialApo12BookLab mode="pipeline" unitTitle="第1章 Java代码优化" focus="从Dalvik执行、斐波纳契算法与缓存，扩展到API等级、数据结构、响应性、StrictMode和SQLite" nodes={nodes} />; }
export function Apo12ExperimentLab() { return <OfficialApo12BookLab mode="experiment" unitTitle="第1章 Java代码优化" focus="在没有等价性测试与基准的情况下微调语法，或用缓存换速度却不限制失效、容量和线程安全" nodes={nodes} />; }
export function Apo12EvidenceLab() { return <OfficialApo12BookLab mode="evidence" unitTitle="第1章 Java代码优化" focus="算法基线、缓存命中、API分支、主线程违规、SQLite事务与查询计划" nodes={nodes} />; }
