import {
  HfjReferenceMapLab,
  HfjExecutionExperimentLab,
  HfjEvidenceLab,
} from "./official-hfj-lab";

const stages = ["声明合同", "预测结果", "编译运行", "注入边界", "解释证据"];

export function Hfj3e03PrimitivesReferencesMapLab() {
  return (
    <HfjReferenceMapLab
      title="第3章 认清变量：基本类型与引用 · 对象/执行图"
      focus="区分值、引用和对象身份，追踪数组与堆上对象的可达性"
      stages={stages}
    />
  );
}

export function Hfj3e03PrimitivesReferencesExperimentLab() {
  return (
    <HfjExecutionExperimentLab
      title="第3章 认清变量：基本类型与引用 · 执行实验"
      focus="类型边界表、引用别名图与堆可达性测试"
      stages={stages}
    />
  );
}

export function Hfj3e03PrimitivesReferencesEvidenceLab() {
  return (
    <HfjEvidenceLab
      title="第3章 认清变量：基本类型与引用 · 失败证据"
      focus="把引用变量画成对象本体，或认为数组保存对象而不是对象引用"
      stages={stages}
    />
  );
}
