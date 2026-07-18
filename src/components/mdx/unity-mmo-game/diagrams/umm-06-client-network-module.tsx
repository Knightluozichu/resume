import { UnityNetworkEvidenceLab } from "./official-unity-network-lab";

const nodes = [
  "冻结外部接口",
  "实现连接事件",
  "封装协议与帧",
  "串行发送完整数据",
  "主线程消费接收",
  "心跳与关闭后签发",
] as const;

export function Umm06ClientNetworkModuleMapLab() {
  return (
    <UnityNetworkEvidenceLab
      title="第6章 通用客户端网络模块"
      label="第6章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Umm06ClientNetworkModuleExperimentLab() {
  return (
    <UnityNetworkEvidenceLab
      title="正常、边界与失败样本"
      label="第6章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Umm06ClientNetworkModuleEvidenceLab() {
  return (
    <UnityNetworkEvidenceLab
      title="双端证据与阶段门"
      label="第6章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
