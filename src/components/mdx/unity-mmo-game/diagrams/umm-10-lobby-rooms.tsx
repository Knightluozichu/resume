import { UnityNetworkEvidenceLab } from "./official-unity-network-lab";

const nodes = [
  "定义大厅房间协议",
  "构建两类面板",
  "分离持久临时数据",
  "实现 Room 不变量",
  "管理房主阵营广播",
  "并发进离后签发",
] as const;

export function Umm10LobbyRoomsMapLab() {
  return (
    <UnityNetworkEvidenceLab
      title="第10章 游戏大厅和房间"
      label="第10章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Umm10LobbyRoomsExperimentLab() {
  return (
    <UnityNetworkEvidenceLab
      title="正常、边界与失败样本"
      label="第10章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Umm10LobbyRoomsEvidenceLab() {
  return (
    <UnityNetworkEvidenceLab
      title="双端证据与阶段门"
      label="第10章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
