import {
  GmpRouteMapLab,
  GmpEffortExperimentLab,
  GmpLearningEvidenceLab,
} from "./official-gmp-lab";

const stages = ["目标岗位", "前置缺口", "单一主线", "能力作品", "复核决议"];

export function Gmp1703SoftwareDevelopmentMapLab() {
  return (
    <GmpRouteMapLab
      title="3. 软件开发 · 路线图"
      focus="3. 软件开发"
      stages={stages}
    />
  );
}

export function Gmp1703SoftwareDevelopmentExperimentLab() {
  return (
    <GmpEffortExperimentLab
      title="3. 软件开发 · 投入实验"
      focus="时间、并行与验证"
      stages={stages}
    />
  );
}

export function Gmp1703SoftwareDevelopmentEvidenceLab() {
  return (
    <GmpLearningEvidenceLab
      title="3. 软件开发 · 能力证据"
      focus="作品、边界与交接"
      stages={stages}
    />
  );
}
