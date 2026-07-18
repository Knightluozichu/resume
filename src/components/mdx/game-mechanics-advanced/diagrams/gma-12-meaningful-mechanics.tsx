"use client";

import { GameMechanicsEvidenceLab } from "./official-game-mechanics-lab";

const nodes = ["表达意图","规则编码","玩家行动","系统反馈","玩家解释","意义对照"] as const;

export function Gma12MeaningfulMechanicsMapLab() {
  return <GameMechanicsEvidenceLab title="第12章 有意义的机制" label="第12章" nodes={nodes} mode="map" />;
}

export function Gma12MeaningfulMechanicsExperimentLab() {
  return <GameMechanicsEvidenceLab title="第12章反例实验" label="第12章" nodes={nodes} mode="experiment" />;
}

export function Gma12MeaningfulMechanicsEvidenceLab() {
  return <GameMechanicsEvidenceLab title="第12章签发证据" label="第12章" nodes={nodes} mode="evidence" />;
}
