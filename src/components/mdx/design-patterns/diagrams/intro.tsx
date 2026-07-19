import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-01",
  title: "什么是设计模式",
  problem: "评审者面对需求相似但约束不同的两个系统，要判断是否真的适用同一模式",
  participants: ["设计问题", "模式目录", "方案评审者"],
  flow: ["界定上下文", "识别变化", "比较结构", "检验后果", "记录决定"],
  concepts: [
    "导论",
    "案例研究：设计一个文档编辑器",
    "创建型模式",
    "结构型模式",
    "行为型模式",
    "结论",
    "附录 A：术语表",
    "附录 B：记号指南",
    "附录 C：基础类",
    "参考文献",
    "索引",
  ],
  refactorings: [
    {
      label: "收窄设计问题",
      detail:
        "只保留 把反复出现的面向对象设计问题、上下文、力量与后果组织成可检验的模式目录 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开模式目录",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过方案评审者",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "什么是设计模式 的参与者与当前变化轴一致；继续用代码和反例验证 任何模式选择都必须同时公开适用条件、被替代方案和可接受后果。",
  misuseNote:
    "什么是设计模式 被拒绝：从模式名称反推需求，或把 SOLID 等后来的课程材料冒充原书目录。",
} as const;

export function IntroStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function IntroChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function IntroEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
