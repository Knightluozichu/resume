import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "把源码解析为语法结构",
  "按优先级建立表达式树",
  "在受限产生式处理换行",
  "执行语句并产生完成记录",
  "进入 finally 修改完成记录",
  "由外层控制流消费结果",
] as const;

export function YdkTypes05GrammarMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 5 章 语法"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkTypes05GrammarExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 5 章 语法"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkTypes05GrammarEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 5 章 语法"
      nodes={nodes}
      mode="evidence"
    />
  );
}
