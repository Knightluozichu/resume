import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-preface",
  title: "序",
  question: "一名只熟悉图形 IDE 的读者准备评审一条 Unix 管道",
  nodes: ["读者画像", "阅读目的", "约定识别", "案例索引", "边界声明"],
  concepts: [
    "Preface",
    "Who Should Read This Book",
    "How to Use This Book",
    "Related References",
    "Conventions Used in This Book",
    "Our Case Studies",
    "Author's Acknowledgements",
  ],
  actions: [
    {
      label: "收窄先决经验",
      detail: "只改变先决经验，保留章节路径与符号约定的原始基线。",
      riskDelta: -16,
      visibilityDelta: 10,
      recoveryDelta: 8,
    },
    {
      label: "显式化符号约定",
      detail: "把符号约定的输入、输出和失败状态写入可检查记录。",
      riskDelta: -8,
      visibilityDelta: 18,
      recoveryDelta: 11,
    },
    {
      label: "绕过案例职责",
      detail: "跳过案例职责直接追求时代差异，用来观察局部捷径的系统代价。",
      riskDelta: 18,
      visibilityDelta: -14,
      recoveryDelta: -20,
    },
  ],
  metricLabels: ["先决经验风险", "符号约定可见度", "时代差异恢复度"],
  boundaryNote: "当读者能解释接口、进程、文本流与失败状态时，才进入案例推演。",
  faultNote: "拒绝原因：把2003年的工具选择当成今天唯一正确的实现。",
} as const;

export function TaoupPrefaceTopologyLab() {
  return (
    <UnixDecisionLab {...shared} view="topology" baseline={[42, 66, 64]} />
  );
}

export function TaoupPrefaceRepresentationLab() {
  return (
    <UnixDecisionLab
      {...shared}
      view="representation"
      baseline={[38, 62, 58]}
    />
  );
}

export function TaoupPrefaceEvidenceLab() {
  return (
    <UnixDecisionLab {...shared} view="evidence" baseline={[34, 72, 68]} />
  );
}
