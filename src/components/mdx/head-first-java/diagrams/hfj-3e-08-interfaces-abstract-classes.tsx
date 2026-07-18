import {
  HfjReferenceMapLab,
  HfjExecutionExperimentLab,
  HfjEvidenceLab,
} from "./official-hfj-lab";

const stages = ["声明合同", "预测结果", "编译运行", "注入边界", "解释证据"];

export function Hfj3e08InterfacesAbstractClassesMapLab() {
  return (
    <HfjReferenceMapLab
      title="第8章 严肃多态：接口与抽象类 · 对象/执行图"
      focus="用抽象类复用状态和骨架，用接口表达跨层能力，并理解 Object 引用的静态边界"
      stages={stages}
    />
  );
}

export function Hfj3e08InterfacesAbstractClassesExperimentLab() {
  return (
    <HfjExecutionExperimentLab
      title="第8章 严肃多态：接口与抽象类 · 执行实验"
      focus="抽象/具体类型矩阵、Pet 接口契约与安全转型测试"
      stages={stages}
    />
  );
}

export function Hfj3e08InterfacesAbstractClassesEvidenceLab() {
  return (
    <HfjEvidenceLab
      title="第8章 严肃多态：接口与抽象类 · 失败证据"
      focus="用万能 Object 逃避建模后大量强转，或给接口加入方法却不评估实现方破坏"
      stages={stages}
    />
  );
}
