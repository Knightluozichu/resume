import {
  GdfPlayerContractLab,
  GdfPrototypeExperimentLab,
  GdfPlaytestEvidenceLab,
} from "./official-gdf-lab";

const stages = ["体验承诺", "规则状态", "问题原型", "玩家观察", "版本决议"];

export function Gdf3eReferencesMapLab() {
  return (
    <GdfPlayerContractLab
      title="参考文献 References · 玩家合同"
      focus="参考文献 References"
      stages={stages}
    />
  );
}

export function Gdf3eReferencesExperimentLab() {
  return (
    <GdfPrototypeExperimentLab
      title="参考文献 References · 原型实验"
      focus="选择、挑战与反馈"
      stages={stages}
    />
  );
}

export function Gdf3eReferencesEvidenceLab() {
  return (
    <GdfPlaytestEvidenceLab
      title="参考文献 References · 试玩证据"
      focus="正常、边界与反例"
      stages={stages}
    />
  );
}
