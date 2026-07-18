import { DeepNodeOfficialLab } from "./official-deep-node-lab";

const chain = [
  "发起异步调用",
  "封装请求对象",
  "交给系统或线程池",
  "观察完成事件",
  "执行回调",
  "排空循环资源",
] as const;
const concepts = [
  "第3章 异步I/O",
  "3.1 为什么要异步I/O",
  "3.1.1 用户体验",
  "3.1.2 资源分配",
  "3.2 异步I/O实现现状",
  "3.2.1 异步I/O与非阻塞I/O",
  "3.2.2 理想的非阻塞异步I/O",
  "3.2.3 现实的异步I/O",
  "3.3 Node的异步I/O",
  "3.3.1 事件循环",
  "3.3.2 观察者",
  "3.3.3 请求对象",
  "3.3.4 执行回调",
  "3.3.5 小结",
  "3.4 非I/O的异步API",
  "3.4.1 定时器",
  "3.4.2 process.nextTick()",
  "3.4.3 setImmediate()",
  "3.5 事件驱动与高性能服务器",
  "3.6 总结",
  "3.7 参考资源",
] as const;

export function Dnj03AsyncIoMapLab() {
  return (
    <DeepNodeOfficialLab
      title="第 3 章 异步 I/O · 运行地图"
      label="Deep Node / Map"
      color="#7c3aed"
      soft="#ede9fe"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Dnj03AsyncIoExperimentLab() {
  return (
    <DeepNodeOfficialLab
      title="第 3 章 异步 I/O · 边界实验"
      label="Deep Node / Experiment"
      color="#7c3aed"
      soft="#ede9fe"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Dnj03AsyncIoEvidenceLab() {
  return (
    <DeepNodeOfficialLab
      title="第 3 章 异步 I/O · 关闭证据"
      label="Deep Node / Evidence"
      color="#7c3aed"
      soft="#ede9fe"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
