import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "识别规范年份",
  "确认运行时支持",
  "选择原生或转译",
  "编写边界样本",
  "验证包体与语义",
  "记录降级基线",
] as const;

export function JpgAppendixAEs2018Es2019MapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="附录 A ES2018和ES2019"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function JpgAppendixAEs2018Es2019ExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="附录 A ES2018和ES2019"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function JpgAppendixAEs2018Es2019EvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="附录 A ES2018和ES2019"
      nodes={nodes}
      mode="evidence"
    />
  );
}
