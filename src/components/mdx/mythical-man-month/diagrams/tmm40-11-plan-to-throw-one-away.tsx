import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-11-plan-to-throw-one-away",
  title: "第11章 未雨绸缪",
  question: "需求理解仍在变化，但团队已把试验原型锁定为生产基线",
  roles: ["试验原型负责人", "增量交付执行者", "独立项目评审者"],
  phases: ["提出假设", "制作原型", "收集反馈", "重构基线", "增量演进"],
  concepts: [
    "第11章 未雨绸缪",
    "试验性工厂和增大规模",
    "唯一不变的就是变化本身",
    "为变更设计系统",
    "为变更计划组织架构",
    "前进两步，后退一步",
    "前进一步，后退一步",
  ],
  actions: [
    {
      label: "公开试验原型",
      detail:
        "让评审者先看到试验原型的定义和负责人，保持增量交付与变更设计不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验变更设计",
      detail: "在变更设计进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过组织调整",
      detail: "跳过组织调整直接追求迁移门禁，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["试验原型延期暴露", "变更设计清晰度", "迁移门禁风险"],
  boundaryNote: "原型是否丢弃由证据和债务决定，不能把浪费恐惧当作保留理由。",
  failureNote:
    "拒绝原因：原型隐藏的捷径成为生产依赖，团队既不能替换也无法安全扩展。",
} as const;

export function Tmm4011PlanToThrowOneAwayDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm4011PlanToThrowOneAwayScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm4011PlanToThrowOneAwayEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
