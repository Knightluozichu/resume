import {
  GdfPlayerContractLab,
  GdfPrototypeExperimentLab,
  GdfPlaytestEvidenceLab,
} from "./official-gdf-lab";

const stages = ["体验承诺", "规则状态", "问题原型", "玩家观察", "版本决议"];

export function Gdf3e15GameBalancingMapLab() {
  return (
    <GdfPlayerContractLab
      title="第15章 游戏平衡 · 玩家合同"
      focus="第15章 游戏平衡"
      stages={stages}
    />
  );
}

export function Gdf3e15GameBalancingExperimentLab() {
  return (
    <GdfPrototypeExperimentLab
      title="第15章 游戏平衡 · 原型实验"
      focus="选择、挑战与反馈"
      stages={stages}
    />
  );
}

export function Gdf3e15GameBalancingEvidenceLab() {
  return (
    <GdfPlaytestEvidenceLab
      title="第15章 游戏平衡 · 试玩证据"
      focus="正常、边界与反例"
      stages={stages}
    />
  );
}
