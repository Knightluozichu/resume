import { UnityNetworkEvidenceLab } from "./official-unity-network-lab";

const nodes = [
  "建立 Echo 与组帧",
  "注册登录并绑定玩家",
  "打开大厅创建房间",
  "生成战斗与坦克",
  "同步开火判定胜负",
  "断线恢复全链签发",
] as const;

export function UmmOfficialFinalReviewMapLab() {
  return (
    <UnityNetworkEvidenceLab
      title="《Unity3D网络游戏实战（第2版）》全书总复习"
      label="全书验收"
      nodes={nodes}
      mode="map"
    />
  );
}

export function UmmOfficialFinalReviewExperimentLab() {
  return (
    <UnityNetworkEvidenceLab
      title="正常、边界与失败样本"
      label="全书验收"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function UmmOfficialFinalReviewEvidenceLab() {
  return (
    <UnityNetworkEvidenceLab
      title="双端证据与阶段门"
      label="全书验收"
      nodes={nodes}
      mode="evidence"
    />
  );
}
