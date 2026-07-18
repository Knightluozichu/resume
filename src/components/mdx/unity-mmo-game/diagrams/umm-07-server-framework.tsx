import { UnityNetworkEvidenceLab } from "./official-unity-network-lab";

const nodes = [
  "划分服务端模块",
  "驱动 Select 与计时器",
  "解码并分发协议",
  "建立玩家会话",
  "事务化读写 MySQL",
  "断线重登后签发",
] as const;

export function Umm07ServerFrameworkMapLab() {
  return (
    <UnityNetworkEvidenceLab
      title="第7章 通用服务端框架"
      label="第7章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Umm07ServerFrameworkExperimentLab() {
  return (
    <UnityNetworkEvidenceLab
      title="正常、边界与失败样本"
      label="第7章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Umm07ServerFrameworkEvidenceLab() {
  return (
    <UnityNetworkEvidenceLab
      title="双端证据与阶段门"
      label="第7章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
