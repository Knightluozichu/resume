import { OfficialGchBookLab } from "./official-gch-book-lab";

const nodes = [
  "第1章 引言",
  "1.1 显式释放",
  "1.2 自动动态内存管理",
  "1.3 比较垃圾回收算法",
  "安全性",
  "吞吐量",
  "完整性与及时性",
  "停顿时间",
  "空间开销",
  "针对特定语言的优化",
  "可伸缩性与可移植性",
  "1.4 性能劣势？",
  "1.5 实验方法",
  "1.6 术语与记号",
  "堆",
  "变异器与回收器",
  "变异器根",
  "引用、字段与地址",
  "活性、正确性与可达性",
  "伪代码",
  "分配器",
  "变异器读写操作",
  "原子操作",
  "集合、多重集、序列与元组"
];

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="第1章 引言" focus="建立显式释放与自动内存管理的共同评价框架，区分安全性、完整性、及时性、吞吐、停顿、空间和可移植性" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="第1章 引言" focus="给同一工作负载分别配置显式释放、追踪回收和引用计数模型，记录错误面、时间、峰值空间与尾延迟" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="第1章 引言" focus="对象图与根集合标注、指标口径表、实验方法卡、术语与记号对照" nodes={nodes} />; }
