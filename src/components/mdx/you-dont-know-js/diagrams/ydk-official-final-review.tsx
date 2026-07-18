import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "冻结源码与运行环境",
  "预测同步求值结果",
  "标注作用域与 this",
  "展开类型与原型步骤",
  "记录任务和微任务顺序",
  "核对规范版本并签发",
] as const;

export function YdkOfficialFinalReviewMapLab() {
  return (
    <YdkjsMechanismLab
      title="《你不知道的 JavaScript》全书总复习"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkOfficialFinalReviewExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="《你不知道的 JavaScript》全书总复习"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkOfficialFinalReviewEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="《你不知道的 JavaScript》全书总复习"
      nodes={nodes}
      mode="evidence"
    />
  );
}
