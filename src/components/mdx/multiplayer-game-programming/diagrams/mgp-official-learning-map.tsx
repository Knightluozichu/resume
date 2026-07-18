import { MultiplayerGameProgrammingEvidenceLab } from "./official-multiplayer-game-programming-lab";

const nodes = [
  "锁定官方目录",
  "建立互联网端点",
  "序列化并复制对象",
  "处理延迟可靠性",
  "伸缩与安全",
  "接入服务并托管",
] as const;

export function MgpOfficialLearningMapMapLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="《Multiplayer Game Programming》权威学习地图" label="Multiplayer Game Programming" nodes={nodes} mode="map" />;
}

export function MgpOfficialLearningMapExperimentLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="正常、边界、失败与恢复样本" label="权威学习地图" nodes={nodes} mode="experiment" />;
}

export function MgpOfficialLearningMapEvidenceLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="时序、状态与恢复证据" label="权威学习地图" nodes={nodes} mode="evidence" />;
}
