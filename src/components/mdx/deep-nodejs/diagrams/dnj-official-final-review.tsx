import { DeepNodeOfficialLab } from "./official-deep-node-lab";

const chain = [
  "固定版本与模块图",
  "接收字节与请求",
  "调度异步业务",
  "跨进程完成响应",
  "验证测试与监控",
  "排空资源并回滚演练",
] as const;
const concepts = [
  "第1章 Node简介",
  "第2章 模块机制",
  "第3章 异步I/O",
  "第4章 异步编程",
  "第5章 内存控制",
  "第6章 理解Buffer",
  "第7章 网络编程",
  "第8章 构建Web应用",
  "第9章 玩转进程",
  "第10章 测试",
  "第11章 产品化",
  "附录A 安装Node",
  "附录B 调试Node",
  "附录C Node编码规范",
  "附录D 搭建局域npm仓库",
] as const;

export function DnjOfficialFinalReviewMapLab() {
  return (
    <DeepNodeOfficialLab
      title="《深入浅出 Node.js》全书总复习 · 运行地图"
      label="Deep Node / Map"
      color="#0f766e"
      soft="#ccfbf1"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function DnjOfficialFinalReviewExperimentLab() {
  return (
    <DeepNodeOfficialLab
      title="《深入浅出 Node.js》全书总复习 · 边界实验"
      label="Deep Node / Experiment"
      color="#0f766e"
      soft="#ccfbf1"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function DnjOfficialFinalReviewEvidenceLab() {
  return (
    <DeepNodeOfficialLab
      title="《深入浅出 Node.js》全书总复习 · 关闭证据"
      label="Deep Node / Evidence"
      color="#0f766e"
      soft="#ccfbf1"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
