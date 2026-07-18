import { OfficialApo12BookLab } from "./official-apo12-book-lab";

const nodes = [
  "第3章 NDK进阶",
  "3.1 汇编",
  "3.1.1 最大公约数",
  "3.1.2 色彩转换",
  "3.1.3 并行计算平均值",
  "3.1.4 ARM指令",
  "3.1.5 ARM NEON",
  "3.1.6 CPU特性",
  "3.2 C扩展",
  "3.2.1 内置函数",
  "3.2.2 向量指令",
  "3.3 技巧",
  "3.3.1 内联函数",
  "3.3.2 循环展开",
  "3.3.3 内存预读取",
  "3.3.4 用LDM/STM替换LDR/STR",
  "3.4 总结"
];

export function Apo12PipelineLab() { return <OfficialApo12BookLab mode="pipeline" unitTitle="第3章 NDK进阶" focus="用汇编、ARM/NEON、CPU特性、C扩展、向量指令、内联、循环展开、预取与批量访存验证热点优化" nodes={nodes} />; }
export function Apo12ExperimentLab() { return <OfficialApo12BookLab mode="experiment" unitTitle="第3章 NDK进阶" focus="为单一ARM设备写死NEON或汇编路径，未验证数值等价、内存对齐、尾部元素与非支持CPU回退" nodes={nodes} />; }
export function Apo12EvidenceLab() { return <OfficialApo12BookLab mode="evidence" unitTitle="第3章 NDK进阶" focus="CPU特性探测、标量与SIMD结果、反汇编、对齐测试、循环基准和跨设备回退" nodes={nodes} />; }
