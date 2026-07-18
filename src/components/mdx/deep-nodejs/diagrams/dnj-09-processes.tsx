import { DeepNodeOfficialLab } from "./official-deep-node-lab";

const chain = [
  "选择服务模型",
  "派生Worker",
  "建立IPC",
  "传递监听句柄",
  "处理退出重启",
  "验证负载与状态",
] as const;
const concepts = [
  "第9章 玩转进程",
  "9.1 服务模型的变迁",
  "9.1.1 石器时代：同步",
  "9.1.2 青铜时代：复制进程",
  "9.1.3 白银时代：多线程",
  "9.1.4 黄金时代：事件驱动",
  "9.2 多进程架构",
  "9.2.1 创建子进程",
  "9.2.2 进程间通信",
  "9.2.3 句柄传递",
  "9.2.4 小结",
  "9.3 集群稳定之路",
  "9.3.1 进程事件",
  "9.3.2 自动重启",
  "9.3.3 负载均衡",
  "9.3.4 状态共享",
  "9.4 cluster模块",
  "9.4.1 cluster工作原理",
  "9.4.2 cluster事件",
  "9.5 总结",
  "9.6 参考资源",
] as const;

export function Dnj09ProcessesMapLab() {
  return (
    <DeepNodeOfficialLab
      title="第 9 章 玩转进程 · 运行地图"
      label="Deep Node / Map"
      color="#334155"
      soft="#e2e8f0"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Dnj09ProcessesExperimentLab() {
  return (
    <DeepNodeOfficialLab
      title="第 9 章 玩转进程 · 边界实验"
      label="Deep Node / Experiment"
      color="#334155"
      soft="#e2e8f0"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Dnj09ProcessesEvidenceLab() {
  return (
    <DeepNodeOfficialLab
      title="第 9 章 玩转进程 · 关闭证据"
      label="Deep Node / Evidence"
      color="#334155"
      soft="#e2e8f0"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
