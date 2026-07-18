import {
  GmpRouteMapLab,
  GmpEffortExperimentLab,
  GmpLearningEvidenceLab,
} from "./official-gmp-lab";

const stages = ["目标岗位", "前置缺口", "单一主线", "能力作品", "复核决议"];

export function Gmp17OfficialFinalReviewMapLab() {
  return (
    <GmpRouteMapLab
      title="《游戏程序员的学习之路》全图综合验收 · 路线图"
      focus="《游戏程序员的学习之路》全图综合验收"
      stages={stages}
    />
  );
}

export function Gmp17OfficialFinalReviewExperimentLab() {
  return (
    <GmpEffortExperimentLab
      title="《游戏程序员的学习之路》全图综合验收 · 投入实验"
      focus="时间、并行与验证"
      stages={stages}
    />
  );
}

export function Gmp17OfficialFinalReviewEvidenceLab() {
  return (
    <GmpLearningEvidenceLab
      title="《游戏程序员的学习之路》全图综合验收 · 能力证据"
      focus="作品、边界与交接"
      stages={stages}
    />
  );
}
