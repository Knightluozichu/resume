import { UnityCreatorEvidenceLab } from "./official-unity-creator-lab";

const nodes = [
  "书籍身份",
  "创造世界",
  "对象资产",
  "规则反馈",
  "平台扩展",
  "优化交付",
] as const;

export function UmsOfficialLearningMapMapLab() {
  return (
    <UnityCreatorEvidenceLab
      title="《Unity神技达人炼成记》权威学习地图"
      label="全书导览"
      nodes={nodes}
      mode="map"
    />
  );
}

export function UmsOfficialLearningMapExperimentLab() {
  return (
    <UnityCreatorEvidenceLab
      title="正常、边界与失败样本"
      label="全书导览"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function UmsOfficialLearningMapEvidenceLab() {
  return (
    <UnityCreatorEvidenceLab
      title="交付证据与阶段门"
      label="全书导览"
      nodes={nodes}
      mode="evidence"
    />
  );
}
