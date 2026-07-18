"use client";

import { GameMechanicsEvidenceLab } from "./official-game-mechanics-lab";

const nodes = ["锁钥图","可达性","进度资源","阶段变化","软锁检测","恢复路径"] as const;

export function Gma11ProgressionMechanismsMapLab() {
  return <GameMechanicsEvidenceLab title="第11章 渐进机制" label="第11章" nodes={nodes} mode="map" />;
}

export function Gma11ProgressionMechanismsExperimentLab() {
  return <GameMechanicsEvidenceLab title="第11章反例实验" label="第11章" nodes={nodes} mode="experiment" />;
}

export function Gma11ProgressionMechanismsEvidenceLab() {
  return <GameMechanicsEvidenceLab title="第11章签发证据" label="第11章" nodes={nodes} mode="evidence" />;
}
