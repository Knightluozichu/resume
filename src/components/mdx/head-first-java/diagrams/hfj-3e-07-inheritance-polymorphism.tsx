import {
  HfjReferenceMapLab,
  HfjExecutionExperimentLab,
  HfjEvidenceLab,
} from "./official-hfj-lab";

const stages = ["声明合同", "预测结果", "编译运行", "注入边界", "解释证据"];

export function Hfj3e07InheritancePolymorphismMapLab() {
  return (
    <HfjReferenceMapLab
      title="第7章 对象村的更好生活：继承与多态 · 对象/执行图"
      focus="以 IS-A 合同组织共享行为，用覆写和多态消除调用端分支，同时辨别继承滥用"
      stages={stages}
    />
  );
}

export function Hfj3e07InheritancePolymorphismExperimentLab() {
  return (
    <HfjExecutionExperimentLab
      title="第7章 对象村的更好生活：继承与多态 · 执行实验"
      focus="Animal 继承树、动态分派轨迹与覆写合同测试"
      stages={stages}
    />
  );
}

export function Hfj3e07InheritancePolymorphismEvidenceLab() {
  return (
    <HfjEvidenceLab
      title="第7章 对象村的更好生活：继承与多态 · 失败证据"
      focus="为了复用几行代码就强造 IS-A，或把重载与覆写、HAS-A 与 IS-A 混淆"
      stages={stages}
    />
  );
}
