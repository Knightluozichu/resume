import { UnityNetworkEvidenceLab } from "./official-unity-network-lab";

const nodes = [
  "设计战斗协议",
  "检查开战门槛",
  "生成初始快照",
  "管理客户端坦克",
  "服务端判定结算",
  "断线重放后签发",
] as const;

export function Umm11BattleResultMapLab() {
  return (
    <UnityNetworkEvidenceLab
      title="第11章 战斗和胜负判定"
      label="第11章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Umm11BattleResultExperimentLab() {
  return (
    <UnityNetworkEvidenceLab
      title="正常、边界与失败样本"
      label="第11章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Umm11BattleResultEvidenceLab() {
  return (
    <UnityNetworkEvidenceLab
      title="双端证据与阶段门"
      label="第11章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
