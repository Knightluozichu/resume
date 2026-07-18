import { MobileXrWebEvidenceLab } from "./official-mobile-xr-web-lab";

const nodes = [
  "目标平台",
  "预算基线",
  "通用系统",
  "内容管线",
  "平台专项",
  "发布门",
] as const;

export function MxrwOfficialLearningMapMapLab() {
  return (
    <MobileXrWebEvidenceLab
      title="《Unity 6移动、XR与Web游戏性能优化》权威学习地图"
      label="全书导读"
      nodes={nodes}
      mode="map"
    />
  );
}

export function MxrwOfficialLearningMapExperimentLab() {
  return (
    <MobileXrWebEvidenceLab
      title="《Unity 6移动、XR与Web游戏性能优化》权威学习地图"
      label="全书导读"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function MxrwOfficialLearningMapEvidenceLab() {
  return (
    <MobileXrWebEvidenceLab
      title="《Unity 6移动、XR与Web游戏性能优化》权威学习地图"
      label="全书导读"
      nodes={nodes}
      mode="evidence"
    />
  );
}
