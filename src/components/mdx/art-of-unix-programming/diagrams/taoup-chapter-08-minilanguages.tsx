import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-chapter-08-minilanguages",
  title: "第8章 微型语言：寻找歌唱的乐符",
  question: "为日志路由规则选择表格、正则、声明式 DSL 或嵌入脚本",
  nodes: ["领域词汇", "复杂度层级", "语法选择", "执行边界", "诊断工具"],
  concepts: [
    "8. Minilanguages",
    "Understanding the Taxonomy of Languages",
    "Applying Minilanguages",
    "Case Study: sng",
    "Case Study: Regular Expressions",
    "Case Study: Glade",
    "Case Study: m4",
    "Case Study: XSLT",
    "Case Study: The Documenter's Workbench Tools",
    "Case Study: fetchmail Run-Control Syntax",
    "Case Study: awk",
    "Case Study: PostScript",
    "Case Study: bc and dc",
    "Case Study: Emacs Lisp",
    "Case Study: JavaScript",
    "Designing Minilanguages",
    "Choosing the Right Complexity Level",
    "Extending and Embedding Languages",
    "Writing a Custom Grammar",
    "Macros — Beware!",
    "Language or Application Protocol?",
  ],
  actions: [
    {
      label: "收窄表达密度",
      detail: "只改变表达密度，保留语法歧义与扩展机制的原始基线。",
      riskDelta: -16,
      visibilityDelta: 10,
      recoveryDelta: 8,
    },
    {
      label: "显式化扩展机制",
      detail: "把扩展机制的输入、输出和失败状态写入可检查记录。",
      riskDelta: -8,
      visibilityDelta: 18,
      recoveryDelta: 11,
    },
    {
      label: "绕过错误定位",
      detail: "跳过错误定位直接追求安全能力，用来观察局部捷径的系统代价。",
      riskDelta: 18,
      visibilityDelta: -14,
      recoveryDelta: -20,
    },
  ],
  metricLabels: ["表达密度风险", "扩展机制可见度", "安全能力恢复度"],
  boundaryNote:
    "一旦需要通用控制流和调试器，应采用成熟语言而不是继续堆叠 DSL 特性。",
  faultNote:
    "拒绝原因：不断给配置文件加入条件、循环和宏，却拒绝承认它已经是一门语言。",
} as const;

export function TaoupChapter08MinilanguagesTopologyLab() {
  return (
    <UnixDecisionLab {...shared} view="topology" baseline={[42, 66, 64]} />
  );
}

export function TaoupChapter08MinilanguagesRepresentationLab() {
  return (
    <UnixDecisionLab
      {...shared}
      view="representation"
      baseline={[38, 62, 58]}
    />
  );
}

export function TaoupChapter08MinilanguagesEvidenceLab() {
  return (
    <UnixDecisionLab {...shared} view="evidence" baseline={[34, 72, 68]} />
  );
}
