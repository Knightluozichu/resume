import { UnityNetworkEvidenceLab } from "./official-unity-network-lab";

const nodes = [
  "建立角色与场景",
  "接入 NetManager",
  "进入并同步列表",
  "校验移动与离开",
  "判定攻击伤害死亡",
  "乱序重放后签发",
] as const;

export function Umm03BattleRoyaleMapLab() {
  return (
    <UnityNetworkEvidenceLab
      title="第3章 实践出真知：大乱斗游戏"
      label="第3章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Umm03BattleRoyaleExperimentLab() {
  return (
    <UnityNetworkEvidenceLab
      title="正常、边界与失败样本"
      label="第3章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Umm03BattleRoyaleEvidenceLab() {
  return (
    <UnityNetworkEvidenceLab
      title="双端证据与阶段门"
      label="第3章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
