import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "盘点双端能力",
  "选择主攻角色",
  "补齐机制缺口",
  "完成纵向作品",
  "采集运行证据",
  "复盘并更新路线",
] as const;

export function UcnAfterwordCareerDevelopmentMapLab() {
  return (
    <UnityCppEvidenceLab
      title="后记：从全书能力图到个人发展路线"
      label="后记"
      nodes={nodes}
      mode="map"
    />
  );
}

export function UcnAfterwordCareerDevelopmentExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="作品集、边界样本与反馈闭环"
      label="后记"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function UcnAfterwordCareerDevelopmentEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="能力证据与路线签发"
      label="后记"
      nodes={nodes}
      mode="evidence"
    />
  );
}
