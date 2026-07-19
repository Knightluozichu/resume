import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-02",
  title: "策略模式",
  problem: "结算服务要在不改订单流程的前提下切换普通、会员和大促定价",
  participants: ["PricingContext", "PricingStrategy", "MemberPricing"],
  flow: ["提交订单", "选择策略", "执行报价", "核对约束", "返回金额"],
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
      label: "收窄PricingContext",
      detail:
        "只保留 把可互换的算法族封装为同一契约，使调用者能按情境选择行为 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开PricingStrategy",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过MemberPricing",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "策略模式 的参与者与当前变化轴一致；继续用代码和反例验证 同一订单输入必须得到可解释且非负的报价。",
  misuseNote:
    "策略模式 被拒绝：只有一个算法或分支从不独立变化时，策略对象只是额外跳转。",
} as const;

export function StrategyStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function StrategyChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function StrategyEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
