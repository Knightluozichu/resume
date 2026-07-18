import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "取得原始值",
  "属性访问触发临时装箱",
  "在原型上解析方法",
  "以原始值作为接收者执行",
  "需要时通过 valueOf 拆箱",
  "避免长期保存包装对象",
] as const;

export function YdkTypes03NativesMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 3 章 原生函数"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkTypes03NativesExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 3 章 原生函数"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkTypes03NativesEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 3 章 原生函数"
      nodes={nodes}
      mode="evidence"
    />
  );
}
