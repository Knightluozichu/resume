import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-19",
  title: "迭代器模式",
  problem: "任务集合要支持深度优先与优先级遍历，同时隐藏其树和堆的存储细节",
  participants: ["TaskAggregate", "TaskIterator", "PriorityIterator"],
  flow: ["创建游标", "检查下一项", "读取元素", "推进位置", "结束遍历"],
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
      label: "收窄TaskAggregate",
      detail:
        "只保留 在不暴露聚合内部表示的情况下，提供顺序访问元素的独立游标 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开TaskIterator",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过PriorityIterator",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "迭代器模式 的参与者与当前变化轴一致；继续用代码和反例验证 未修改集合时，每个可达任务恰好返回一次且游标互不干扰。",
  misuseNote:
    "迭代器模式 被拒绝：遍历中修改集合却没有一致性合同，会出现漏读、重复或越界。",
} as const;

export function IteratorStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function IteratorChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function IteratorEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
