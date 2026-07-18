import {
  GdfPlayerContractLab,
  GdfPrototypeExperimentLab,
  GdfPlaytestEvidenceLab,
} from "./official-gdf-lab";

const stages = ["体验承诺", "规则状态", "问题原型", "玩家观察", "版本决议"];

export function Gdf3e12CreatingUserExperienceMapLab() {
  return (
    <GdfPlayerContractLab
      title="第12章 创建用户体验 · 玩家合同"
      focus="第12章 创建用户体验"
      stages={stages}
    />
  );
}

export function Gdf3e12CreatingUserExperienceExperimentLab() {
  return (
    <GdfPrototypeExperimentLab
      title="第12章 创建用户体验 · 原型实验"
      focus="选择、挑战与反馈"
      stages={stages}
    />
  );
}

export function Gdf3e12CreatingUserExperienceEvidenceLab() {
  return (
    <GdfPlaytestEvidenceLab
      title="第12章 创建用户体验 · 试玩证据"
      focus="正常、边界与反例"
      stages={stages}
    />
  );
}
