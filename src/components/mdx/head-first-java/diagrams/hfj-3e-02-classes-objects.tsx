import {
  HfjReferenceMapLab,
  HfjExecutionExperimentLab,
  HfjEvidenceLab,
} from "./official-hfj-lab";

const stages = ["声明合同", "预测结果", "编译运行", "注入边界", "解释证据"];

export function Hfj3e02ClassesObjectsMapLab() {
  return (
    <HfjReferenceMapLab
      title="第2章 对象村之旅：类与对象 · 对象/执行图"
      focus="把类当作对象蓝图，把状态和行为从 main 中迁出，并用消息协作完成程序"
      stages={stages}
    />
  );
}

export function Hfj3e02ClassesObjectsExperimentLab() {
  return (
    <HfjExecutionExperimentLab
      title="第2章 对象村之旅：类与对象 · 执行实验"
      focus="类职责卡、对象实例轨迹与 Guessing Game 协作图"
      stages={stages}
    />
  );
}

export function Hfj3e02ClassesObjectsEvidenceLab() {
  return (
    <HfjEvidenceLab
      title="第2章 对象村之旅：类与对象 · 失败证据"
      focus="把类和对象当成同义词，或把所有逻辑继续堆在静态 main 方法里"
      stages={stages}
    />
  );
}
