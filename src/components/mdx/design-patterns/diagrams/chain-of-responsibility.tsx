import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-18",
  title: "责任链模式",
  problem: "支持请求按身份、配额和路由依次检查，并需要定位在哪个环节被拒绝",
  participants: ["RequestHandler", "QuotaHandler", "RouteHandler"],
  flow: ["进入链条", "校验身份", "检查配额", "尝试路由", "处理或拒绝"],
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
      label: "收窄RequestHandler",
      detail:
        "只保留 让请求沿有序处理者链传播，直到某个节点处理或明确报告无人处理 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开QuotaHandler",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过RouteHandler",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "责任链模式 的参与者与当前变化轴一致；继续用代码和反例验证 每个请求最终只能得到一次处理成功或一个可追踪的拒绝结果。",
  misuseNote:
    "责任链模式 被拒绝：链尾静默丢弃请求会把配置错误伪装成正常无响应。",
} as const;

export function ChainOfResponsibilityStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function ChainOfResponsibilityChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function ChainOfResponsibilityEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
