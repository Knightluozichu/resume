import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "synthesis-final-review",
  title: "设计模式总复习",
  problem:
    "架构评审要在两个候选模式间做决定，并证明更简单方案为何不足或已经足够",
  participants: ["问题证据", "候选模式", "反例评审"],
  flow: ["复述问题", "列出候选", "实现最小切片", "运行反例", "提交决定"],
  concepts: ["创建型比较", "结构型比较", "行为型比较", "拒绝条件", "发布答卷"],
  refactorings: [
    {
      label: "收窄问题证据",
      detail:
        "只保留 用统一案例比较 23 个模式的适用条件、结构代价和拒绝信号 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开候选模式",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过反例评审",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "设计模式总复习 的参与者与当前变化轴一致；继续用代码和反例验证 任何推荐必须附带一个拒绝条件、一个替代方案和一条可重放代码证据。",
  misuseNote:
    "设计模式总复习 被拒绝：看到模式结构完整就判通过，而不验证当前问题是否存在对应变化压力。",
} as const;

export function FinalReviewStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function FinalReviewChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function FinalReviewEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
