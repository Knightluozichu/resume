import { UnityCreatorEvidenceLab } from "./official-unity-creator-lab";

const nodes = [
  "状态边界",
  "事件入口",
  "条件分支",
  "Action副作用",
  "脚本通信",
  "模板复用",
] as const;

export function Ums09PlaymakerVisualScriptingMapLab() {
  return (
    <UnityCreatorEvidenceLab
      title="第九章 使用playMaker插件"
      label="第九章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ums09PlaymakerVisualScriptingExperimentLab() {
  return (
    <UnityCreatorEvidenceLab
      title="正常、边界与失败样本"
      label="第九章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ums09PlaymakerVisualScriptingEvidenceLab() {
  return (
    <UnityCreatorEvidenceLab
      title="交付证据与阶段门"
      label="第九章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
