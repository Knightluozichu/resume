import {
  GdfPlayerContractLab,
  GdfPrototypeExperimentLab,
  GdfPlaytestEvidenceLab,
} from "./official-gdf-lab";

const stages = ["体验承诺", "规则状态", "问题原型", "玩家观察", "版本决议"];

export function Gdf3e04UnderstandingPlayerMapLab() {
  return (
    <GdfPlayerContractLab
      title="第4章 理解玩家 · 玩家合同"
      focus="第4章 理解玩家"
      stages={stages}
    />
  );
}

export function Gdf3e04UnderstandingPlayerExperimentLab() {
  return (
    <GdfPrototypeExperimentLab
      title="第4章 理解玩家 · 原型实验"
      focus="选择、挑战与反馈"
      stages={stages}
    />
  );
}

export function Gdf3e04UnderstandingPlayerEvidenceLab() {
  return (
    <GdfPlaytestEvidenceLab
      title="第4章 理解玩家 · 试玩证据"
      focus="正常、边界与反例"
      stages={stages}
    />
  );
}
