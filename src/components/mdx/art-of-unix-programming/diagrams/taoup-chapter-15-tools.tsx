import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-chapter-15-tools",
  title: "第15章 工具：开发的战术",
  question: "从一个手工编译项目建立可重复构建、测试与差异审查",
  nodes: ["编辑变更", "构建依赖", "版本记录", "测试诊断", "自动发布"],
  concepts: [
    "15. Tools",
    "A Developer-Friendly Operating System",
    "Choosing an Editor",
    "Useful Things to Know about vi",
    "Useful Things to Know about Emacs",
    "The Antireligious Choice: Using Both",
    "Special-Purpose Code Generators",
    "yacc and lex",
    "Case Study: Glade",
    "make: Automating Your Recipes",
    "Basic Theory of make",
    "make in Non-C/C++ Development",
    "Utility Productions",
    "Generating Makefiles",
    "Version-Control Systems",
    "Why Version Control?",
    "Version Control by Hand",
    "Automated Version Control",
    "Unix Tools for Version Control",
    "Runtime Debugging",
    "Profiling",
    "Combining Tools with Emacs",
    "Emacs and make",
    "Emacs and Runtime Debugging",
    "Emacs and Version Control",
    "Emacs and Profiling",
    "Like an IDE, Only Better",
  ],
  actions: [
    {
      label: "收窄编辑器",
      detail: "只改变编辑器，保留make 依赖与版本控制的原始基线。",
    },
    {
      label: "显式化版本控制",
      detail: "把版本控制的输入、输出和失败状态写入可检查记录。",
    },
    {
      label: "绕过调试剖析",
      detail: "跳过调试剖析直接追求自动化，用来观察局部捷径的系统代价。",
    },
  ],
  boundaryNote: "自动化若隐藏失败命令或无法本地重放，就不是可靠反馈环。",
  faultNote: "拒绝原因：构建依赖开发者机器上的隐式文件，版本库无法重建发布物。",
} as const;

export function TaoupChapter15ToolsTopologyLab() {
  return <UnixDecisionLab {...shared} view="topology" />;
}

export function TaoupChapter15ToolsRepresentationLab() {
  return <UnixDecisionLab {...shared} view="representation" />;
}

export function TaoupChapter15ToolsEvidenceLab() {
  return <UnixDecisionLab {...shared} view="evidence" />;
}
