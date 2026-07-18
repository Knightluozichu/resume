import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "在外层作用域创建绑定",
  "定义引用该绑定的函数",
  "把函数传出原作用域",
  "外层调用栈结束",
  "函数再次执行并解析自由变量",
  "通过公开方法约束状态访问",
] as const;

export function YdkScope05ScopeClosuresMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 5 章 作用域闭包"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkScope05ScopeClosuresExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 5 章 作用域闭包"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkScope05ScopeClosuresEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 5 章 作用域闭包"
      nodes={nodes}
      mode="evidence"
    />
  );
}
