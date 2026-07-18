import {
  GdfPlayerContractLab,
  GdfPrototypeExperimentLab,
  GdfPlaytestEvidenceLab,
} from "./official-gdf-lab";

const stages = ["体验承诺", "规则状态", "问题原型", "玩家观察", "版本决议"];

export function Gdf3e09CreativeExpressivePlayMapLab() {
  return (
    <GdfPlayerContractLab
      title="第9章 创造性与表达性玩法 · 玩家合同"
      focus="第9章 创造性与表达性玩法"
      stages={stages}
    />
  );
}

export function Gdf3e09CreativeExpressivePlayExperimentLab() {
  return (
    <GdfPrototypeExperimentLab
      title="第9章 创造性与表达性玩法 · 原型实验"
      focus="选择、挑战与反馈"
      stages={stages}
    />
  );
}

export function Gdf3e09CreativeExpressivePlayEvidenceLab() {
  return (
    <GdfPlaytestEvidenceLab
      title="第9章 创造性与表达性玩法 · 试玩证据"
      focus="正常、边界与反例"
      stages={stages}
    />
  );
}
