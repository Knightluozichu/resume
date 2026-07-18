import {
  GmpRouteMapLab,
  GmpEffortExperimentLab,
  GmpLearningEvidenceLab,
} from "./official-gmp-lab";

const stages = ["目标岗位", "前置缺口", "单一主线", "能力作品", "复核决议"];

export function Gmp1701ComputerScienceMapLab() {
  return (
    <GmpRouteMapLab
      title="1. 计算机科学 · 路线图"
      focus="1. 计算机科学"
      stages={stages}
    />
  );
}

export function Gmp1701ComputerScienceExperimentLab() {
  return (
    <GmpEffortExperimentLab
      title="1. 计算机科学 · 投入实验"
      focus="时间、并行与验证"
      stages={stages}
    />
  );
}

export function Gmp1701ComputerScienceEvidenceLab() {
  return (
    <GmpLearningEvidenceLab
      title="1. 计算机科学 · 能力证据"
      focus="作品、边界与交接"
      stages={stages}
    />
  );
}
