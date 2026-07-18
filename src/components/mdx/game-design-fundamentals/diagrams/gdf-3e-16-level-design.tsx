import {
  GdfPlayerContractLab,
  GdfPrototypeExperimentLab,
  GdfPlaytestEvidenceLab,
} from "./official-gdf-lab";

const stages = ["体验承诺", "规则状态", "问题原型", "玩家观察", "版本决议"];

export function Gdf3e16LevelDesignMapLab() {
  return (
    <GdfPlayerContractLab
      title="第16章 关卡设计 · 玩家合同"
      focus="第16章 关卡设计"
      stages={stages}
    />
  );
}

export function Gdf3e16LevelDesignExperimentLab() {
  return (
    <GdfPrototypeExperimentLab
      title="第16章 关卡设计 · 原型实验"
      focus="选择、挑战与反馈"
      stages={stages}
    />
  );
}

export function Gdf3e16LevelDesignEvidenceLab() {
  return (
    <GdfPlaytestEvidenceLab
      title="第16章 关卡设计 · 试玩证据"
      focus="正常、边界与反例"
      stages={stages}
    />
  );
}
