import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-appendix-a-glossary-of-abbreviations",
  title: "附录A 缩写词表",
  question: "为一组跨网络、语言和工具章节出现的缩写消歧",
  nodes: ["捕获缩写", "展开全称", "绑定领域", "链接首次使用", "冲突消歧"],
  concepts: ["A. Glossary of Abbreviations"],
  actions: [
    {
      label: "收窄缩写",
      detail: "只改变缩写，保留全称与语境的原始基线。",
      riskDelta: -16,
      visibilityDelta: 10,
      recoveryDelta: 8,
    },
    {
      label: "显式化语境",
      detail: "把语境的输入、输出和失败状态写入可检查记录。",
      riskDelta: -8,
      visibilityDelta: 18,
      recoveryDelta: 11,
    },
    {
      label: "绕过首次出现",
      detail: "跳过首次出现直接追求同形异义，用来观察局部捷径的系统代价。",
      riskDelta: 18,
      visibilityDelta: -14,
      recoveryDelta: -20,
    },
  ],
  metricLabels: ["缩写风险", "语境可见度", "同形异义恢复度"],
  boundaryNote: "只出现一次且无歧义的词不必制造额外缩写负担。",
  faultNote: "拒绝原因：看到 RPC 就假定唯一含义，未检查章节语境和时代用法。",
} as const;

export function TaoupAppendixAGlossaryOfAbbreviationsTopologyLab() {
  return (
    <UnixDecisionLab {...shared} view="topology" baseline={[42, 66, 64]} />
  );
}

export function TaoupAppendixAGlossaryOfAbbreviationsRepresentationLab() {
  return (
    <UnixDecisionLab
      {...shared}
      view="representation"
      baseline={[38, 62, 58]}
    />
  );
}

export function TaoupAppendixAGlossaryOfAbbreviationsEvidenceLab() {
  return (
    <UnixDecisionLab {...shared} view="evidence" baseline={[34, 72, 68]} />
  );
}
