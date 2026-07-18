"use client";

import { GameMechanicsEvidenceLab } from "./official-game-mechanics-lab";

const nodes = ["代理策略","随机种子","批量运行","结果分布","统治策略","真人对照"] as const;

export function Gma08SimulatingBalancingGamesMapLab() {
  return <GameMechanicsEvidenceLab title="第8章 模拟并平衡游戏" label="第8章" nodes={nodes} mode="map" />;
}

export function Gma08SimulatingBalancingGamesExperimentLab() {
  return <GameMechanicsEvidenceLab title="第8章反例实验" label="第8章" nodes={nodes} mode="experiment" />;
}

export function Gma08SimulatingBalancingGamesEvidenceLab() {
  return <GameMechanicsEvidenceLab title="第8章签发证据" label="第8章" nodes={nodes} mode="evidence" />;
}
