import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "定义可复用函数",
  "找到实际调用表达式",
  "识别调用形式",
  "按规则建立 this",
  "函数体读取接收者状态",
  "返回后撤销本次绑定",
] as const;

export function YdkThis01ThisOrThatMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 1 章 关于 this"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkThis01ThisOrThatExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 1 章 关于 this"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkThis01ThisOrThatEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 1 章 关于 this"
      nodes={nodes}
      mode="evidence"
    />
  );
}
