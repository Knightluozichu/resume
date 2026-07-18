import {
  GmpRouteMapLab,
  GmpEffortExperimentLab,
  GmpLearningEvidenceLab,
} from "./official-gmp-lab";

const stages = ["目标岗位", "前置缺口", "单一主线", "能力作品", "复核决议"];

export function Gmp1711MultiplayerProgrammingMapLab() {
  return (
    <GmpRouteMapLab
      title="11. 多人游戏编程 · 路线图"
      focus="11. 多人游戏编程"
      stages={stages}
    />
  );
}

export function Gmp1711MultiplayerProgrammingExperimentLab() {
  return (
    <GmpEffortExperimentLab
      title="11. 多人游戏编程 · 投入实验"
      focus="时间、并行与验证"
      stages={stages}
    />
  );
}

export function Gmp1711MultiplayerProgrammingEvidenceLab() {
  return (
    <GmpLearningEvidenceLab
      title="11. 多人游戏编程 · 能力证据"
      focus="作品、边界与交接"
      stages={stages}
    />
  );
}
