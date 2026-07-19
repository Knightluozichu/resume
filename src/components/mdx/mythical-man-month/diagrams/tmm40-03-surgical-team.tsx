import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-03-surgical-team",
  title: "第3章 外科手术队伍",
  question: "12 人团队需要统一核心设计，同时维持并行实现与独立测试",
  roles: ["首席程序员负责人", "副手执行者", "独立项目评审者"],
  phases: ["拆分责任", "指定决策权", "建立支援", "验证接口", "演练替补"],
  concepts: [
    "第3章 外科手术队伍",
    "问题",
    "Mills的建议",
    "如何运作",
    "团队的扩建",
  ],
  actions: [
    {
      label: "公开首席程序员",
      detail: "让评审者先看到首席程序员的定义和负责人，保持副手与编辑不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验编辑",
      detail: "在编辑进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过工具支持",
      detail: "跳过工具支持直接追求团队扩展，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["首席程序员延期暴露", "编辑清晰度", "团队扩展风险"],
  boundaryNote: "角色集中可减少概念分叉，也可能形成吞吐和继任风险。",
  failureNote:
    "拒绝原因：把首席角色误作独裁职位，却没有编辑、测试、工具和替补职责。",
} as const;

export function Tmm4003SurgicalTeamDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm4003SurgicalTeamScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm4003SurgicalTeamEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
