import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-notes-references",
  title: "注解与参考文献",
  question: "课程中的数字和名言能找到脚注，却无法确认脚注是否真正支持该主张",
  roles: ["正文主张负责人", "脚注定位执行者", "独立项目评审者"],
  phases: ["提取主张", "定位注解", "打开来源", "比较范围", "记录结论"],
  concepts: ["注解与参考文献"],
  actions: [
    {
      label: "公开正文主张",
      detail:
        "让评审者先看到正文主张的定义和负责人，保持脚注定位与原始来源不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验原始来源",
      detail: "在原始来源进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过测量语境",
      detail: "跳过测量语境直接追求引用适配，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["正文主张延期暴露", "原始来源清晰度", "引用适配风险"],
  boundaryNote: "引用数量不代表证据质量，目录和书目也不能冒充正文事实。",
  failureNote:
    "拒绝原因：引用存在但对象、年代、指标或结论方向与正文主张不匹配。",
} as const;

export function Tmm40NotesReferencesDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm40NotesReferencesScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm40NotesReferencesEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
