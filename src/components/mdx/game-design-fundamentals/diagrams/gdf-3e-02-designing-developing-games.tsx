import {
  GdfPlayerContractLab,
  GdfPrototypeExperimentLab,
  GdfPlaytestEvidenceLab,
} from "./official-gdf-lab";

const stages = ["体验承诺", "规则状态", "问题原型", "玩家观察", "版本决议"];

export function Gdf3e02DesigningDevelopingGamesMapLab() {
  return (
    <GdfPlayerContractLab
      title="第2章 设计与开发游戏 · 玩家合同"
      focus="第2章 设计与开发游戏"
      stages={stages}
    />
  );
}

export function Gdf3e02DesigningDevelopingGamesExperimentLab() {
  return (
    <GdfPrototypeExperimentLab
      title="第2章 设计与开发游戏 · 原型实验"
      focus="选择、挑战与反馈"
      stages={stages}
    />
  );
}

export function Gdf3e02DesigningDevelopingGamesEvidenceLab() {
  return (
    <GdfPlaytestEvidenceLab
      title="第2章 设计与开发游戏 · 试玩证据"
      focus="正常、边界与反例"
      stages={stages}
    />
  );
}
