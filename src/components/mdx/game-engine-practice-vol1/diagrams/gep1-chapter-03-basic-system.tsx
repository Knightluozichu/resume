import { OfficialGep1Lab } from "./official-gep1-lab";

const props = {
  unitId: "gep1-chapter-03-basic-system",
  title: "第3章 基本系统",
  nodes: [
    "固定构建环境",
    "初始化底层工程",
    "分配并标记内存",
    "检查类型关系",
    "逆序回收",
  ],
  focuses: ["构建一致", "内存对齐", "泄漏归因", "平台抽象", "关闭完整"],
};

export function Gep1Chapter03BasicSystemMapLab() {
  return <OfficialGep1Lab {...props} initialView="map" />;
}
export function Gep1Chapter03BasicSystemExperimentLab() {
  return <OfficialGep1Lab {...props} initialView="experiment" />;
}
export function Gep1Chapter03BasicSystemEvidenceLab() {
  return <OfficialGep1Lab {...props} initialView="evidence" />;
}
