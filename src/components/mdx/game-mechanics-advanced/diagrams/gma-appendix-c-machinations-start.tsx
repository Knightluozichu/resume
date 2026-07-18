"use client";

import { GameMechanicsEvidenceLab } from "./official-game-mechanics-lab";

const nodes = ["创建图","配置节点","连接语义","单步校验","批量运行","导出证据"] as const;

export function GmaAppendixCMachinationsStartMapLab() {
  return <GameMechanicsEvidenceLab title="附录C Machinations入门指南" label="附录C" nodes={nodes} mode="map" />;
}

export function GmaAppendixCMachinationsStartExperimentLab() {
  return <GameMechanicsEvidenceLab title="附录C反例实验" label="附录C" nodes={nodes} mode="experiment" />;
}

export function GmaAppendixCMachinationsStartEvidenceLab() {
  return <GameMechanicsEvidenceLab title="附录C签发证据" label="附录C" nodes={nodes} mode="evidence" />;
}
