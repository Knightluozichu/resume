import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "明确输入与目标",
  "把数据表示为值",
  "用表达式计算中间结果",
  "用分支处理不同情况",
  "用循环处理重复工作",
  "用函数封装并测试契约",
] as const;

export function YdkUp01IntoProgrammingMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 1 章 深入编程"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkUp01IntoProgrammingExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 1 章 深入编程"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkUp01IntoProgrammingEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 1 章 深入编程"
      nodes={nodes}
      mode="evidence"
    />
  );
}
