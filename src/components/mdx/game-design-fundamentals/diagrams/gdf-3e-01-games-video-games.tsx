import {
  GdfPlayerContractLab,
  GdfPrototypeExperimentLab,
  GdfPlaytestEvidenceLab,
} from "./official-gdf-lab";

const stages = ["体验承诺", "规则状态", "问题原型", "玩家观察", "版本决议"];

export function Gdf3e01GamesVideoGamesMapLab() {
  return (
    <GdfPlayerContractLab
      title="第1章 游戏与电子游戏 · 玩家合同"
      focus="第1章 游戏与电子游戏"
      stages={stages}
    />
  );
}

export function Gdf3e01GamesVideoGamesExperimentLab() {
  return (
    <GdfPrototypeExperimentLab
      title="第1章 游戏与电子游戏 · 原型实验"
      focus="选择、挑战与反馈"
      stages={stages}
    />
  );
}

export function Gdf3e01GamesVideoGamesEvidenceLab() {
  return (
    <GdfPlaytestEvidenceLab
      title="第1章 游戏与电子游戏 · 试玩证据"
      focus="正常、边界与反例"
      stages={stages}
    />
  );
}
