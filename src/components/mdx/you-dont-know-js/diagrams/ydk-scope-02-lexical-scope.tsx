import { YdkjsMechanismLab } from "./official-ydkjs-lab";

const nodes = [
  "按源码位置创建作用域",
  "为每层登记标识符",
  "从内向外解析引用",
  "在首个命中处停止",
  "识别运行时作弊入口",
  "禁用作弊并恢复可分析性",
] as const;

export function YdkScope02LexicalScopeMapLab() {
  return (
    <YdkjsMechanismLab
      title="第 2 章 词法作用域"
      label="你不知道的 JavaScript · 一版"
      nodes={nodes}
      mode="map"
    />
  );
}

export function YdkScope02LexicalScopeExperimentLab() {
  return (
    <YdkjsMechanismLab
      title="正常、边界、失败与恢复样本"
      label="第 2 章 词法作用域"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function YdkScope02LexicalScopeEvidenceLab() {
  return (
    <YdkjsMechanismLab
      title="作用域、值、调用与时间证据"
      label="第 2 章 词法作用域"
      nodes={nodes}
      mode="evidence"
    />
  );
}
