"use client";

import { GameMechanicsEvidenceLab } from "./official-game-mechanics-lab";

const nodes = ["内容节点","规则集合","可达状态","玩家路径","阶段门","重玩证据"] as const;

export function Gma02EmergenceProgressionMapLab() {
  return <GameMechanicsEvidenceLab title="第2章 突现和渐进" label="第2章" nodes={nodes} mode="map" />;
}

export function Gma02EmergenceProgressionExperimentLab() {
  return <GameMechanicsEvidenceLab title="第2章反例实验" label="第2章" nodes={nodes} mode="experiment" />;
}

export function Gma02EmergenceProgressionEvidenceLab() {
  return <GameMechanicsEvidenceLab title="第2章签发证据" label="第2章" nodes={nodes} mode="evidence" />;
}
