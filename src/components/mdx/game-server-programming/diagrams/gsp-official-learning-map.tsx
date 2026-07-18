import { ServerBookEvidenceLab } from "./official-server-evidence-lab";

const nodes = [
  "锁定版本与 ISBN",
  "保存公开目录快照",
  "映射八个正式章节",
  "标注目录披露粒度",
  "建立正常边界失败样本",
  "完成全链签发",
] as const;

export function GspOfficialLearningMapMapLab() {
  return <ServerBookEvidenceLab title="《网络游戏服务器端编程》权威学习地图" label="全书导览" nodes={nodes} mode="map" />;
}

export function GspOfficialLearningMapExperimentLab() {
  return <ServerBookEvidenceLab title="正常、边界与失败样本" label="全书导览" nodes={nodes} mode="experiment" />;
}

export function GspOfficialLearningMapEvidenceLab() {
  return <ServerBookEvidenceLab title="交付证据与阶段门" label="全书导览" nodes={nodes} mode="evidence" />;
}
