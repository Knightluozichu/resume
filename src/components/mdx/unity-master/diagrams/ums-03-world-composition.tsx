import { UnityCreatorEvidenceLab } from "./official-unity-creator-lab";

const nodes = [
  "资产意图",
  "形体拓扑",
  "UV材质",
  "骨骼动画",
  "导入设置",
  "灯光验收",
] as const;

export function Ums03WorldCompositionMapLab() {
  return (
    <UnityCreatorEvidenceLab
      title="第三章 世界的构成"
      label="第三章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ums03WorldCompositionExperimentLab() {
  return (
    <UnityCreatorEvidenceLab
      title="正常、边界与失败样本"
      label="第三章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ums03WorldCompositionEvidenceLab() {
  return (
    <UnityCreatorEvidenceLab
      title="交付证据与阶段门"
      label="第三章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
