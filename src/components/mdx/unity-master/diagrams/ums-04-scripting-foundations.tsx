import { UnityCreatorEvidenceLab } from "./official-unity-creator-lab";

const nodes = [
  "事件入口",
  "状态类型",
  "控制流",
  "场景引用",
  "物理输入",
  "持久化管理",
] as const;

export function Ums04ScriptingFoundationsMapLab() {
  return (
    <UnityCreatorEvidenceLab
      title="第四章 脚本基础知识"
      label="第四章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ums04ScriptingFoundationsExperimentLab() {
  return (
    <UnityCreatorEvidenceLab
      title="正常、边界与失败样本"
      label="第四章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ums04ScriptingFoundationsEvidenceLab() {
  return (
    <UnityCreatorEvidenceLab
      title="交付证据与阶段门"
      label="第四章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
