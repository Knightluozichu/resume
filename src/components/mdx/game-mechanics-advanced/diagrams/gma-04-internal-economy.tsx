"use client";

import { GameMechanicsEvidenceLab } from "./official-game-mechanics-lab";

const nodes = ["资源定义","实体所有权","流入速率","转换交易","流出速率","库存轨迹"] as const;

export function Gma04InternalEconomyMapLab() {
  return <GameMechanicsEvidenceLab title="第4章 内部经济" label="第4章" nodes={nodes} mode="map" />;
}

export function Gma04InternalEconomyExperimentLab() {
  return <GameMechanicsEvidenceLab title="第4章反例实验" label="第4章" nodes={nodes} mode="experiment" />;
}

export function Gma04InternalEconomyEvidenceLab() {
  return <GameMechanicsEvidenceLab title="第4章签发证据" label="第4章" nodes={nodes} mode="evidence" />;
}
