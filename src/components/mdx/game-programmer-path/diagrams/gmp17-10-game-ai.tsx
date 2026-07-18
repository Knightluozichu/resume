import {
  GmpRouteMapLab,
  GmpEffortExperimentLab,
  GmpLearningEvidenceLab,
} from "./official-gmp-lab";

const stages = ["目标岗位", "前置缺口", "单一主线", "能力作品", "复核决议"];

export function Gmp1710GameAiMapLab() {
  return (
    <GmpRouteMapLab
      title="10. 游戏人工智能（AI） · 路线图"
      focus="10. 游戏人工智能（AI）"
      stages={stages}
    />
  );
}

export function Gmp1710GameAiExperimentLab() {
  return (
    <GmpEffortExperimentLab
      title="10. 游戏人工智能（AI） · 投入实验"
      focus="时间、并行与验证"
      stages={stages}
    />
  );
}

export function Gmp1710GameAiEvidenceLab() {
  return (
    <GmpLearningEvidenceLab
      title="10. 游戏人工智能（AI） · 能力证据"
      focus="作品、边界与交接"
      stages={stages}
    />
  );
}
