import { MultiplayerGameProgrammingEvidenceLab } from "./official-multiplayer-game-programming-lab";

const nodes = [
  "测量每连接成本",
  "裁剪对象作用域",
  "计算动态相关性",
  "分配优先级频率",
  "划分世界或实例",
  "压测迁移签发",
] as const;

export function Mgp09ScalabilityMapLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="第9章 可伸缩性（Scalability）" label="Multiplayer Game Programming" nodes={nodes} mode="map" />;
}

export function Mgp09ScalabilityExperimentLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="正常、边界、失败与恢复样本" label="可伸缩性" nodes={nodes} mode="experiment" />;
}

export function Mgp09ScalabilityEvidenceLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="时序、状态与恢复证据" label="可伸缩性" nodes={nodes} mode="evidence" />;
}
