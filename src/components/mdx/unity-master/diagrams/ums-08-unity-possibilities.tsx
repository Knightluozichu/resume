import { UnityCreatorEvidenceLab } from "./official-unity-creator-lab";

const nodes = [
  "能力需求",
  "SDK适配器",
  "坐标校准",
  "事件归一化",
  "断连回退",
  "设备验收",
] as const;

export function Ums08UnityPossibilitiesMapLab() {
  return (
    <UnityCreatorEvidenceLab
      title="第八章 Unity的可能性"
      label="第八章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ums08UnityPossibilitiesExperimentLab() {
  return (
    <UnityCreatorEvidenceLab
      title="正常、边界与失败样本"
      label="第八章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ums08UnityPossibilitiesEvidenceLab() {
  return (
    <UnityCreatorEvidenceLab
      title="交付证据与阶段门"
      label="第八章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
