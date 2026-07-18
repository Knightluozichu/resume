import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "先解释标识符查找",
  "再解释调用上下文",
  "再解释值与转换",
  "再解释时间与并发",
  "再解释新语法和新 API",
  "用同一段程序贯通六册",
] as const;

export function YdkUp03IntoYdkjsMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 3 章 深入 YDKJS"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkUp03IntoYdkjsExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 3 章 深入 YDKJS"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkUp03IntoYdkjsEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 3 章 深入 YDKJS"
      nodes={nodes}
      mode="evidence"
    />
  );
}
