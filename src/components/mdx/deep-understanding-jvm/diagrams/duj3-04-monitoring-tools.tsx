import { OfficialDuj3Lab } from "./official-duj3-lab";

const nodes = [
  "第4章 虚拟机性能监控、故障处理工具",
  "4.1 概述",
  "4.2 基础故障处理工具",
  "4.2.1 jps：虚拟机进程状况工具",
  "4.2.2 jstat：虚拟机统计信息监视工具",
  "4.2.3 jinfo：Java配置信息工具",
  "4.2.4 jmap：Java内存映像工具",
  "4.2.5 jhat：虚拟机堆转储快照分析工具",
  "4.2.6 jstack：Java堆栈跟踪工具",
  "4.2.7 基础工具总结",
  "4.3 可视化故障处理工具",
  "4.3.1 JHSDB：基于服务性代理的调试工具",
  "4.3.2 JConsole：Java监视与管理控制台",
  "4.3.3 VisualVM：多合一故障处理工具",
  "4.3.4 Java Mission Control：可持续在线的监控工具",
  "4.4 HotSpot虚拟机插件及工具",
  "4.5 本章小结"
];

export function Duj3StructureLab() {
  return <OfficialDuj3Lab mode="structure" unitTitle="第4章 虚拟机性能监控、故障处理工具" focus="按问题选择jps、jstat、jinfo、jmap、jstack、JHSDB、JConsole、VisualVM、JFR与JMC，并记录探针效应" nodes={nodes} />;
}

export function Duj3ExecutionLab() {
  return <OfficialDuj3Lab mode="execution" unitTitle="第4章 虚拟机性能监控、故障处理工具" focus="针对同一延迟症状先用低扰动统计，再逐级采集线程和飞行记录，比较每步新增的判别信息" nodes={nodes} />;
}

export function Duj3EvidenceLab() {
  return <OfficialDuj3Lab mode="evidence" unitTitle="第4章 虚拟机性能监控、故障处理工具" focus="工具选择矩阵、命令与版本、原始输出、采集开销、敏感数据处置记录" nodes={nodes} />;
}
