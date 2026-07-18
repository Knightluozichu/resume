import {
  GdfPlayerContractLab,
  GdfPrototypeExperimentLab,
  GdfPlaytestEvidenceLab,
} from "./official-gdf-lab";

const stages = ["体验承诺", "规则状态", "问题原型", "玩家观察", "版本决议"];

export function Gdf3e10CharacterDevelopmentMapLab() {
  return (
    <GdfPlayerContractLab
      title="第10章 角色开发 · 玩家合同"
      focus="第10章 角色开发"
      stages={stages}
    />
  );
}

export function Gdf3e10CharacterDevelopmentExperimentLab() {
  return (
    <GdfPrototypeExperimentLab
      title="第10章 角色开发 · 原型实验"
      focus="选择、挑战与反馈"
      stages={stages}
    />
  );
}

export function Gdf3e10CharacterDevelopmentEvidenceLab() {
  return (
    <GdfPlaytestEvidenceLab
      title="第10章 角色开发 · 试玩证据"
      focus="正常、边界与反例"
      stages={stages}
    />
  );
}
