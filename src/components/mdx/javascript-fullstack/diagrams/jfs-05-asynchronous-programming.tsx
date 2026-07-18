import { JfsBookLab } from "./official-jfs-lab";

const nodes = [
  "提交异步操作",
  "让出当前调用栈",
  "宿主完成外部工作",
  "排队回调或反应",
  "恢复并传播结果",
  "取消或清理剩余任务",
] as const;

export function Jfs05AsynchronousProgrammingMapLab() {
  return (
    <JfsBookLab
      title="第 5 章 异步编程 · 机制地图"
      label="JavaScript 全栈开发 · 语言核心"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Jfs05AsynchronousProgrammingExperimentLab() {
  return (
    <JfsBookLab
      title="第 5 章 异步编程 · 边界实验"
      label="JavaScript 全栈开发 · 语言核心"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Jfs05AsynchronousProgrammingEvidenceLab() {
  return (
    <JfsBookLab
      title="第 5 章 异步编程 · 恢复证据"
      label="JavaScript 全栈开发 · 语言核心"
      nodes={nodes}
      mode="evidence"
    />
  );
}
