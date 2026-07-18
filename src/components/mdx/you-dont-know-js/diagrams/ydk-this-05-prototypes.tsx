import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "从接收对象查找属性",
  "未命中时读取原型链接",
  "沿链逐级委托",
  "遇到首个命中返回",
  "写入时判断遮蔽规则",
  "抵达 null 时结束",
] as const;

export function YdkThis05PrototypesMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 5 章 原型"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkThis05PrototypesExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 5 章 原型"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkThis05PrototypesEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 5 章 原型"
      nodes={nodes}
      mode="evidence"
    />
  );
}
