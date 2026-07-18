import {
  HfjReferenceMapLab,
  HfjExecutionExperimentLab,
  HfjEvidenceLab,
} from "./official-hfj-lab";

const stages = ["声明合同", "预测结果", "编译运行", "注入边界", "解释证据"];

export function Hfj3e13ExceptionsMapLab() {
  return (
    <HfjReferenceMapLab
      title="第13章 风险行为：异常处理 · 对象/执行图"
      focus="把失败建模为异常对象，沿调用栈明确抛出、捕获、排序、清理和传播责任"
      stages={stages}
    />
  );
}

export function Hfj3e13ExceptionsExperimentLab() {
  return (
    <HfjExecutionExperimentLab
      title="第13章 风险行为：异常处理 · 执行实验"
      focus="异常分类表、控制流轨迹与 JavaSound 失败注入测试"
      stages={stages}
    />
  );
}

export function Hfj3e13ExceptionsEvidenceLab() {
  return (
    <HfjEvidenceLab
      title="第13章 风险行为：异常处理 · 失败证据"
      focus="捕获 Exception 后吞掉上下文，或用 finally/TWR 不当掩盖原始失败"
      stages={stages}
    />
  );
}
