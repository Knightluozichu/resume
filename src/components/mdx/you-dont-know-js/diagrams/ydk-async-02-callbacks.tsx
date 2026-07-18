import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "拆出当前步骤的延续",
  "把回调交给外部组件",
  "外部组件控制调用时机",
  "回调恢复局部流程",
  "校验次数参数和错误",
  "把不可控边界包装成契约",
] as const;

export function YdkAsync02CallbacksMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 2 章 回调"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkAsync02CallbacksExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 2 章 回调"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkAsync02CallbacksEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 2 章 回调"
      nodes={nodes}
      mode="evidence"
    />
  );
}
