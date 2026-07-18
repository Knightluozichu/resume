import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "读取原书提案快照",
  "查询当前规范状态",
  "区分已标准化与已撤回能力",
  "用最终语法重写示例",
  "为撤回提案选择现代替代",
  "在目标引擎验证行为",
] as const;

export function YdkEs608BeyondEs6MapLab() {
  return (
    <YdkjsMechanismLab
      title="第 8 章 ES6 之后"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkEs608BeyondEs6ExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 8 章 ES6 之后"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkEs608BeyondEs6EvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 8 章 ES6 之后"
      nodes={nodes}
      mode="evidence"
    />
  );
}
