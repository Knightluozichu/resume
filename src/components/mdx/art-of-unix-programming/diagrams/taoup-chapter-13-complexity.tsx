import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-chapter-13-complexity",
  title: "第13章 复杂度：尽可能简单，但别简单过了头",
  question: "比较五种编辑器风格对新手任务、专家扩展和维护的负担",
  nodes: ["复杂度盘点", "来源分类", "接口分配", "方案比较", "删减验证"],
  concepts: [
    "13. Complexity",
    "Speaking of Complexity",
    "The Three Sources of Complexity",
    "Tradeoffs between Interface and Implementation Complexity",
    "Essential, Optional, and Accidental Complexity",
    "Mapping Complexity",
    "When Simplicity Is Not Enough",
    "A Tale of Five Editors",
    "ed",
    "vi",
    "Sam",
    "Emacs",
    "Wily",
    "The Right Size for an Editor",
    "Identifying the Complexity Problems",
    "Compromise Doesn't Work",
    "Is Emacs an Argument against the Unix Tradition?",
    "The Right Size of Software",
  ],
  actions: [
    {
      label: "收窄本质复杂度",
      detail: "只改变本质复杂度，保留可选复杂度与偶然复杂度的原始基线。",
      riskDelta: -16,
      visibilityDelta: 10,
      recoveryDelta: 8,
    },
    {
      label: "显式化偶然复杂度",
      detail: "把偶然复杂度的输入、输出和失败状态写入可检查记录。",
      riskDelta: -8,
      visibilityDelta: 18,
      recoveryDelta: 11,
    },
    {
      label: "绕过认知负担",
      detail: "跳过认知负担直接追求软件尺寸，用来观察局部捷径的系统代价。",
      riskDelta: 18,
      visibilityDelta: -14,
      recoveryDelta: -20,
    },
  ],
  metricLabels: ["本质复杂度风险", "偶然复杂度可见度", "软件尺寸恢复度"],
  boundaryNote: "简化若删除必要能力或把复杂度推给用户，只是转移而非降低。",
  faultNote:
    "拒绝原因：用统一框架消除表面差异，却引入更多配置、概念和隐藏控制流。",
} as const;

export function TaoupChapter13ComplexityTopologyLab() {
  return (
    <UnixDecisionLab {...shared} view="topology" baseline={[42, 66, 64]} />
  );
}

export function TaoupChapter13ComplexityRepresentationLab() {
  return (
    <UnixDecisionLab
      {...shared}
      view="representation"
      baseline={[38, 62, 58]}
    />
  );
}

export function TaoupChapter13ComplexityEvidenceLab() {
  return (
    <UnixDecisionLab {...shared} view="evidence" baseline={[34, 72, 68]} />
  );
}
