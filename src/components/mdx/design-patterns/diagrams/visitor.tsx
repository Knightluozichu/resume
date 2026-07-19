import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-23",
  title: "访问者模式",
  problem: "语法树节点类型稳定，但持续新增格式化、类型检查和指标统计操作",
  participants: ["AstElement", "AnalysisVisitor", "BinaryNode"],
  flow: ["遍历元素", "调用 accept", "回调 visit", "处理具体类型", "汇总结果"],
  concepts: [
    "模式名称与分类",
    "意图",
    "别名",
    "动机",
    "适用性",
    "结构",
    "参与者",
    "协作",
    "后果",
    "实现",
    "示例代码",
    "已知应用",
    "相关模式",
  ],
  refactorings: [
    {
      label: "收窄AstElement",
      detail:
        "只保留 把作用于稳定元素结构的新操作集中到访问者，并通过双分派选择实现 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开AnalysisVisitor",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过BinaryNode",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "访问者模式 的参与者与当前变化轴一致；继续用代码和反例验证 新增一种分析操作不应修改现有 AST 节点类，且所有节点都有明确处理。",
  misuseNote:
    "访问者模式 被拒绝：元素类型频繁变化时，访问者会造成跨所有操作的同步修改。",
} as const;

export function VisitorStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function VisitorChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function VisitorEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
