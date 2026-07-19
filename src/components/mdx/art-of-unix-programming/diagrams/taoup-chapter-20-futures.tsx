import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-chapter-20-futures",
  title: "第20章 未来：危机与机遇",
  question: "复核一项关于接口开放性和工具组合的长期预测",
  nodes: ["原始预测", "驱动变量", "现实信号", "反证搜索", "更新结论"],
  concepts: [
    "20. Futures",
    "Essence and Accident in Unix Tradition",
    "Plan 9: The Way the Future Was",
    "Problems in the Design of Unix",
    "A Unix File Is Just a Big Bag of Bytes",
    "Unix Support for GUIs Is Weak",
    "File Deletion Is Forever",
    "Unix Assumes a Static File System",
    "The Design of Job Control Was Badly Botched",
    "The Unix API Doesn't Use Exceptions",
    "ioctl2 and fcntl2 Are an Embarrassment",
    "The Unix Security Model May Be Too Primitive",
    "Unix Has Too Many Different Kinds of Names",
    "File Systems Might Be Considered Harmful",
    "Towards a Global Internet Address Space",
    "Problems in the Environment of Unix",
    "Problems in the Culture of Unix",
    "Reasons to Believe",
  ],
  actions: [
    {
      label: "收窄危机",
      detail: "只改变危机，保留机会与标准演化的原始基线。",
      riskDelta: -16,
      visibilityDelta: 10,
      recoveryDelta: 8,
    },
    {
      label: "显式化标准演化",
      detail: "把标准演化的输入、输出和失败状态写入可检查记录。",
      riskDelta: -8,
      visibilityDelta: 18,
      recoveryDelta: 11,
    },
    {
      label: "绕过社区变化",
      detail: "跳过社区变化直接追求预测校准，用来观察局部捷径的系统代价。",
      riskDelta: 18,
      visibilityDelta: -14,
      recoveryDelta: -20,
    },
  ],
  metricLabels: ["危机风险", "标准演化可见度", "预测校准恢复度"],
  boundaryNote: "没有可证伪信号的未来判断只能作为价值主张，不能作为预测。",
  faultNote: "拒绝原因：把已经发生的结果筛回旧预测，忽略当时预测失败的分支。",
} as const;

export function TaoupChapter20FuturesTopologyLab() {
  return (
    <UnixDecisionLab {...shared} view="topology" baseline={[42, 66, 64]} />
  );
}

export function TaoupChapter20FuturesRepresentationLab() {
  return (
    <UnixDecisionLab
      {...shared}
      view="representation"
      baseline={[38, 62, 58]}
    />
  );
}

export function TaoupChapter20FuturesEvidenceLab() {
  return (
    <UnixDecisionLab {...shared} view="evidence" baseline={[34, 72, 68]} />
  );
}
