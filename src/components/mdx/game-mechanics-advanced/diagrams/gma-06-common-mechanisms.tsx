"use client";

import { GameMechanicsEvidenceLab } from "./official-game-mechanics-lab";

const nodes = ["机制样本","不确定性分类","反馈方向","环路增益","延迟观测","策略分布"] as const;

export function Gma06CommonMechanismsMapLab() {
  return <GameMechanicsEvidenceLab title="第6章 常见机制" label="第6章" nodes={nodes} mode="map" />;
}

export function Gma06CommonMechanismsExperimentLab() {
  return <GameMechanicsEvidenceLab title="第6章反例实验" label="第6章" nodes={nodes} mode="experiment" />;
}

export function Gma06CommonMechanismsEvidenceLab() {
  return <GameMechanicsEvidenceLab title="第6章签发证据" label="第6章" nodes={nodes} mode="evidence" />;
}
