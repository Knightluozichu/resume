"use client";

import { GameMechanicsEvidenceLab } from "./official-game-mechanics-lab";

const nodes = ["设计意图","模式候选","结构实例","副作用预测","反例运行","组合验收"] as const;

export function Gma07DesignPatternsMapLab() {
  return <GameMechanicsEvidenceLab title="第7章 设计模式" label="第7章" nodes={nodes} mode="map" />;
}

export function Gma07DesignPatternsExperimentLab() {
  return <GameMechanicsEvidenceLab title="第7章反例实验" label="第7章" nodes={nodes} mode="experiment" />;
}

export function Gma07DesignPatternsEvidenceLab() {
  return <GameMechanicsEvidenceLab title="第7章签发证据" label="第7章" nodes={nodes} mode="evidence" />;
}
