import {
  GdfPlayerContractLab,
  GdfPrototypeExperimentLab,
  GdfPlaytestEvidenceLab,
} from "./official-gdf-lab";

const stages = ["体验承诺", "规则状态", "问题原型", "玩家观察", "版本决议"];

export function Gdf3e14CoreMechanicsMapLab() {
  return (
    <GdfPlayerContractLab
      title="第14章 核心机制 · 玩家合同"
      focus="第14章 核心机制"
      stages={stages}
    />
  );
}

export function Gdf3e14CoreMechanicsExperimentLab() {
  return (
    <GdfPrototypeExperimentLab
      title="第14章 核心机制 · 原型实验"
      focus="选择、挑战与反馈"
      stages={stages}
    />
  );
}

export function Gdf3e14CoreMechanicsEvidenceLab() {
  return (
    <GdfPlaytestEvidenceLab
      title="第14章 核心机制 · 试玩证据"
      focus="正常、边界与反例"
      stages={stages}
    />
  );
}
