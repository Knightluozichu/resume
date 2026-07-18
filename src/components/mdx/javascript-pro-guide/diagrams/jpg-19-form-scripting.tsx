import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "采集控件状态",
  "运行约束验证",
  "确定提交意图",
  "构造FormData",
  "发送幂等请求",
  "反馈结果与恢复焦点",
] as const;

export function Jpg19FormScriptingMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 19 章 表单脚本"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg19FormScriptingExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 19 章 表单脚本"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg19FormScriptingEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 19 章 表单脚本"
      nodes={nodes}
      mode="evidence"
    />
  );
}
