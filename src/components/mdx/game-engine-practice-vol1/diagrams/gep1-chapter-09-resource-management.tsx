import { OfficialGep1Lab } from "./official-gep1-lab";

const props = {
  unitId: "gep1-chapter-09-resource-management",
  title: "第9章 资源管理",
  nodes: [
    "解析资源身份",
    "展开依赖",
    "异步读取加工",
    "通过代理发布",
    "按预算回收",
  ],
  focuses: ["类型加载", "代理稳定", "依赖闭包", "字符串身份", "缓存预算"],
};

export function Gep1Chapter09ResourceManagementMapLab() {
  return <OfficialGep1Lab {...props} initialView="map" />;
}
export function Gep1Chapter09ResourceManagementExperimentLab() {
  return <OfficialGep1Lab {...props} initialView="experiment" />;
}
export function Gep1Chapter09ResourceManagementEvidenceLab() {
  return <OfficialGep1Lab {...props} initialView="evidence" />;
}
