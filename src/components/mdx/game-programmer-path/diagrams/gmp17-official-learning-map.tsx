import {
  GmpRouteMapLab,
  GmpEffortExperimentLab,
  GmpLearningEvidenceLab,
} from "./official-gmp-lab";

const stages = ["目标岗位", "前置缺口", "单一主线", "能力作品", "复核决议"];

export function Gmp17OfficialLearningMapMapLab() {
  return (
    <GmpRouteMapLab
      title="《游戏程序员的学习之路》官方图谱学习地图 · 路线图"
      focus="《游戏程序员的学习之路》官方图谱学习地图"
      stages={stages}
    />
  );
}

export function Gmp17OfficialLearningMapExperimentLab() {
  return (
    <GmpEffortExperimentLab
      title="《游戏程序员的学习之路》官方图谱学习地图 · 投入实验"
      focus="时间、并行与验证"
      stages={stages}
    />
  );
}

export function Gmp17OfficialLearningMapEvidenceLab() {
  return (
    <GmpLearningEvidenceLab
      title="《游戏程序员的学习之路》官方图谱学习地图 · 能力证据"
      focus="作品、边界与交接"
      stages={stages}
    />
  );
}
