import {
  GdfPlayerContractLab,
  GdfPrototypeExperimentLab,
  GdfPlaytestEvidenceLab,
} from "./official-gdf-lab";

const stages = ["体验承诺", "规则状态", "问题原型", "玩家观察", "版本决议"];

export function Gdf3e07GameConceptsMapLab() {
  return (
    <GdfPlayerContractLab
      title="第7章 游戏概念 · 玩家合同"
      focus="第7章 游戏概念"
      stages={stages}
    />
  );
}

export function Gdf3e07GameConceptsExperimentLab() {
  return (
    <GdfPrototypeExperimentLab
      title="第7章 游戏概念 · 原型实验"
      focus="选择、挑战与反馈"
      stages={stages}
    />
  );
}

export function Gdf3e07GameConceptsEvidenceLab() {
  return (
    <GdfPlaytestEvidenceLab
      title="第7章 游戏概念 · 试玩证据"
      focus="正常、边界与反例"
      stages={stages}
    />
  );
}
