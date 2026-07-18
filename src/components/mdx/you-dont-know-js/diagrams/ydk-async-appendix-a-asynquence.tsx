import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "创建异步序列",
  "追加顺序步骤",
  "用 gate 并行分支",
  "聚合分支结果",
  "统一进入错误通道",
  "与原生 Promise 组合对照",
] as const;

export function YdkAsyncAppendixAAsynquenceMapLab() {
  return (
    <YdkjsMechanismLab
      title="附录 A asynquence 库"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkAsyncAppendixAAsynquenceExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="附录 A asynquence 库"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkAsyncAppendixAAsynquenceEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="附录 A asynquence 库"
      nodes={nodes}
      mode="evidence"
    />
  );
}
