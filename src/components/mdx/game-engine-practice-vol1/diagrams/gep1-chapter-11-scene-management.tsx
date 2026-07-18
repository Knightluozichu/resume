import { OfficialGep1Lab } from "./official-gep1-lab";

const props = {
  unitId: "gep1-chapter-11-scene-management",
  title: "第11章 场景管理",
  nodes: [
    "更新层级变换",
    "维护空间索引",
    "构建相机视锥",
    "筛选对象与光源",
    "提交可见集合",
  ],
  focuses: ["层级正确", "包围体保守", "索引更新", "剔除延迟", "光源影响"],
};

export function Gep1Chapter11SceneManagementMapLab() {
  return <OfficialGep1Lab {...props} initialView="map" />;
}
export function Gep1Chapter11SceneManagementExperimentLab() {
  return <OfficialGep1Lab {...props} initialView="experiment" />;
}
export function Gep1Chapter11SceneManagementEvidenceLab() {
  return <OfficialGep1Lab {...props} initialView="evidence" />;
}
