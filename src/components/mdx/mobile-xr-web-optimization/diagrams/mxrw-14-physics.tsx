import { MobileXrWebEvidenceLab } from "./official-mobile-xr-web-lab";

const nodes = [
  "碰撞几何",
  "层与Broadphase",
  "固定步长",
  "求解同步",
  "查询批处理",
  "玩法复验",
] as const;

export function Mxrw14PhysicsMapLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单元14：Physics碰撞、步长与无分配查询"
      label="官方单元 14"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Mxrw14PhysicsExperimentLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单元14：Physics碰撞、步长与无分配查询"
      label="官方单元 14"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Mxrw14PhysicsEvidenceLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单元14：Physics碰撞、步长与无分配查询"
      label="官方单元 14"
      nodes={nodes}
      mode="evidence"
    />
  );
}
