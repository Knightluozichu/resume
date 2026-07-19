import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-21",
  title: "备忘录模式",
  problem: "画布编辑器要保存撤销快照，但历史管理器不能直接修改画布私有结构",
  participants: ["CanvasOriginator", "CanvasMemento", "HistoryCaretaker"],
  flow: ["捕获状态", "封装备忘录", "保存历史", "选择版本", "恢复状态"],
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
      label: "收窄CanvasOriginator",
      detail:
        "只保留 在不破坏封装的前提下捕获对象内部状态，以便之后恢复 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开CanvasMemento",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过HistoryCaretaker",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "备忘录模式 的参与者与当前变化轴一致；继续用代码和反例验证 恢复任一历史版本后，画布内容与捕获时一致且历史快照仍不可变。",
  misuseNote:
    "备忘录模式 被拒绝：把可变状态对象直接放进历史栈，会让旧快照随当前编辑一起改变。",
} as const;

export function MementoStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function MementoChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function MementoEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
