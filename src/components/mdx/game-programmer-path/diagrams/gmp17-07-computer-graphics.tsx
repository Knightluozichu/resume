import {
  GmpRouteMapLab,
  GmpEffortExperimentLab,
  GmpLearningEvidenceLab,
} from "./official-gmp-lab";

const stages = ["目标岗位", "前置缺口", "单一主线", "能力作品", "复核决议"];

export function Gmp1707ComputerGraphicsMapLab() {
  return (
    <GmpRouteMapLab
      title="7. 计算机图形学（CG） · 路线图"
      focus="7. 计算机图形学（CG）"
      stages={stages}
    />
  );
}

export function Gmp1707ComputerGraphicsExperimentLab() {
  return (
    <GmpEffortExperimentLab
      title="7. 计算机图形学（CG） · 投入实验"
      focus="时间、并行与验证"
      stages={stages}
    />
  );
}

export function Gmp1707ComputerGraphicsEvidenceLab() {
  return (
    <GmpLearningEvidenceLab
      title="7. 计算机图形学（CG） · 能力证据"
      focus="作品、边界与交接"
      stages={stages}
    />
  );
}
