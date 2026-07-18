import { UnityCreatorEvidenceLab } from "./official-unity-creator-lab";

const nodes = [
  "世界基线",
  "资产契约",
  "规则轨迹",
  "反馈输入",
  "平台构建",
  "性能签发",
] as const;

export function UmsOfficialFinalReviewMapLab() {
  return (
    <UnityCreatorEvidenceLab
      title="《Unity神技达人炼成记》全书综合验收"
      label="综合验收"
      nodes={nodes}
      mode="map"
    />
  );
}

export function UmsOfficialFinalReviewExperimentLab() {
  return (
    <UnityCreatorEvidenceLab
      title="正常、边界与失败样本"
      label="综合验收"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function UmsOfficialFinalReviewEvidenceLab() {
  return (
    <UnityCreatorEvidenceLab
      title="交付证据与阶段门"
      label="综合验收"
      nodes={nodes}
      mode="evidence"
    />
  );
}
