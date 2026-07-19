import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-20",
  title: "中介者模式",
  problem: "对话框字段互相启用、校验和清空，直接互调形成难以追踪的依赖网",
  participants: ["DialogMediator", "FormColleague", "SubmitButton"],
  flow: ["字段变化", "通知中介者", "判断规则", "更新同事对象", "刷新界面"],
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
      label: "收窄DialogMediator",
      detail:
        "只保留 把一组对象之间的交互协议集中到中介者，减少同级对象的网状依赖 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开FormColleague",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过SubmitButton",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "中介者模式 的参与者与当前变化轴一致；继续用代码和反例验证 字段变化只能通过中介者更新依赖控件，且一次事件不会递归循环。",
  misuseNote:
    "中介者模式 被拒绝：把所有业务计算移入单个中介者，只是把耦合从网络压成巨型中心。",
} as const;

export function MediatorStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function MediatorChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function MediatorEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
