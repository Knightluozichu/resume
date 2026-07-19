import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-14-allocating-scarce-resources",
  "title": "Chapter 14 Allocating Scarce Resources",
  "question": "三名竞标者竞争两个互补资源，比较独立与组合出价",
  "actors": [
    "单物品拍卖代理",
    "组合出价代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "声明估值",
    "选择拍卖",
    "提交出价",
    "确定赢家",
    "计算支付"
  ],
  "concepts": [
    "Chapter 14 Allocating Scarce Resources",
    "14.1 Classifying Auctions",
    "14.2 Auctions for Single Items",
    "14.2.1 English auctions",
    "14.2.2 Dutch auctions",
    "14.2.3 First-price sealed-bid auctions",
    "14.2.4 Vickrey auctions",
    "14.2.5 Expected revenue",
    "14.2.6 Lies and collusion",
    "14.2.7 Counterspeculation",
    "14.3 Combinatorial Auctions",
    "14.3.1 Bidding Languages",
    "14.3.2 Winner Determination",
    "14.3.3 The VCG Mechanism",
    "14.4 Auctions in Practice",
    "14.4.1 Online Auctions",
    "14.4.2 Adwords Auctions",
    "14.4.3 The Trading Agent Competition"
  ],
  "interventions": [
    {
      "label": "公开单物品拍卖",
      "detail": "让所有评审者看到单物品拍卖的定义，保持组合出价和赢家确定不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验赢家确定",
      "detail": "在赢家确定进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过VCG",
      "detail": "跳过VCG直接追求串谋，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "单物品拍卖不稳定度",
    "赢家确定联合收益",
    "串谋可追踪度"
  ],
  "partialNote": "激励相容结论离不开机制和估值前提，真实平台还需检查预算与串谋。",
  "strategicNote": "拒绝原因：用出价代替真实估值评估福利，掩盖投机或串谋。"
} as const;

export function Mas14AllocatingScarceResourcesModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function Mas14AllocatingScarceResourcesInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function Mas14AllocatingScarceResourcesEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
