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
    },
    {
      label: "显式化扩展机制",
      detail: "把扩展机制的输入、输出和失败状态写入可检查记录。",
    },
    {
      label: "绕过错误定位",
      detail: "跳过错误定位直接追求安全能力，用来观察局部捷径的系统代价。",
    },
  ],
  boundaryNote:
    "一旦需要通用控制流和调试器，应采用成熟语言而不是继续堆叠 DSL 特性。",
  faultNote:
    "拒绝原因：不断给配置文件加入条件、循环和宏，却拒绝承认它已经是一门语言。",
} as const;

export function TaoupChapter08MinilanguagesTopologyLab() {
  return <UnixDecisionLab {...shared} view="topology" />;
}

export function TaoupChapter08MinilanguagesRepresentationLab() {
  return <UnixDecisionLab {...shared} view="representation" />;
}

export function TaoupChapter08MinilanguagesEvidenceLab() {
  return <UnixDecisionLab {...shared} view="evidence" />;
}
