import { OfficialEex19Lab } from "./official-eex19-lab";

const props = {
  unitId: "eex19-recommendation-02",
  title: "推荐序二（赵曙明）",
  nodes: [
    "提取教育命题",
    "映射真实职责",
    "声明情境差异",
    "执行小步试验",
    "复核迁移结果",
  ],
  focuses: ["管理教育", "知识工作", "情境迁移", "制度约束", "结果复核"],
} as const;

export function Eex19Recommendation02MapLab() {
  return <OfficialEex19Lab {...props} mode="map" />;
}
export function Eex19Recommendation02ExperimentLab() {
  return <OfficialEex19Lab {...props} mode="experiment" />;
}
export function Eex19Recommendation02EvidenceLab() {
  return <OfficialEex19Lab {...props} mode="evidence" />;
}
