import { OfficialCc2eBookLab } from "./official-cc2e-book-lab";

const props = {
  unitId: "cc2e-official-learning-map",
  title: "《代码大全（第2版）》权威学习地图",
  nodes: ["构建基础", "代码结构", "数据控制", "质量改善", "系统工艺"],
  focuses: ["49个单元", "685个节点", "七部分依赖", "实践顺序", "证据闭环"],
} as const;

export function Cc2eOfficialLearningMapStructureLab() {
  return <OfficialCc2eBookLab {...props} mode="structure" />;
}

export function Cc2eOfficialLearningMapTestLab() {
  return <OfficialCc2eBookLab {...props} mode="test" />;
}

export function Cc2eOfficialLearningMapEvidenceLab() {
  return <OfficialCc2eBookLab {...props} mode="evidence" />;
}
