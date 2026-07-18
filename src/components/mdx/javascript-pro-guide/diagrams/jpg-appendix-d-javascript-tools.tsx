import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "锁定运行时依赖",
  "格式与静态检查",
  "执行分层测试",
  "转译目标语法",
  "打包压缩映射",
  "签名发布与监控",
] as const;

export function JpgAppendixDJavascriptToolsMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="附录 D JavaScript工具"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function JpgAppendixDJavascriptToolsExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="附录 D JavaScript工具"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function JpgAppendixDJavascriptToolsEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="附录 D JavaScript工具"
      nodes={nodes}
      mode="evidence"
    />
  );
}
