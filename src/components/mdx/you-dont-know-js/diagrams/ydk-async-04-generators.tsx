import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "调用生成器取得迭代器",
  "next 恢复到下一个 yield",
  "yield 暂停并向外给值",
  "调用者等待异步结果",
  "next 或 throw 把结果送回",
  "done 为真时完成",
] as const;

export function YdkAsync04GeneratorsMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 4 章 生成器"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkAsync04GeneratorsExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 4 章 生成器"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkAsync04GeneratorsEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 4 章 生成器"
      nodes={nodes}
      mode="evidence"
    />
  );
}
