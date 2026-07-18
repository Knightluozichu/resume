import { UnityNetworkEvidenceLab } from "./official-unity-network-lab";

const nodes = [
  "核对版本与 ISBN",
  "映射十二章目录",
  "完成网络基础闭环",
  "完成双端框架",
  "完成坦克项目",
  "全链故障签发",
] as const;

export function UmmOfficialLearningMapMapLab() {
  return (
    <UnityNetworkEvidenceLab
      title="《Unity3D网络游戏实战（第2版）》权威学习地图"
      label="全书导览"
      nodes={nodes}
      mode="map"
    />
  );
}

export function UmmOfficialLearningMapExperimentLab() {
  return (
    <UnityNetworkEvidenceLab
      title="正常、边界与失败样本"
      label="全书导览"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function UmmOfficialLearningMapEvidenceLab() {
  return (
    <UnityNetworkEvidenceLab
      title="双端证据与阶段门"
      label="全书导览"
      nodes={nodes}
      mode="evidence"
    />
  );
}
