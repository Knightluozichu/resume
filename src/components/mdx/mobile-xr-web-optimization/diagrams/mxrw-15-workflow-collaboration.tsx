import { MobileXrWebEvidenceLab } from "./official-mobile-xr-web-lab";

const nodes = [
  "版本提交",
  "场景分区",
  "资产依赖",
  "自动构建",
  "内容审计",
  "团队签发",
] as const;

export function Mxrw15WorkflowCollaborationMapLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单元15：Workflow、版本控制与大场景协作"
      label="官方单元 15"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Mxrw15WorkflowCollaborationExperimentLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单元15：Workflow、版本控制与大场景协作"
      label="官方单元 15"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Mxrw15WorkflowCollaborationEvidenceLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单元15：Workflow、版本控制与大场景协作"
      label="官方单元 15"
      nodes={nodes}
      mode="evidence"
    />
  );
}
