import {
  HfjReferenceMapLab,
  HfjExecutionExperimentLab,
  HfjEvidenceLab,
} from "./official-hfj-lab";

const stages = ["声明合同", "预测结果", "编译运行", "注入边界", "解释证据"];

export function Hfj3e12LambdasStreamsMapLab() {
  return (
    <HfjReferenceMapLab
      title="第12章 Lambda 与 Stream：说做什么，不说怎么做 · 对象/执行图"
      focus="把行为作为值传递，用惰性中间操作和终止操作构造可解释、不修改源集合的数据管道"
      stages={stages}
    />
  );
}

export function Hfj3e12LambdasStreamsExperimentLab() {
  return (
    <HfjExecutionExperimentLab
      title="第12章 Lambda 与 Stream：说做什么，不说怎么做 · 执行实验"
      focus="Stream 管道卡、惰性求值轨迹与 Optional 空结果测试"
      stages={stages}
    />
  );
}

export function Hfj3e12LambdasStreamsEvidenceLab() {
  return (
    <HfjEvidenceLab
      title="第12章 Lambda 与 Stream：说做什么，不说怎么做 · 失败证据"
      focus="复用已消费 Stream，或在管道中隐藏副作用并误以为并行会自动更快"
      stages={stages}
    />
  );
}
