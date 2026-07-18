import { ServerBookEvidenceLab } from "./official-server-evidence-lab";

const nodes = [
  "锁定同一测试版本",
  "回放连接与调度轨迹",
  "注入篡改重放竞态",
  "验证事务大厅幂等",
  "演练 GM 补偿与更新回滚",
  "归档指标日志并签发",
] as const;

export function GspOfficialFinalReviewMapLab() {
  return <ServerBookEvidenceLab title="《网络游戏服务器端编程》全书总复习" label="总复习" nodes={nodes} mode="map" />;
}

export function GspOfficialFinalReviewExperimentLab() {
  return <ServerBookEvidenceLab title="正常、边界与失败样本" label="总复习" nodes={nodes} mode="experiment" />;
}

export function GspOfficialFinalReviewEvidenceLab() {
  return <ServerBookEvidenceLab title="交付证据与阶段门" label="总复习" nodes={nodes} mode="evidence" />;
}
