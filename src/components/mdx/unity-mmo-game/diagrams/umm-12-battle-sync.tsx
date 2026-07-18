import { UnityNetworkEvidenceLab } from "./official-unity-network-lab";

const nodes = [
  "选择同步模型",
  "定义消息时间代际",
  "发送位置开火命中",
  "拒绝旧序号",
  "跟随预测与校正",
  "抖动丢包后签发",
] as const;

export function Umm12BattleSyncMapLab() {
  return (
    <UnityNetworkEvidenceLab
      title="第12章 同步战斗信息"
      label="第12章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Umm12BattleSyncExperimentLab() {
  return (
    <UnityNetworkEvidenceLab
      title="正常、边界与失败样本"
      label="第12章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Umm12BattleSyncEvidenceLab() {
  return (
    <UnityNetworkEvidenceLab
      title="双端证据与阶段门"
      label="第12章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
