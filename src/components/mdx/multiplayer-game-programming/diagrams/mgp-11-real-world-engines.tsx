import { MultiplayerGameProgrammingEvidenceLab } from "./official-multiplayer-game-programming-lab";

const nodes = [
  "定义引擎无关不变量",
  "映射对象生命周期",
  "配置属性复制",
  "约束RPC方向",
  "接入相关性",
  "跨引擎样本对照",
] as const;

export function Mgp11RealWorldEnginesMapLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="第11章 真实世界引擎（Real-World Engines）" label="Multiplayer Game Programming" nodes={nodes} mode="map" />;
}

export function Mgp11RealWorldEnginesExperimentLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="正常、边界、失败与恢复样本" label="Unreal与Unity网络抽象" nodes={nodes} mode="experiment" />;
}

export function Mgp11RealWorldEnginesEvidenceLab() {
  return <MultiplayerGameProgrammingEvidenceLab title="时序、状态与恢复证据" label="Unreal与Unity网络抽象" nodes={nodes} mode="evidence" />;
}
