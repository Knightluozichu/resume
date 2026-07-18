import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "创建值与变量绑定",
  "把函数作为值传递",
  "依据调用点建立 this",
  "沿原型链复用行为",
  "用严格模式收紧错误",
  "区分语言能力与宿主能力",
] as const;

export function YdkUp02IntoJavascriptMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 2 章 深入 JavaScript"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkUp02IntoJavascriptExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 2 章 深入 JavaScript"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkUp02IntoJavascriptEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 2 章 深入 JavaScript"
      nodes={nodes}
      mode="evidence"
    />
  );
}
