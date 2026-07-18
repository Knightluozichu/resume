import {
  GdfPlayerContractLab,
  GdfPrototypeExperimentLab,
  GdfPlaytestEvidenceLab,
} from "./official-gdf-lab";

const stages = ["体验承诺", "规则状态", "问题原型", "玩家观察", "版本决议"];

export function Gdf3eIndexMapLab() {
  return (
    <GdfPlayerContractLab
      title="索引 Index · 玩家合同"
      focus="索引 Index"
      stages={stages}
    />
  );
}

export function Gdf3eIndexExperimentLab() {
  return (
    <GdfPrototypeExperimentLab
      title="索引 Index · 原型实验"
      focus="选择、挑战与反馈"
      stages={stages}
    />
  );
}

export function Gdf3eIndexEvidenceLab() {
  return (
    <GdfPlaytestEvidenceLab
      title="索引 Index · 试玩证据"
      focus="正常、边界与反例"
      stages={stages}
    />
  );
}
