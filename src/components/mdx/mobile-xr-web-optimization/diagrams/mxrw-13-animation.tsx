import { MobileXrWebEvidenceLab } from "./official-mobile-xr-web-lab";

const nodes = [
  "Rig选择",
  "曲线绑定",
  "可见性",
  "层级约束",
  "多角色基准",
  "动画回归",
] as const;

export function Mxrw13AnimationMapLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单元13：Animation绑定、层级与可见更新"
      label="官方单元 13"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Mxrw13AnimationExperimentLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单元13：Animation绑定、层级与可见更新"
      label="官方单元 13"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Mxrw13AnimationEvidenceLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单元13：Animation绑定、层级与可见更新"
      label="官方单元 13"
      nodes={nodes}
      mode="evidence"
    />
  );
}
