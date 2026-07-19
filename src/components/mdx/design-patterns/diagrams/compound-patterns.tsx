import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "synthesis-compound-patterns",
  title: "复合模式",
  problem:
    "通知平台同时需要切换算法、广播状态和控制远端访问，团队准备一次套入多个模式",
  participants: ["变化轴清单", "模式组合", "集成验证"],
  flow: ["拆开变化", "各选模式", "连接边界", "注入故障", "删除多余层"],
  concepts: ["变化轴", "职责边界", "组合顺序", "集成故障", "删除测试"],
  refactorings: [
    {
      label: "收窄变化轴清单",
      detail:
        "只保留 根据彼此独立的变化轴组合多个模式，并验证每个模式仍承担清晰职责 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开模式组合",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过集成验证",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "复合模式 的参与者与当前变化轴一致；继续用代码和反例验证 删除任一模式时只能损失它声明的能力，不能让无关变化轴一起崩溃。",
  misuseNote:
    "复合模式 被拒绝：只因多个模式常被一起提及就全部使用，会产生没有证据的模式拼盘。",
} as const;

export function CompoundPatternsStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function CompoundPatternsChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function CompoundPatternsEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
