import { UnityNetworkEvidenceLab } from "./official-unity-network-lab";

const nodes = [
  "定义连接状态",
  "发起异步操作",
  "收集就绪集合",
  "消费部分读写",
  "施加队列背压",
  "取消排空并签发",
] as const;

export function Umm02AsyncMultiplexingMapLab() {
  return (
    <UnityNetworkEvidenceLab
      title="第2章 分身有术：异步和多路复用"
      label="第2章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Umm02AsyncMultiplexingExperimentLab() {
  return (
    <UnityNetworkEvidenceLab
      title="正常、边界与失败样本"
      label="第2章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Umm02AsyncMultiplexingEvidenceLab() {
  return (
    <UnityNetworkEvidenceLab
      title="双端证据与阶段门"
      label="第2章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
