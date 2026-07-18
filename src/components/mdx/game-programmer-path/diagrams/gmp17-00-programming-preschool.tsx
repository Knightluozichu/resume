import {
  GmpRouteMapLab,
  GmpEffortExperimentLab,
  GmpLearningEvidenceLab,
} from "./official-gmp-lab";

const stages = ["目标岗位", "前置缺口", "单一主线", "能力作品", "复核决议"];

export function Gmp1700ProgrammingPreschoolMapLab() {
  return (
    <GmpRouteMapLab
      title="0. 编程学前班 · 路线图"
      focus="0. 编程学前班"
      stages={stages}
    />
  );
}

export function Gmp1700ProgrammingPreschoolExperimentLab() {
  return (
    <GmpEffortExperimentLab
      title="0. 编程学前班 · 投入实验"
      focus="时间、并行与验证"
      stages={stages}
    />
  );
}

export function Gmp1700ProgrammingPreschoolEvidenceLab() {
  return (
    <GmpLearningEvidenceLab
      title="0. 编程学前班 · 能力证据"
      focus="作品、边界与交接"
      stages={stages}
    />
  );
}
