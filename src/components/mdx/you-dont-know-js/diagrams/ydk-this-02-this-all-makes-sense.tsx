import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "定位调用点",
  "先检查 new 调用",
  "再检查 call、apply 或 bind",
  "再检查对象成员调用",
  "否则应用默认绑定",
  "最后核对箭头与软绑定例外",
] as const;

export function YdkThis02ThisAllMakesSenseMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 2 章 this 全面解析"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkThis02ThisAllMakesSenseExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 2 章 this 全面解析"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkThis02ThisAllMakesSenseEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 2 章 this 全面解析"
      nodes={nodes}
      mode="evidence"
    />
  );
}
