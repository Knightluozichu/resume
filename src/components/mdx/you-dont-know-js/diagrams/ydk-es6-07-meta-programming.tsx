import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "选择要观察的语言操作",
  "创建目标对象与处理器",
  "Proxy 拦截对应内部方法",
  "用 Reflect 保留默认语义",
  "维护代理不变量",
  "用特性检测和撤销路径验收",
] as const;

export function YdkEs607MetaProgrammingMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 7 章 元编程"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkEs607MetaProgrammingExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 7 章 元编程"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkEs607MetaProgrammingEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 7 章 元编程"
      nodes={nodes}
      mode="evidence"
    />
  );
}
