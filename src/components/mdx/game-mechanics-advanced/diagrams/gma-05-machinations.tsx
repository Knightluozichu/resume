"use client";

import { GameMechanicsEvidenceLab } from "./official-game-mechanics-lab";

const nodes = ["游戏事件","节点选择","连接语义","激活模式","运行轨迹","模型对照"] as const;

export function Gma05MachinationsMapLab() {
  return <GameMechanicsEvidenceLab title="第5章 Machinations" label="第5章" nodes={nodes} mode="map" />;
}

export function Gma05MachinationsExperimentLab() {
  return <GameMechanicsEvidenceLab title="第5章反例实验" label="第5章" nodes={nodes} mode="experiment" />;
}

export function Gma05MachinationsEvidenceLab() {
  return <GameMechanicsEvidenceLab title="第5章签发证据" label="第5章" nodes={nodes} mode="evidence" />;
}
