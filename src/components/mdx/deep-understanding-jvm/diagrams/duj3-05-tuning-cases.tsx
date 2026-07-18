import { OfficialDuj3Lab } from "./official-duj3-lab";

const nodes = [
  "第5章 调优案例分析与实战",
  "5.1 概述",
  "5.2 案例分析",
  "5.2.1 大内存硬件上的程序部署策略",
  "5.2.2 集群间同步导致的内存溢出",
  "5.2.3 堆外内存导致的溢出错误",
  "5.2.4 外部命令导致系统缓慢",
  "5.2.5 服务器虚拟机进程崩溃",
  "5.2.6 不恰当数据结构导致内存占用过大",
  "5.2.7 由Windows虚拟内存导致的长时间停顿",
  "5.2.8 由安全点导致长时间停顿",
  "5.3 实战：Eclipse运行速度调优",
  "5.3.1 调优前的程序运行状态",
  "5.3.2 升级JDK版本的性能变化及兼容问题",
  "5.3.3 编译时间和类加载时间的优化",
  "5.3.4 调整内存设置控制垃圾收集频率",
  "5.3.5 选择收集器降低延迟",
  "5.4 本章小结"
];

export function Duj3StructureLab() {
  return <OfficialDuj3Lab mode="structure" unitTitle="第5章 调优案例分析与实战" focus="用多类真实案例练习从现象到证据，再以Eclipse案例建立版本、类加载、编译、内存和收集器的受控调优流程" nodes={nodes} />;
}

export function Duj3ExecutionLab() {
  return <OfficialDuj3Lab mode="execution" unitTitle="第5章 调优案例分析与实战" focus="选一个启动慢和一个稳态停顿问题，每轮只改变JDK、堆或收集器之一，并用相同脚本重复测量" nodes={nodes} />;
}

export function Duj3EvidenceLab() {
  return <OfficialDuj3Lab mode="evidence" unitTitle="第5章 调优案例分析与实战" focus="案例因果图、基线报告、单变量变更、兼容清单、收益与回滚阈值" nodes={nodes} />;
}
