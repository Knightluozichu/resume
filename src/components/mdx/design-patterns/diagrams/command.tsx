import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-05",
  title: "命令模式",
  problem: "编辑器既要执行文本变更，又要记录历史并可靠撤销最近一次操作",
  participants: ["EditorInvoker", "EditCommand", "DocumentReceiver"],
  flow: ["创建命令", "记录旧值", "调用执行", "写入历史", "执行撤销"],
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
      label: "收窄EditorInvoker",
      detail:
        "只保留 把一次请求封装成对象，以支持排队、记录、撤销或组合操作 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开EditCommand",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过DocumentReceiver",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "命令模式 的参与者与当前变化轴一致；继续用代码和反例验证 execute 后再 undo 必须恢复编辑器执行前的文档版本。",
  misuseNote:
    "命令模式 被拒绝：把任意函数都包装成命令，却没有生命周期需求，只会增加样板。",
} as const;

export function CommandStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function CommandChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function CommandEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
