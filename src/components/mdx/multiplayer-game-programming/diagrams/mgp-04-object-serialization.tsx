import { MultiplayerGameProgrammingEvidenceLab } from "./official-multiplayer-game-programming-lab";

const nodes = [
  "定义逻辑模式",
  "选择字节与位序",
  "编码标量字段",
  "解析引用身份",
  "量化压缩",
  "跨版本往返验证",
] as const;

export function Mgp04ObjectSerializationMapLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="第4章 对象序列化（Object Serialization）" label="Multiplayer Game Programming" nodes={nodes} mode="map" />;
}

export function Mgp04ObjectSerializationExperimentLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="正常、边界、失败与恢复样本" label="对象序列化" nodes={nodes} mode="experiment" />;
}

export function Mgp04ObjectSerializationEvidenceLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="时序、状态与恢复证据" label="对象序列化" nodes={nodes} mode="evidence" />;
}
