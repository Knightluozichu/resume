import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-04-conceptual-integrity",
  title: "第4章 贵族专制、民主政治和系统设计",
  question: "三个子团队分别为同一产品设计命名、导航和错误处理规则",
  roles: ["概念词典负责人", "设计权威执行者", "独立项目评审者"],
  phases: ["识别用户概念", "形成规则", "评审实现", "处理例外", "回归一致性"],
  concepts: [
    "第4章 贵族专制、民主政治和系统设计",
    "概念的完整性",
    "获得概念的完整性",
    "贵族专制统治和民主政治",
    "在等待时，实现人员应该做什么",
  ],
  actions: [
    {
      label: "公开概念词典",
      detail:
        "让评审者先看到概念词典的定义和负责人，保持设计权威与实现反馈不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验实现反馈",
      detail: "在实现反馈进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过例外预算",
      detail: "跳过例外预算直接追求用户模型，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["概念词典延期暴露", "实现反馈清晰度", "用户模型风险"],
  boundaryNote: "概念权威必须对用户模型负责，并持续接收实现约束的反证。",
  failureNote:
    "拒绝原因：用投票拼接互相冲突的局部最优，导致用户必须学习三套系统。",
} as const;

export function Tmm4004ConceptualIntegrityDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm4004ConceptualIntegrityScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm4004ConceptualIntegrityEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
