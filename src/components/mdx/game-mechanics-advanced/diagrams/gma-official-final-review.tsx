"use client";

import { GameMechanicsEvidenceLab } from "./official-game-mechanics-lab";

const nodes = ["规则契约","结构模型","模拟分布","关卡进程","意义对照","证据签发"] as const;

export function GmaOfficialFinalReviewMapLab() {
  return <GameMechanicsEvidenceLab title="《游戏机制：高级游戏设计技术》全书综合验收" label="综合验收" nodes={nodes} mode="map" />;
}

export function GmaOfficialFinalReviewExperimentLab() {
  return <GameMechanicsEvidenceLab title="综合验收反例实验" label="综合验收" nodes={nodes} mode="experiment" />;
}

export function GmaOfficialFinalReviewEvidenceLab() {
  return <GameMechanicsEvidenceLab title="综合验收签发证据" label="综合验收" nodes={nodes} mode="evidence" />;
}
