import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "锁定代码依赖的语言能力",
  "确认其规范阶段",
  "检查目标引擎支持",
  "转译语法差异",
  "补齐缺失运行时 API",
  "在真实目标环境验收",
] as const;

export function YdkEs601NowFutureMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 1 章 ES？现在与未来"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkEs601NowFutureExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 1 章 ES？现在与未来"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkEs601NowFutureEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 1 章 ES？现在与未来"
      nodes={nodes}
      mode="evidence"
    />
  );
}
