import {
  GdfPlayerContractLab,
  GdfPrototypeExperimentLab,
  GdfPlaytestEvidenceLab,
} from "./official-gdf-lab";

const stages = ["体验承诺", "规则状态", "问题原型", "玩家观察", "版本决议"];

export function Gdf3e03MajorGenresMapLab() {
  return (
    <GdfPlayerContractLab
      title="第3章 主要游戏类型 · 玩家合同"
      focus="第3章 主要游戏类型"
      stages={stages}
    />
  );
}

export function Gdf3e03MajorGenresExperimentLab() {
  return (
    <GdfPrototypeExperimentLab
      title="第3章 主要游戏类型 · 原型实验"
      focus="选择、挑战与反馈"
      stages={stages}
    />
  );
}

export function Gdf3e03MajorGenresEvidenceLab() {
  return (
    <GdfPlaytestEvidenceLab
      title="第3章 主要游戏类型 · 试玩证据"
      focus="正常、边界与反例"
      stages={stages}
    />
  );
}
