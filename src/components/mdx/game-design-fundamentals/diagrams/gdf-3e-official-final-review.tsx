import {
  GdfPlayerContractLab,
  GdfPrototypeExperimentLab,
  GdfPlaytestEvidenceLab,
} from "./official-gdf-lab";

const stages = ["体验承诺", "规则状态", "问题原型", "玩家观察", "版本决议"];

export function Gdf3eOfficialFinalReviewMapLab() {
  return (
    <GdfPlayerContractLab
      title="《游戏设计基础（原书第3版）》综合验收 · 玩家合同"
      focus="《游戏设计基础（原书第3版）》综合验收"
      stages={stages}
    />
  );
}

export function Gdf3eOfficialFinalReviewExperimentLab() {
  return (
    <GdfPrototypeExperimentLab
      title="《游戏设计基础（原书第3版）》综合验收 · 原型实验"
      focus="选择、挑战与反馈"
      stages={stages}
    />
  );
}

export function Gdf3eOfficialFinalReviewEvidenceLab() {
  return (
    <GdfPlaytestEvidenceLab
      title="《游戏设计基础（原书第3版）》综合验收 · 试玩证据"
      focus="正常、边界与反例"
      stages={stages}
    />
  );
}
