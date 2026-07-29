import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-chapter-14-languages",
  title: "第14章 语言：C还是非C",
  question: "为数据清洗、系统接口、长驻服务和编辑器扩展分配语言",
  nodes: ["任务约束", "候选语言", "混合边界", "原型测量", "退出方案"],
  concepts: [
    "14. Languages",
    "Unix's Cornucopia of Languages",
    "Why Not C?",
    "Interpreted Languages and Mixed Strategies",
    "Language Evaluations",
    "C",
    "C++",
    "Shell",
    "Perl",
    "Tcl",
    "Python",
    "Java",
    "Emacs Lisp",
    "Trends for the Future",
    "Choosing an X Toolkit",
  ],
  actions: [
    {
      label: "收窄运行时",
      detail: "只改变运行时，保留类型安全与库生态的原始基线。",
    },
    {
      label: "显式化库生态",
      detail: "把库生态的输入、输出和失败状态写入可检查记录。",
    },
    {
      label: "绕过胶合成本",
      detail: "跳过胶合成本直接追求部署可用，用来观察局部捷径的系统代价。",
    },
  ],
  boundaryNote: "若多语言边界使调试和发布不可控，单一成熟栈可能更经济。",
  faultNote:
    "拒绝原因：用微基准证明语言更快，却忽略绑定层、部署和错误处理成本。",
} as const;

export function TaoupChapter14LanguagesTopologyLab() {
  return <UnixDecisionLab {...shared} view="topology" />;
}

export function TaoupChapter14LanguagesRepresentationLab() {
  return <UnixDecisionLab {...shared} view="representation" />;
}

export function TaoupChapter14LanguagesEvidenceLab() {
  return <UnixDecisionLab {...shared} view="evidence" />;
}
