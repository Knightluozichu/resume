import { UnityNetworkEvidenceLab } from "./official-unity-network-lab";

const nodes = [
  "按层定位失败",
  "观察握手与状态",
  "量化缓冲和小包",
  "设计优雅关闭",
  "分类异常与心跳",
  "网络中断后签发",
] as const;

export function Umm05DeepTcpMapLab() {
  return (
    <UnityNetworkEvidenceLab
      title="第5章 深入了解TCP，解决暗藏问题"
      label="第5章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Umm05DeepTcpExperimentLab() {
  return (
    <UnityNetworkEvidenceLab
      title="正常、边界与失败样本"
      label="第5章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Umm05DeepTcpEvidenceLab() {
  return (
    <UnityNetworkEvidenceLab
      title="双端证据与阶段门"
      label="第5章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
