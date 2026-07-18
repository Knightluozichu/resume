import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "确定值的实际类型",
  "区分容器与原始值",
  "检查数字特殊值",
  "判断复制的是值还是引用",
  "执行变更并观察别名",
  "用专用 API 验证边界",
] as const;

export function YdkTypes02ValuesMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 2 章 值"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkTypes02ValuesExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 2 章 值"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkTypes02ValuesEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 2 章 值"
      nodes={nodes}
      mode="evidence"
    />
  );
}
