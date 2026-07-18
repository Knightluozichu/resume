import { OfficialDuj3Lab } from "./official-duj3-lab";

const nodes = [
  "第二部分 自动内存管理"
];

export function Duj3StructureLab() {
  return <OfficialDuj3Lab mode="structure" unitTitle="第二部分 自动内存管理" focus="把运行时数据区、对象生命周期、收集器、诊断工具和调优案例串成内存问题的因果链" nodes={nodes} />;
}

export function Duj3ExecutionLab() {
  return <OfficialDuj3Lab mode="execution" unitTitle="第二部分 自动内存管理" focus="制造堆、栈、元空间与直接内存四类不同压力，比较错误、日志、转储和恢复方式" nodes={nodes} />;
}

export function Duj3EvidenceLab() {
  return <OfficialDuj3Lab mode="evidence" unitTitle="第二部分 自动内存管理" focus="内存区域地图、对象生命周期、GC证据矩阵、采集风险预算" nodes={nodes} />;
}
