import { UnityCreatorEvidenceLab } from "./official-unity-creator-lab";

const nodes = [
  "体验目标",
  "媒介清单",
  "工具环境",
  "最小项目",
  "运行观察",
  "学习边界",
] as const;

export function Ums00PrologueCreativeSpaceMapLab() {
  return (
    <UnityCreatorEvidenceLab
      title="序章 制作空间的乐趣"
      label="序章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ums00PrologueCreativeSpaceExperimentLab() {
  return (
    <UnityCreatorEvidenceLab
      title="正常、边界与失败样本"
      label="序章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ums00PrologueCreativeSpaceEvidenceLab() {
  return (
    <UnityCreatorEvidenceLab
      title="交付证据与阶段门"
      label="序章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
