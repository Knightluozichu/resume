import { OfficialDuj3Lab } from "./official-duj3-lab";

const nodes = [
  "第一部分 走近Java",
  "第1章 走近Java",
  "第二部分 自动内存管理",
  "第2章 Java内存区域与内存溢出异常",
  "第3章 垃圾收集器与内存分配策略",
  "第4章 虚拟机性能监控、故障处理工具",
  "第5章 调优案例分析与实战",
  "第三部分 虚拟机执行子系统",
  "第6章 类文件结构",
  "第7章 虚拟机类加载机制",
  "第8章 虚拟机字节码执行引擎",
  "第9章 类加载及执行子系统的案例与实战",
  "第四部分 程序编译与代码优化",
  "第10章 前端编译与优化",
  "第11章 后端编译与优化",
  "第五部分 高效并发",
  "第12章 Java内存模型与线程",
  "第13章 线程安全与锁优化",
  "附录A 在Windows系统下编译OpenJDK 6",
  "附录B 展望Java技术的未来（2013年版）",
  "附录C 虚拟机字节码指令表",
  "附录D 对象查询语言（OQL）简介",
  "附录E JDK历史版本轨迹"
];

export function Duj3StructureLab() {
  return <OfficialDuj3Lab mode="structure" unitTitle="《深入理解Java虚拟机（第3版）》权威学习地图" focus="沿5个部分、13章和附录A-E建立从JVM历史、内存、执行、编译到并发的完整学习与证据路径" nodes={nodes} />;
}

export function Duj3ExecutionLab() {
  return <OfficialDuj3Lab mode="execution" unitTitle="《深入理解Java虚拟机（第3版）》权威学习地图" focus="从OOM、类冲突、启动慢和数据竞争四个症状分别选择最短章节路径，并声明每步停止条件" nodes={nodes} />;
}

export function Duj3EvidenceLab() {
  return <OfficialDuj3Lab mode="evidence" unitTitle="《深入理解Java虚拟机（第3版）》权威学习地图" focus="282节点覆盖矩阵、章节依赖图、版本边界账本和全书实验清单" nodes={nodes} />;
}
