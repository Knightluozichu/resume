import { OfficialDuj3Lab } from "./official-duj3-lab";

const nodes = [
  "第11章 后端编译与优化",
  "11.1 概述",
  "11.2 即时编译器",
  "11.2.1 解释器与编译器",
  "11.2.2 编译对象与触发条件",
  "11.2.3 编译过程",
  "11.2.4 实战：查看及分析即时编译结果",
  "11.3 提前编译器",
  "11.3.1 提前编译的优劣得失",
  "11.3.2 实战：Jaotc的提前编译",
  "11.4 编译器优化技术",
  "11.4.1 优化技术概览",
  "11.4.2 方法内联",
  "11.4.3 逃逸分析",
  "11.4.4 公共子表达式消除",
  "11.4.5 数组边界检查消除",
  "11.5 实战：深入理解Graal编译器",
  "11.5.1 历史背景",
  "11.5.2 构建编译调试环境",
  "11.5.3 JVMCI编译器接口",
  "11.5.4 代码中间表示",
  "11.5.5 代码优化与生成",
  "11.6 本章小结"
];

export function Duj3StructureLab() {
  return <OfficialDuj3Lab mode="structure" unitTitle="第11章 后端编译与优化" focus="比较解释、JIT与AOT，理解编译触发、内联、逃逸分析和Graal IR，并识别投机优化与去优化" nodes={nodes} />;
}

export function Duj3ExecutionLab() {
  return <OfficialDuj3Lab mode="execution" unitTitle="第11章 后端编译与优化" focus="用可靠基准固定工作量，观察热点从解释到编译、内联失败再到类型假设失效后的去优化" nodes={nodes} />;
}

export function Duj3EvidenceLab() {
  return <OfficialDuj3Lab mode="evidence" unitTitle="第11章 后端编译与优化" focus="编译事件时间线、内联决策、逃逸证据、IR演化、去优化反例与版本账本" nodes={nodes} />;
}
