import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-03",
  title: "观察者模式",
  problem: "库存变化要同步看板、补货器和审计流，但三者生命周期与失败方式不同",
  participants: ["InventorySubject", "StockObserver", "AuditSubscriber"],
  flow: ["登记订阅", "写入库存", "生成事件", "逐个通知", "清理订阅"],
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
      label: "收窄InventorySubject",
      detail:
        "只保留 建立一对多的订阅关系，让主题变化能通知所有仍有效的观察者 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开StockObserver",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过AuditSubscriber",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "观察者模式 的参与者与当前变化轴一致；继续用代码和反例验证 一次库存提交只能让每个有效订阅者观察到一个同版本事件。",
  misuseNote:
    "观察者模式 被拒绝：没有退订与失败边界的同步广播会制造内存泄漏和级联中断。",
} as const;

export function ObserverStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function ObserverChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function ObserverEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
