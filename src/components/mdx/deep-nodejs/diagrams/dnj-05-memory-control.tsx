import { DeepNodeOfficialLab } from "./official-deep-node-lab";

const chain = [
  "记录内存基线",
  "区分堆内堆外",
  "触发固定负载",
  "定位保留路径",
  "修复所有权",
  "回放并观察回落",
] as const;
const concepts = [
  "第5章 内存控制",
  "5.1 V8的垃圾回收机制与内存限制",
  "5.1.1 Node与V8",
  "5.1.2 V8的内存限制",
  "5.1.3 V8的对象分配",
  "5.1.4 V8的垃圾回收机制",
  "5.1.5 查看垃圾回收日志",
  "5.2 高效使用内存",
  "5.2.1 作用域",
  "5.2.2 闭包",
  "5.2.3 小结",
  "5.3 内存指标",
  "5.3.1 查看内存使用情况",
  "5.3.2 堆外内存",
  "5.3.3 小结",
  "5.4 内存泄漏",
  "5.4.1 慎将内存当做缓存",
  "5.4.2 关注队列状态",
  "5.5 内存泄漏排查",
  "5.5.1 node-heapdump",
  "5.5.2 node-memwatch",
  "5.5.3 小结",
  "5.6 大内存应用",
  "5.7 总结",
  "5.8 参考资源",
] as const;

export function Dnj05MemoryControlMapLab() {
  return (
    <DeepNodeOfficialLab
      title="第 5 章 内存控制 · 运行地图"
      label="Deep Node / Map"
      color="#047857"
      soft="#d1fae5"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Dnj05MemoryControlExperimentLab() {
  return (
    <DeepNodeOfficialLab
      title="第 5 章 内存控制 · 边界实验"
      label="Deep Node / Experiment"
      color="#047857"
      soft="#d1fae5"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Dnj05MemoryControlEvidenceLab() {
  return (
    <DeepNodeOfficialLab
      title="第 5 章 内存控制 · 关闭证据"
      label="Deep Node / Evidence"
      color="#047857"
      soft="#d1fae5"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
