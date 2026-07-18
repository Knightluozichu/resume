import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "函数开始执行",
  "当前环境未命中名称",
  "检查调用者环境",
  "沿调用栈继续向上",
  "在最近动态绑定处停止",
  "与 JavaScript 词法结果对照",
] as const;

export function YdkScopeAppendixADynamicScopeMapLab() {
  return (
    <YdkjsMechanismLab
      title="附录 A 动态作用域"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkScopeAppendixADynamicScopeExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="附录 A 动态作用域"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkScopeAppendixADynamicScopeEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="附录 A 动态作用域"
      nodes={nodes}
      mode="evidence"
    />
  );
}
