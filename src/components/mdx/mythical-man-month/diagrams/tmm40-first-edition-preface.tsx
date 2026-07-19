import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-first-edition-preface",
  title: "第1版序言",
  question: "现代云团队准备直接套用 1960 年代大型系统项目的组织结论",
  roles: ["System/360负责人", "OS/360执行者", "独立项目评审者"],
  phases: ["确定年代", "识别系统", "列出约束", "比较现状", "限定结论"],
  concepts: ["第1版序言"],
  actions: [
    {
      label: "公开System/360",
      detail:
        "让评审者先看到System/360的定义和负责人，保持OS/360与项目规模不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验项目规模",
      detail: "在项目规模进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过历史条件",
      detail: "跳过历史条件直接追求迁移边界，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["System/360延期暴露", "项目规模清晰度", "迁移边界风险"],
  boundaryNote: "历史经验是待验证假设，不是脱离项目条件的管理定律。",
  failureNote:
    "拒绝原因：忽略硬件、工具、发布节奏和组织规模差异后宣布经验普适。",
} as const;

export function Tmm40FirstEditionPrefaceDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm40FirstEditionPrefaceScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm40FirstEditionPrefaceEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
