import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "识别应隐藏的实现",
  "用函数建立私有边界",
  "把函数声明转为表达式",
  "用块缩短临时值生命周期",
  "检查遮蔽与冲突",
  "只暴露必要能力",
] as const;

export function YdkScope03FunctionVsBlockScopeMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 3 章 函数作用域和块作用域"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkScope03FunctionVsBlockScopeExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 3 章 函数作用域和块作用域"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkScope03FunctionVsBlockScopeEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 3 章 函数作用域和块作用域"
      nodes={nodes}
      mode="evidence"
    />
  );
}
