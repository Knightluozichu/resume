import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "synthesis-learning-map",
  title: "全书学习地图",
  problem: "学习者要从一次具体变更压力选择章节，而不是按模式名称随机浏览",
  participants: ["官方范围", "三类模式", "学习证据"],
  flow: ["锁定来源", "选择问题", "进入目录", "运行代码", "回到复盘"],
  concepts: [
    "官方书籍结构",
    "创建型路径",
    "结构型路径",
    "行为型路径",
    "综合复盘",
  ],
  refactorings: [
    {
      label: "收窄官方范围",
      detail:
        "只保留 沿官方书籍结构和 23 个模式目录建立问题、结构、代码与复盘路线 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开三类模式",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过学习证据",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "全书学习地图 的参与者与当前变化轴一致；继续用代码和反例验证 每条学习路径必须落到至少一段解释、一个交互和一道带答案练习。",
  misuseNote:
    "全书学习地图 被拒绝：把地图列出的标题计为正文已经覆盖，会制造虚假忠实度。",
} as const;

export function LearningMapStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function LearningMapChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function LearningMapEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
