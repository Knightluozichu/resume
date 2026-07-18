"use client";

import { GameMechanicsEvidenceLab } from "./official-game-mechanics-lab";

const nodes = ["目录身份","规则模型","资源流图","模拟样本","体验验证","签发证据"] as const;

export function GmaOfficialLearningMapMapLab() {
  return <GameMechanicsEvidenceLab title="《游戏机制：高级游戏设计技术》权威学习地图" label="全书导览" nodes={nodes} mode="map" />;
}

export function GmaOfficialLearningMapExperimentLab() {
  return <GameMechanicsEvidenceLab title="全书导览反例实验" label="全书导览" nodes={nodes} mode="experiment" />;
}

export function GmaOfficialLearningMapEvidenceLab() {
  return <GameMechanicsEvidenceLab title="全书导览签发证据" label="全书导览" nodes={nodes} mode="evidence" />;
}
