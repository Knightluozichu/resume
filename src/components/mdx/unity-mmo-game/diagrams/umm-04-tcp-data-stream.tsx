import { UnityNetworkEvidenceLab } from "./official-unity-network-lab";

const nodes = [
  "定义帧头与上限",
  "累积任意分片",
  "按字节序读长度",
  "循环提取完整帧",
  "排队完成部分发送",
  "模糊分片后签发",
] as const;

export function Umm04TcpDataStreamMapLab() {
  return (
    <UnityNetworkEvidenceLab
      title="第4章 正确收发数据流"
      label="第4章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Umm04TcpDataStreamExperimentLab() {
  return (
    <UnityNetworkEvidenceLab
      title="正常、边界与失败样本"
      label="第4章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Umm04TcpDataStreamEvidenceLab() {
  return (
    <UnityNetworkEvidenceLab
      title="双端证据与阶段门"
      label="第4章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
