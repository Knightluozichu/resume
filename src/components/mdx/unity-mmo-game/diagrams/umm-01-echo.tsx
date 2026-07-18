import { UnityNetworkEvidenceLab } from "./official-unity-network-lab";

const nodes = [
  "声明双端职责",
  "选择地址端口",
  "创建并连接 Socket",
  "循环收发字节",
  "分类关闭与异常",
  "跨网络复测签发",
] as const;

export function Umm01EchoMapLab() {
  return (
    <UnityNetworkEvidenceLab
      title="第1章 网络游戏的开端：Echo"
      label="第1章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Umm01EchoExperimentLab() {
  return (
    <UnityNetworkEvidenceLab
      title="正常、边界与失败样本"
      label="第1章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Umm01EchoEvidenceLab() {
  return (
    <UnityNetworkEvidenceLab
      title="双端证据与阶段门"
      label="第1章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
