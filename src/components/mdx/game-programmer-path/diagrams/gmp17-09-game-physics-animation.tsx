import {
  GmpRouteMapLab,
  GmpEffortExperimentLab,
  GmpLearningEvidenceLab,
} from "./official-gmp-lab";

const stages = ["目标岗位", "前置缺口", "单一主线", "能力作品", "复核决议"];

export function Gmp1709GamePhysicsAnimationMapLab() {
  return (
    <GmpRouteMapLab
      title="9. 游戏物理和动画 · 路线图"
      focus="9. 游戏物理和动画"
      stages={stages}
    />
  );
}

export function Gmp1709GamePhysicsAnimationExperimentLab() {
  return (
    <GmpEffortExperimentLab
      title="9. 游戏物理和动画 · 投入实验"
      focus="时间、并行与验证"
      stages={stages}
    />
  );
}

export function Gmp1709GamePhysicsAnimationEvidenceLab() {
  return (
    <GmpLearningEvidenceLab
      title="9. 游戏物理和动画 · 能力证据"
      focus="作品、边界与交接"
      stages={stages}
    />
  );
}
