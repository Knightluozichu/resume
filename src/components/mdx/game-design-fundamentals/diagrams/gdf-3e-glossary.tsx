import {
  GdfPlayerContractLab,
  GdfPrototypeExperimentLab,
  GdfPlaytestEvidenceLab,
} from "./official-gdf-lab";

const stages = ["体验承诺", "规则状态", "问题原型", "玩家观察", "版本决议"];

export function Gdf3eGlossaryMapLab() {
  return (
    <GdfPlayerContractLab
      title="术语表 Glossary · 玩家合同"
      focus="术语表 Glossary"
      stages={stages}
    />
  );
}

export function Gdf3eGlossaryExperimentLab() {
  return (
    <GdfPrototypeExperimentLab
      title="术语表 Glossary · 原型实验"
      focus="选择、挑战与反馈"
      stages={stages}
    />
  );
}

export function Gdf3eGlossaryEvidenceLab() {
  return (
    <GdfPlaytestEvidenceLab
      title="术语表 Glossary · 试玩证据"
      focus="正常、边界与反例"
      stages={stages}
    />
  );
}
