import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "限定输入大小",
  "解析JSON语法",
  "以reviver验证转换",
  "映射业务模式",
  "用replacer序列化",
  "比较往返与丢失字段",
] as const;

export function Jpg23JsonMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 23 章 JSON"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg23JsonExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 23 章 JSON"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg23JsonEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 23 章 JSON"
      nodes={nodes}
      mode="evidence"
    />
  );
}
