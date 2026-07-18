import { UnityCreatorEvidenceLab } from "./official-unity-creator-lab";

const nodes = [
  "项目骨架",
  "光与天空",
  "地形水体",
  "动态对象",
  "播放验收",
  "WebGL构建",
] as const;

export function Ums01CreatingTheWorldMapLab() {
  return (
    <UnityCreatorEvidenceLab
      title="第一章 开天辟地"
      label="第一章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ums01CreatingTheWorldExperimentLab() {
  return (
    <UnityCreatorEvidenceLab
      title="正常、边界与失败样本"
      label="第一章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ums01CreatingTheWorldEvidenceLab() {
  return (
    <UnityCreatorEvidenceLab
      title="交付证据与阶段门"
      label="第一章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
