import {
  GmpRouteMapLab,
  GmpEffortExperimentLab,
  GmpLearningEvidenceLab,
} from "./official-gmp-lab";

const stages = ["目标岗位", "前置缺口", "单一主线", "能力作品", "复核决议"];

export function Gmp1708GameAudioMapLab() {
  return (
    <GmpRouteMapLab
      title="8. 游戏音效 · 路线图"
      focus="8. 游戏音效"
      stages={stages}
    />
  );
}

export function Gmp1708GameAudioExperimentLab() {
  return (
    <GmpEffortExperimentLab
      title="8. 游戏音效 · 投入实验"
      focus="时间、并行与验证"
      stages={stages}
    />
  );
}

export function Gmp1708GameAudioEvidenceLab() {
  return (
    <GmpLearningEvidenceLab
      title="8. 游戏音效 · 能力证据"
      focus="作品、边界与交接"
      stages={stages}
    />
  );
}
