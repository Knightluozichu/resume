import { JfsBookLab } from "./official-jfs-lab";

const nodes = [
  "宿主创建事件",
  "沿祖先执行捕获",
  "到达目标节点",
  "沿祖先执行冒泡",
  "决定默认动作",
  "解除监听并释放引用",
] as const;

export function Jfs09FrontendEventsMapLab() {
  return (
    <JfsBookLab
      title="第 9 章 前端事件处理 · 机制地图"
      label="JavaScript 全栈开发 · 浏览器端"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Jfs09FrontendEventsExperimentLab() {
  return (
    <JfsBookLab
      title="第 9 章 前端事件处理 · 边界实验"
      label="JavaScript 全栈开发 · 浏览器端"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Jfs09FrontendEventsEvidenceLab() {
  return (
    <JfsBookLab
      title="第 9 章 前端事件处理 · 恢复证据"
      label="JavaScript 全栈开发 · 浏览器端"
      nodes={nodes}
      mode="evidence"
    />
  );
}
