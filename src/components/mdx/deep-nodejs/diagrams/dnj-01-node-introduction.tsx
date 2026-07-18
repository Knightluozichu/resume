import { DeepNodeOfficialLab } from "./official-deep-node-lab";

const chain = [
  "定位运行边界",
  "辨认事件模型",
  "拆分I/O与计算",
  "评估单线程风险",
  "选择应用场景",
  "建立版本账本",
] as const;
const concepts = [
  "第1章 Node简介",
  "1.1 Node的诞生历程",
  "1.2 Node的命名与起源",
  "1.2.1 为什么是JavaScript",
  "1.2.2 为什么叫Node",
  "1.3 Node给JavaScript带来的意义",
  "1.4 Node的特点",
  "1.4.1 异步I/O",
  "1.4.2 事件与回调函数",
  "1.4.3 单线程",
  "1.4.4 跨平台",
  "1.5 Node的应用场景",
  "1.5.1 I/O密集型",
  "1.5.2 是否不擅长CPU密集型业务",
  "1.5.3 与遗留系统和平共处",
  "1.5.4 分布式应用",
  "1.6 Node的使用者",
  "1.7 参考资源",
] as const;

export function Dnj01NodeIntroductionMapLab() {
  return (
    <DeepNodeOfficialLab
      title="第 1 章 Node 简介 · 运行地图"
      label="Deep Node / Map"
      color="#1d4ed8"
      soft="#dbeafe"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Dnj01NodeIntroductionExperimentLab() {
  return (
    <DeepNodeOfficialLab
      title="第 1 章 Node 简介 · 边界实验"
      label="Deep Node / Experiment"
      color="#1d4ed8"
      soft="#dbeafe"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Dnj01NodeIntroductionEvidenceLab() {
  return (
    <DeepNodeOfficialLab
      title="第 1 章 Node 简介 · 关闭证据"
      label="Deep Node / Evidence"
      color="#1d4ed8"
      soft="#dbeafe"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
