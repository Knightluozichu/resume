import {
  UnityOptimizationLab,
  type UnityOptimizationSnapshot,
} from "./official-optimization-lab";

const SNAPSHOTS = [
  {
    label: "边界",
    stage: "Chapter 10 官方范围",
    action:
      "核对 Tactical Tips and Tricks 及 6 个官方主题，保持一章一对一身份。",
    metric: "6 topics",
    evidence:
      "https://subscription.packtpub.com/book/game-development/9781838556518/pref/preflvl1sec03/what-this-book-covers + ISBN 9781838556518",
    boundary: "目录覆盖只证明范围完整，仍需实验、失败样本与目标设备证据。",
  },
  {
    label: "模型",
    stage: "成本模型与不变量",
    action:
      "把编辑器、脚本模板、自定义菜单、外部工具和团队约定变成可重复流程，减少等待、误操作与性能回退。",
    metric: "cause → cost",
    evidence:
      "选择一个高频制作任务，记录手工耗时与错误，再实现最小 Editor 工具并用五次重复操作比较。",
    boundary:
      "自动化脚本如果绕过 Undo、序列化或导入管线，会把省下的时间转成隐蔽数据损坏。",
  },
  {
    label: "迁移",
    stage: "2019/2020 到现代 Unity",
    action:
      "部分快捷键和菜单已变化，但自动化、模板、验证器、版本控制和测量型工作流仍能直接迁移。",
    metric: "API ≠ principle",
    evidence: "记录原书载体、现代 API、保持的不变量和已知差异。",
    boundary:
      "不能把当前 API 名称倒写成原书事实，也不能把旧 API 直接当作当前最佳实践。",
  },
  {
    label: "采样",
    stage: "单变量对照实验",
    action:
      "选择一个高频制作任务，记录手工耗时与错误，再实现最小 Editor 工具并用五次重复操作比较。",
    metric: "baseline / candidate",
    evidence:
      "操作时间、点击/步骤数、失败次数、Undo 支持、批处理日志和版本控制 diff。",
    boundary: "同时改变多个设置会失去因果归属，平均值还可能掩盖长尾卡顿。",
  },
  {
    label: "验收",
    stage: "性能证据包",
    action: "把 战术技巧 的正确性、性能、兼容性和失败重放装进同一份验收记录。",
    metric: "P50 + P95 + correctness",
    evidence:
      "操作时间、点击/步骤数、失败次数、Undo 支持、批处理日志和版本控制 diff。",
    boundary:
      "自动化脚本如果绕过 Undo、序列化或导入管线，会把省下的时间转成隐蔽数据损坏。",
  },
] as const satisfies ReadonlyArray<UnityOptimizationSnapshot>;

export function TacticalTipsAndTricksMapLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 10 · 战术技巧"
      chapter="Unity Game Optimization · Third Edition"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function TacticalTipsAndTricksExperimentLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 10 · 战术技巧"
      chapter="Unity Game Optimization · Third Edition"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function TacticalTipsAndTricksEvidenceLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 10 · 战术技巧"
      chapter="Unity Game Optimization · Third Edition"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
