import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "启动异步操作",
  "创建Promise状态",
  "登记成功失败反应",
  "以微任务传播",
  "聚合并发结果",
  "取消超时与清理",
] as const;

export function Jpg11PromisesAsyncFunctionsMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 11 章 期约与异步函数"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg11PromisesAsyncFunctionsExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 11 章 期约与异步函数"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg11PromisesAsyncFunctionsEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 11 章 期约与异步函数"
      nodes={nodes}
      mode="evidence"
    />
  );
}
