import { UnityCreatorEvidenceLab } from "./official-unity-creator-lab";

const nodes = [
  "制作需求",
  "工具输入",
  "导出约定",
  "授权审查",
  "Unity导入",
  "运行验收",
] as const;

export function UmsAppendixToolsAssetsMapLab() {
  return (
    <UnityCreatorEvidenceLab
      title="附录 外部工具与推荐Assets"
      label="附录"
      nodes={nodes}
      mode="map"
    />
  );
}

export function UmsAppendixToolsAssetsExperimentLab() {
  return (
    <UnityCreatorEvidenceLab
      title="正常、边界与失败样本"
      label="附录"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function UmsAppendixToolsAssetsEvidenceLab() {
  return (
    <UnityCreatorEvidenceLab
      title="交付证据与阶段门"
      label="附录"
      nodes={nodes}
      mode="evidence"
    />
  );
}
