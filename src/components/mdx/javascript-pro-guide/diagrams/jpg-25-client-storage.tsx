import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "分类敏感与权威数据",
  "选择存储机制",
  "定义键与版本",
  "事务写入读取",
  "处理配额与跨标签变化",
  "清理迁移和注销",
] as const;

export function Jpg25ClientStorageMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 25 章 客户端存储"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg25ClientStorageExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 25 章 客户端存储"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg25ClientStorageEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 25 章 客户端存储"
      nodes={nodes}
      mode="evidence"
    />
  );
}
