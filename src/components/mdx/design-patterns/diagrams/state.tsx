import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-06",
  title: "状态模式",
  problem: "订单在待支付、已支付、已发货和已取消之间转换，非法动作必须被拒绝",
  participants: ["OrderContext", "OrderState", "PaidState"],
  flow: ["接收动作", "读取状态", "验证迁移", "执行行为", "替换状态"],
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
      label: "收窄OrderContext",
      detail:
        "只保留 把与状态相关的行为交给状态对象，使对象在状态变化时表现随之改变 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开OrderState",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过PaidState",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "状态模式 的参与者与当前变化轴一致；继续用代码和反例验证 已取消订单不得进入已发货状态，任何拒绝都不能部分写入。",
  misuseNote:
    "状态模式 被拒绝：只有布尔开关或极少分支时，状态类会掩盖简单逻辑。",
} as const;

export function StateStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function StateChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function StateEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
