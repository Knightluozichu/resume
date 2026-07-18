import { UnityCreatorEvidenceLab } from "./official-unity-creator-lab";

const nodes = [
  "设备预算",
  "基线采样",
  "瓶颈归类",
  "单项改动",
  "画质对照",
  "回归签发",
] as const;

export function Ums10OptimizationAndProMapLab() {
  return (
    <UnityCreatorEvidenceLab
      title="第十章 优化和Professional版"
      label="第十章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ums10OptimizationAndProExperimentLab() {
  return (
    <UnityCreatorEvidenceLab
      title="正常、边界与失败样本"
      label="第十章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ums10OptimizationAndProEvidenceLab() {
  return (
    <UnityCreatorEvidenceLab
      title="交付证据与阶段门"
      label="第十章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
