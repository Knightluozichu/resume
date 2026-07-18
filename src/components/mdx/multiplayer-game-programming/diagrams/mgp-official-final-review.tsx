import { MultiplayerGameProgrammingEvidenceLab } from "./official-multiplayer-game-programming-lab";

const nodes = [
  "采样并编号输入",
  "序列化发送意图",
  "服务器验证推进",
  "复制相关状态",
  "客户端预测校正",
  "结果入库并回收会话",
] as const;

export function MgpOfficialFinalReviewMapLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="《Multiplayer Game Programming》全书总复习" label="Multiplayer Game Programming" nodes={nodes} mode="map" />;
}

export function MgpOfficialFinalReviewExperimentLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="正常、边界、失败与恢复样本" label="全书总复习" nodes={nodes} mode="experiment" />;
}

export function MgpOfficialFinalReviewEvidenceLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="时序、状态与恢复证据" label="全书总复习" nodes={nodes} mode="evidence" />;
}
