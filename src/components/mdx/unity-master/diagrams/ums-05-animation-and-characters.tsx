import { UnityCreatorEvidenceLab } from "./official-unity-creator-lab";

const nodes = [
  "动作资产",
  "Avatar绑定",
  "状态参数",
  "混合过渡",
  "导航目标",
  "时序验收",
] as const;

export function Ums05AnimationAndCharactersMapLab() {
  return (
    <UnityCreatorEvidenceLab
      title="第五章 动画和角色"
      label="第五章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ums05AnimationAndCharactersExperimentLab() {
  return (
    <UnityCreatorEvidenceLab
      title="正常、边界与失败样本"
      label="第五章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ums05AnimationAndCharactersEvidenceLab() {
  return (
    <UnityCreatorEvidenceLab
      title="交付证据与阶段门"
      label="第五章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
