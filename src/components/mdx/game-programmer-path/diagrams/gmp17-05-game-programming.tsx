import {
  GmpRouteMapLab,
  GmpEffortExperimentLab,
  GmpLearningEvidenceLab,
} from "./official-gmp-lab";

const stages = ["目标岗位", "前置缺口", "单一主线", "能力作品", "复核决议"];

export function Gmp1705GameProgrammingMapLab() {
  return (
    <GmpRouteMapLab
      title="5. 游戏编程 · 路线图"
      focus="5. 游戏编程"
      stages={stages}
    />
  );
}

export function Gmp1705GameProgrammingExperimentLab() {
  return (
    <GmpEffortExperimentLab
      title="5. 游戏编程 · 投入实验"
      focus="时间、并行与验证"
      stages={stages}
    />
  );
}

export function Gmp1705GameProgrammingEvidenceLab() {
  return (
    <GmpLearningEvidenceLab
      title="5. 游戏编程 · 能力证据"
      focus="作品、边界与交接"
      stages={stages}
    />
  );
}
