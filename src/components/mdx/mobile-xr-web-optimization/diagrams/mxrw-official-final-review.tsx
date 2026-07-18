import { MobileXrWebEvidenceLab } from "./official-mobile-xr-web-lab";

const nodes = [
  "三平台合同",
  "系统基线",
  "单变量修复",
  "平台专项",
  "自动回归",
  "发布签发",
] as const;

export function MxrwOfficialFinalReviewMapLab() {
  return (
    <MobileXrWebEvidenceLab
      title="《Unity 6移动、XR与Web游戏性能优化》全书综合验收"
      label="全书总验收"
      nodes={nodes}
      mode="map"
    />
  );
}

export function MxrwOfficialFinalReviewExperimentLab() {
  return (
    <MobileXrWebEvidenceLab
      title="《Unity 6移动、XR与Web游戏性能优化》全书综合验收"
      label="全书总验收"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function MxrwOfficialFinalReviewEvidenceLab() {
  return (
    <MobileXrWebEvidenceLab
      title="《Unity 6移动、XR与Web游戏性能优化》全书综合验收"
      label="全书总验收"
      nodes={nodes}
      mode="evidence"
    />
  );
}
