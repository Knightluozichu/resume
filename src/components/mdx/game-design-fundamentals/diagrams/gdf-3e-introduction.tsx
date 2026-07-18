import {
  GdfPlayerContractLab,
  GdfPrototypeExperimentLab,
  GdfPlaytestEvidenceLab,
} from "./official-gdf-lab";

const stages = ["体验承诺", "规则状态", "问题原型", "玩家观察", "版本决议"];

export function Gdf3eIntroductionMapLab() {
  return (
    <GdfPlayerContractLab
      title="导言 Introduction · 玩家合同"
      focus="导言 Introduction"
      stages={stages}
    />
  );
}

export function Gdf3eIntroductionExperimentLab() {
  return (
    <GdfPrototypeExperimentLab
      title="导言 Introduction · 原型实验"
      focus="选择、挑战与反馈"
      stages={stages}
    />
  );
}

export function Gdf3eIntroductionEvidenceLab() {
  return (
    <GdfPlaytestEvidenceLab
      title="导言 Introduction · 试玩证据"
      focus="正常、边界与反例"
      stages={stages}
    />
  );
}
