import {
  GmpRouteMapLab,
  GmpEffortExperimentLab,
  GmpLearningEvidenceLab,
} from "./official-gmp-lab";

const stages = ["目标岗位", "前置缺口", "单一主线", "能力作品", "复核决议"];

export function Gmp1706GameEngineDevelopmentMapLab() {
  return (
    <GmpRouteMapLab
      title="6. 游戏引擎开发 · 路线图"
      focus="6. 游戏引擎开发"
      stages={stages}
    />
  );
}

export function Gmp1706GameEngineDevelopmentExperimentLab() {
  return (
    <GmpEffortExperimentLab
      title="6. 游戏引擎开发 · 投入实验"
      focus="时间、并行与验证"
      stages={stages}
    />
  );
}

export function Gmp1706GameEngineDevelopmentEvidenceLab() {
  return (
    <GmpLearningEvidenceLab
      title="6. 游戏引擎开发 · 能力证据"
      focus="作品、边界与交接"
      stages={stages}
    />
  );
}
