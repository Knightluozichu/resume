import { OfficialGep1Lab } from "./official-gep1-lab";

const props = {
  unitId: "gep1-chapter-10-design-philosophy",
  title: "第10章 引擎的设计哲学",
  nodes: [
    "抽象世界对象",
    "声明关系语义",
    "映射引擎层",
    "构建可达图",
    "按预算回收",
  ],
  focuses: ["抽象边界", "关系类型", "层级依赖", "根集合", "回收暂停"],
};

export function Gep1Chapter10DesignPhilosophyMapLab() {
  return <OfficialGep1Lab {...props} initialView="map" />;
}
export function Gep1Chapter10DesignPhilosophyExperimentLab() {
  return <OfficialGep1Lab {...props} initialView="experiment" />;
}
export function Gep1Chapter10DesignPhilosophyEvidenceLab() {
  return <OfficialGep1Lab {...props} initialView="evidence" />;
}
