import { OfficialApo12BookLab } from "./official-apo12-book-lab";

const nodes = [
  "第4章 高效使用内存",
  "4.1 说说内存",
  "4.2 数据类型",
  "4.2.1 值的比较",
  "4.2.2 其他算法",
  "4.2.3 数组排序",
  "4.2.4 定义自己的类",
  "4.3 访问内存",
  "4.4 排布数据",
  "4.5 垃圾收集",
  "4.5.1 内存泄漏",
  "4.5.2 引用",
  "4.6 API",
  "4.7 内存少的时候",
  "4.8 总结"
];

export function Apo12PipelineLab() { return <OfficialApo12BookLab mode="pipeline" unitTitle="第4章 高效使用内存" focus="从设备内存约束、数据类型与比较、内存访问和数据布局，推导GC、泄漏、引用、低内存回调与API选择" nodes={nodes} />; }
export function Apo12ExperimentLab() { return <OfficialApo12BookLab mode="experiment" unitTitle="第4章 高效使用内存" focus="只看峰值堆大小，不测分配速率、局部性、GC停顿和生命周期引用，或用弱引用掩盖所有权错误" nodes={nodes} />; }
export function Apo12EvidenceLab() { return <OfficialApo12BookLab mode="evidence" unitTitle="第4章 高效使用内存" focus="堆基线、对象与数组尺寸、访问局部性、GC停顿、引用链、低内存回调和恢复断言" nodes={nodes} />; }
