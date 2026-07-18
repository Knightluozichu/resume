import { MultiplayerGameProgrammingEvidenceLab } from "./official-multiplayer-game-programming-lab";

const nodes = [
  "保存输入序号",
  "本地预测自身",
  "缓存远端快照",
  "插值显示远端",
  "权威基线校正",
  "历史回滚裁决",
] as const;

export function Mgp08ImprovedLatencyHandlingMapLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="第8章 改进延迟处理（Improved Latency Handling）" label="Multiplayer Game Programming" nodes={nodes} mode="map" />;
}

export function Mgp08ImprovedLatencyHandlingExperimentLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="正常、边界、失败与恢复样本" label="延迟隐藏与校正" nodes={nodes} mode="experiment" />;
}

export function Mgp08ImprovedLatencyHandlingEvidenceLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="时序、状态与恢复证据" label="延迟隐藏与校正" nodes={nodes} mode="evidence" />;
}
