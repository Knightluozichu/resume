import {
  GdfPlayerContractLab,
  GdfPrototypeExperimentLab,
  GdfPlaytestEvidenceLab,
} from "./official-gdf-lab";

const stages = ["体验承诺", "规则状态", "问题原型", "玩家观察", "版本决议"];

export function Gdf3e05UnderstandingMachineMapLab() {
  return (
    <GdfPlayerContractLab
      title="第5章 理解机器 · 玩家合同"
      focus="第5章 理解机器"
      stages={stages}
    />
  );
}

export function Gdf3e05UnderstandingMachineExperimentLab() {
  return (
    <GdfPrototypeExperimentLab
      title="第5章 理解机器 · 原型实验"
      focus="选择、挑战与反馈"
      stages={stages}
    />
  );
}

export function Gdf3e05UnderstandingMachineEvidenceLab() {
  return (
    <GdfPlaytestEvidenceLab
      title="第5章 理解机器 · 试玩证据"
      focus="正常、边界与反例"
      stages={stages}
    />
  );
}
