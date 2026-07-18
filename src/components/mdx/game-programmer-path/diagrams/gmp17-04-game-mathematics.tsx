import {
  GmpRouteMapLab,
  GmpEffortExperimentLab,
  GmpLearningEvidenceLab,
} from "./official-gmp-lab";

const stages = ["目标岗位", "前置缺口", "单一主线", "能力作品", "复核决议"];

export function Gmp1704GameMathematicsMapLab() {
  return (
    <GmpRouteMapLab
      title="4. 游戏程序员的数学课 · 路线图"
      focus="4. 游戏程序员的数学课"
      stages={stages}
    />
  );
}

export function Gmp1704GameMathematicsExperimentLab() {
  return (
    <GmpEffortExperimentLab
      title="4. 游戏程序员的数学课 · 投入实验"
      focus="时间、并行与验证"
      stages={stages}
    />
  );
}

export function Gmp1704GameMathematicsEvidenceLab() {
  return (
    <GmpLearningEvidenceLab
      title="4. 游戏程序员的数学课 · 能力证据"
      focus="作品、边界与交接"
      stages={stages}
    />
  );
}
