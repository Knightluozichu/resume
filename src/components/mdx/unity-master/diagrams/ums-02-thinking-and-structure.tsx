import { UnityCreatorEvidenceLab } from "./official-unity-creator-lab";

const nodes = [
  "对象身份",
  "组件能力",
  "层级关系",
  "Prefab模板",
  "脚本事件",
  "运行状态",
] as const;

export function Ums02ThinkingAndStructureMapLab() {
  return (
    <UnityCreatorEvidenceLab
      title="第二章 思考方式与构造"
      label="第二章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ums02ThinkingAndStructureExperimentLab() {
  return (
    <UnityCreatorEvidenceLab
      title="正常、边界与失败样本"
      label="第二章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ums02ThinkingAndStructureEvidenceLab() {
  return (
    <UnityCreatorEvidenceLab
      title="交付证据与阶段门"
      label="第二章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
