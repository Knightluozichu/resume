import {
  GdfPlayerContractLab,
  GdfPrototypeExperimentLab,
  GdfPlaytestEvidenceLab,
} from "./official-gdf-lab";

const stages = ["体验承诺", "规则状态", "问题原型", "玩家观察", "版本决议"];

export function Gdf3e06MakingMoneyMapLab() {
  return (
    <GdfPlayerContractLab
      title="第6章 盈利方式 · 玩家合同"
      focus="第6章 盈利方式"
      stages={stages}
    />
  );
}

export function Gdf3e06MakingMoneyExperimentLab() {
  return (
    <GdfPrototypeExperimentLab
      title="第6章 盈利方式 · 原型实验"
      focus="选择、挑战与反馈"
      stages={stages}
    />
  );
}

export function Gdf3e06MakingMoneyEvidenceLab() {
  return (
    <GdfPlaytestEvidenceLab
      title="第6章 盈利方式 · 试玩证据"
      focus="正常、边界与反例"
      stages={stages}
    />
  );
}
