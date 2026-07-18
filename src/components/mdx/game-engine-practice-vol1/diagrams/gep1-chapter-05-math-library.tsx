import { OfficialGep1Lab } from "./official-gep1-lab";

const props = {
  unitId: "gep1-chapter-05-math-library",
  title: "第5章 数学库",
  nodes: [
    "冻结数值约定",
    "实现基础类型",
    "组合空间变换",
    "构建几何单元",
    "运行性质测试",
  ],
  focuses: ["浮点误差", "空间语义", "SIMD布局", "几何鲁棒", "性质验证"],
};

export function Gep1Chapter05MathLibraryMapLab() {
  return <OfficialGep1Lab {...props} initialView="map" />;
}
export function Gep1Chapter05MathLibraryExperimentLab() {
  return <OfficialGep1Lab {...props} initialView="experiment" />;
}
export function Gep1Chapter05MathLibraryEvidenceLab() {
  return <OfficialGep1Lab {...props} initialView="evidence" />;
}
