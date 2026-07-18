import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "用 let 与 const 建立块边界",
  "用解构声明数据形状",
  "用默认值处理 undefined",
  "用展开和剩余搬运序列",
  "用迭代协议遍历",
  "用 Symbol 建立非字符串键",
] as const;

export function YdkEs602SyntaxMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 2 章 语法"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkEs602SyntaxExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 2 章 语法"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkEs602SyntaxEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 2 章 语法"
      nodes={nodes}
      mode="evidence"
    />
  );
}
