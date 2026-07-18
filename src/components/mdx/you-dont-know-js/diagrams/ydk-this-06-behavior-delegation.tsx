import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "把状态放入任务对象",
  "把共享行为放入能力对象",
  "建立显式原型链接",
  "由接收对象发起调用",
  "沿链接寻找缺失行为",
  "以内省确认关系而非类名",
] as const;

export function YdkThis06BehaviorDelegationMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 6 章 行为委托"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkThis06BehaviorDelegationExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 6 章 行为委托"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkThis06BehaviorDelegationEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 6 章 行为委托"
      nodes={nodes}
      mode="evidence"
    />
  );
}
