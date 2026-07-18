import {
  HfjReferenceMapLab,
  HfjExecutionExperimentLab,
  HfjEvidenceLab,
} from "./official-hfj-lab";

const stages = ["声明合同", "预测结果", "编译运行", "注入边界", "解释证据"];

export function Hfj3e05WritingProgramMapLab() {
  return (
    <HfjReferenceMapLab
      title="第5章 强力方法：编写完整程序 · 对象/执行图"
      focus="从高层设计、类开发、测试驱动到循环与类型转换，完成可运行小游戏"
      stages={stages}
    />
  );
}

export function Hfj3e05WritingProgramExperimentLab() {
  return (
    <HfjExecutionExperimentLab
      title="第5章 强力方法：编写完整程序 · 执行实验"
      focus="Sink a Startup 最小实现、测试驱动与缺陷复现单"
      stages={stages}
    />
  );
}

export function Hfj3e05WritingProgramEvidenceLab() {
  return (
    <HfjEvidenceLab
      title="第5章 强力方法：编写完整程序 · 失败证据"
      focus="先写大段 main 再补测试，或用随机运行一次来宣称边界已经覆盖"
      stages={stages}
    />
  );
}
