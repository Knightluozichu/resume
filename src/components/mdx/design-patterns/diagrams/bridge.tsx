import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-13",
  title: "桥接模式",
  problem: "通知有告警与摘要两种抽象，又要支持邮件、短信和推送三种通道",
  participants: ["NotificationAbstraction", "ChannelImplementor", "SmsChannel"],
  flow: ["构造抽象", "注入通道", "组织消息", "调用实现", "记录结果"],
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
      label: "收窄NotificationAbstraction",
      detail:
        "只保留 分离抽象层与实现层，使两个维度可以独立扩展而不形成子类乘积 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开ChannelImplementor",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过SmsChannel",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "桥接模式 的参与者与当前变化轴一致；继续用代码和反例验证 新增推送通道不应修改告警与摘要的领域组织逻辑。",
  misuseNote:
    "桥接模式 被拒绝：只有一个稳定实现维度时，桥接会制造不必要的双重抽象。",
} as const;

export function BridgeStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function BridgeChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function BridgeEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
