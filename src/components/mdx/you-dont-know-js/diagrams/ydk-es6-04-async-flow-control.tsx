import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "生成器 yield 一个 Promise",
  "执行器等待其结算",
  "兑现值通过 next 回灌",
  "拒绝原因通过 throw 回灌",
  "生成器继续到下一暂停点",
  "done 后兑现总结果",
] as const;

export function YdkEs604AsyncFlowControlMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 4 章 异步流程控制"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkEs604AsyncFlowControlExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 4 章 异步流程控制"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkEs604AsyncFlowControlEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 4 章 异步流程控制"
      nodes={nodes}
      mode="evidence"
    />
  );
}
