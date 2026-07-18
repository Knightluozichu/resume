"use client";

import { GameMechanicsEvidenceLab } from "./official-game-mechanics-lab";

const nodes = ["符号识别","连接分类","激活读取","流率计算","边界执行","语义复述"] as const;

export function GmaAppendixAMachinationsReferenceMapLab() {
  return <GameMechanicsEvidenceLab title="附录A Machinations速查手册" label="附录A" nodes={nodes} mode="map" />;
}

export function GmaAppendixAMachinationsReferenceExperimentLab() {
  return <GameMechanicsEvidenceLab title="附录A反例实验" label="附录A" nodes={nodes} mode="experiment" />;
}

export function GmaAppendixAMachinationsReferenceEvidenceLab() {
  return <GameMechanicsEvidenceLab title="附录A签发证据" label="附录A" nodes={nodes} mode="evidence" />;
}
