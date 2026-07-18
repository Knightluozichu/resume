"use client";

import { GameMechanicsEvidenceLab } from "./official-game-mechanics-lab";

const nodes = ["生产链","空间连接","阶段目标","反馈结构","瓶颈样本","迭代对照"] as const;

export function Gma09BuildingEconomiesMapLab() {
  return <GameMechanicsEvidenceLab title="第9章 构建游戏经济" label="第9章" nodes={nodes} mode="map" />;
}

export function Gma09BuildingEconomiesExperimentLab() {
  return <GameMechanicsEvidenceLab title="第9章反例实验" label="第9章" nodes={nodes} mode="experiment" />;
}

export function Gma09BuildingEconomiesEvidenceLab() {
  return <GameMechanicsEvidenceLab title="第9章签发证据" label="第9章" nodes={nodes} mode="evidence" />;
}
