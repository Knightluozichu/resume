"use client";

import { GameMechanicsEvidenceLab } from "./official-game-mechanics-lab";

const nodes = ["机制玩具","技能原子","任务依赖","空间拓扑","挑战组合","学习验证"] as const;

export function Gma10LevelDesignMechanicsMapLab() {
  return <GameMechanicsEvidenceLab title="第10章 将关卡设计和游戏机制融合起来" label="第10章" nodes={nodes} mode="map" />;
}

export function Gma10LevelDesignMechanicsExperimentLab() {
  return <GameMechanicsEvidenceLab title="第10章反例实验" label="第10章" nodes={nodes} mode="experiment" />;
}

export function Gma10LevelDesignMechanicsEvidenceLab() {
  return <GameMechanicsEvidenceLab title="第10章签发证据" label="第10章" nodes={nodes} mode="evidence" />;
}
