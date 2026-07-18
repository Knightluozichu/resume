"use client";

import { GameMechanicsEvidenceLab } from "./official-game-mechanics-lab";

const nodes = ["局部规则","连接拓扑","迭代轨迹","反馈环","宏观模式","边界约束"] as const;

export function Gma03ComplexSystemsEmergenceMapLab() {
  return <GameMechanicsEvidenceLab title="第3章 复杂系统和突现结构" label="第3章" nodes={nodes} mode="map" />;
}

export function Gma03ComplexSystemsEmergenceExperimentLab() {
  return <GameMechanicsEvidenceLab title="第3章反例实验" label="第3章" nodes={nodes} mode="experiment" />;
}

export function Gma03ComplexSystemsEmergenceEvidenceLab() {
  return <GameMechanicsEvidenceLab title="第3章签发证据" label="第3章" nodes={nodes} mode="evidence" />;
}
