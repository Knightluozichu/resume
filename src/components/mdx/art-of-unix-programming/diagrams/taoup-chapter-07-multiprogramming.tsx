import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-chapter-07-multiprogramming",
  title: "第7章 多道程序设计：分离进程为独立的功能",
  nodes: ["职责拆分", "进程边界", "IPC选择", "数据流", "故障隔离"],
  focuses: ["管道", "重定向", "包装器", "从进程", "线程风险"],
} as const;

export function TaoupChapter07MultiprogrammingCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupChapter07MultiprogrammingRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupChapter07MultiprogrammingEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
