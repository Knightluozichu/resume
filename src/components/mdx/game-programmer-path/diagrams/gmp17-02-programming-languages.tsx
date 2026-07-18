import {
  GmpRouteMapLab,
  GmpEffortExperimentLab,
  GmpLearningEvidenceLab,
} from "./official-gmp-lab";

const stages = ["目标岗位", "前置缺口", "单一主线", "能力作品", "复核决议"];

export function Gmp1702ProgrammingLanguagesMapLab() {
  return (
    <GmpRouteMapLab
      title="2. 编程语言 · 路线图"
      focus="2. 编程语言"
      stages={stages}
    />
  );
}

export function Gmp1702ProgrammingLanguagesExperimentLab() {
  return (
    <GmpEffortExperimentLab
      title="2. 编程语言 · 投入实验"
      focus="时间、并行与验证"
      stages={stages}
    />
  );
}

export function Gmp1702ProgrammingLanguagesEvidenceLab() {
  return (
    <GmpLearningEvidenceLab
      title="2. 编程语言 · 能力证据"
      focus="作品、边界与交接"
      stages={stages}
    />
  );
}
