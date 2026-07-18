import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "分词并形成语法结构",
  "编译器登记声明",
  "引擎执行赋值或取值",
  "当前作用域响应查询",
  "未命中时向外层查找",
  "按查询类型产生结果或错误",
] as const;

export function YdkScope01WhatIsScopeMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 1 章 作用域是什么"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkScope01WhatIsScopeExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 1 章 作用域是什么"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkScope01WhatIsScopeEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 1 章 作用域是什么"
      nodes={nodes}
      mode="evidence"
    />
  );
}
