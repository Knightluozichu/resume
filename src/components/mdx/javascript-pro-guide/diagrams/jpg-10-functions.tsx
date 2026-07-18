import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "声明函数边界",
  "解析参数默认值",
  "确定this与new.target",
  "执行函数体",
  "保留闭包环境",
  "释放或返回结果",
] as const;

export function Jpg10FunctionsMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 10 章 函数"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg10FunctionsExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 10 章 函数"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg10FunctionsEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 10 章 函数"
      nodes={nodes}
      mode="evidence"
    />
  );
}
