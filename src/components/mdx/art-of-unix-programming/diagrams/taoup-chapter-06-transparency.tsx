import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-chapter-06-transparency",
  title: "第6章 透明性：来点儿光",
  question: "诊断一个间歇失败的同步工具，并在不改数据的情况下重放",
  nodes: ["观察入口", "状态展开", "故障定位", "可编辑表示", "恢复验证"],
  concepts: [
    "6. Transparency",
    "Studying Cases",
    "Case Study: audacity",
    "Case Study: fetchmail's -v option",
    "Case Study: GCC",
    "Case Study: kmail",
    "Case Study: SNG",
    "Case Study: The Terminfo Database",
    "Case Study: Freeciv Data Files",
    "Designing for Transparency and Discoverability",
    "The Zen of Transparency",
    "Coding for Transparency and Discoverability",
    "Transparency and Avoiding Overprotectiveness",
    "Transparency and Editable Representations",
    "Transparency, Fault Diagnosis, and Fault Recovery",
    "Designing for Maintainability",
  ],
  actions: [
    {
      label: "收窄详细输出",
      detail: "只改变详细输出，保留隐藏状态与确定性的原始基线。",
      riskDelta: -16,
      visibilityDelta: 10,
      recoveryDelta: 8,
    },
    {
      label: "显式化确定性",
      detail: "把确定性的输入、输出和失败状态写入可检查记录。",
      riskDelta: -8,
      visibilityDelta: 18,
      recoveryDelta: 11,
    },
    {
      label: "绕过维护入口",
      detail: "跳过维护入口直接追求恢复轨迹，用来观察局部捷径的系统代价。",
      riskDelta: 18,
      visibilityDelta: -14,
      recoveryDelta: -20,
    },
  ],
  metricLabels: ["详细输出风险", "确定性可见度", "恢复轨迹恢复度"],
  boundaryNote:
    "透明不等于泄露秘密；敏感值应脱敏，但状态转移和错误类别必须可见。",
  faultNote:
    "拒绝原因：为了界面简洁隐藏错误上下文，只留下无法重放的‘操作失败’。",
} as const;

export function TaoupChapter06TransparencyTopologyLab() {
  return (
    <UnixDecisionLab {...shared} view="topology" baseline={[42, 66, 64]} />
  );
}

export function TaoupChapter06TransparencyRepresentationLab() {
  return (
    <UnixDecisionLab
      {...shared}
      view="representation"
      baseline={[38, 62, 58]}
    />
  );
}

export function TaoupChapter06TransparencyEvidenceLab() {
  return (
    <UnixDecisionLab {...shared} view="evidence" baseline={[34, 72, 68]} />
  );
}
