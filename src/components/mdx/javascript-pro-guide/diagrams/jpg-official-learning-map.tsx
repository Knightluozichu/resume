import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "锁定第4版目录",
  "掌握语言对象",
  "建立异步浏览器模型",
  "操纵DOM与事件",
  "贯通网络存储",
  "模块化部署签发",
] as const;

export function JpgOfficialLearningMapMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="《JavaScript高级程序设计（第4版）》权威学习地图"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function JpgOfficialLearningMapExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="《JavaScript高级程序设计（第4版）》权威学习地图"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function JpgOfficialLearningMapEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="《JavaScript高级程序设计（第4版）》权威学习地图"
      nodes={nodes}
      mode="evidence"
    />
  );
}
