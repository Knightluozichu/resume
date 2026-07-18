"use client";

import { GameMechanicsEvidenceLab } from "./official-game-mechanics-lab";

const nodes = ["规则声明","状态建模","动作输入","结果计算","原型观测","设计结论"] as const;

export function Gma01DesigningGameMechanicsMapLab() {
  return <GameMechanicsEvidenceLab title="第1章 设计游戏机制" label="第1章" nodes={nodes} mode="map" />;
}

export function Gma01DesigningGameMechanicsExperimentLab() {
  return <GameMechanicsEvidenceLab title="第1章反例实验" label="第1章" nodes={nodes} mode="experiment" />;
}

export function Gma01DesigningGameMechanicsEvidenceLab() {
  return <GameMechanicsEvidenceLab title="第1章签发证据" label="第1章" nodes={nodes} mode="evidence" />;
}
