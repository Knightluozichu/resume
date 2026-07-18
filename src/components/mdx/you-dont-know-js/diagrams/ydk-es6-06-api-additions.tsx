import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "识别旧写法的语义缺口",
  "选择对应新增 API",
  "检查可迭代或类数组输入",
  "验证浅复制和属性顺序",
  "验证 NaN 与整数边界",
  "用 Unicode 样本回归",
] as const;

export function YdkEs606ApiAdditionsMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 6 章 新增 API"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkEs606ApiAdditionsExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 6 章 新增 API"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkEs606ApiAdditionsEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 6 章 新增 API"
      nodes={nodes}
      mode="evidence"
    />
  );
}
