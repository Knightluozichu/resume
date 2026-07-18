"use client";

import { GameMechanicsEvidenceLab } from "./official-game-mechanics-lab";

const nodes = ["问题陈述","模式意图","结构实例","模式组合","消融实验","后果签发"] as const;

export function GmaAppendixBPatternLibraryMapLab() {
  return <GameMechanicsEvidenceLab title="附录B 设计模式库" label="附录B" nodes={nodes} mode="map" />;
}

export function GmaAppendixBPatternLibraryExperimentLab() {
  return <GameMechanicsEvidenceLab title="附录B反例实验" label="附录B" nodes={nodes} mode="experiment" />;
}

export function GmaAppendixBPatternLibraryEvidenceLab() {
  return <GameMechanicsEvidenceLab title="附录B签发证据" label="附录B" nodes={nodes} mode="evidence" />;
}
