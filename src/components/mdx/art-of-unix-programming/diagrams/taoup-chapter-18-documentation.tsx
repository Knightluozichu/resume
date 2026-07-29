import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-chapter-18-documentation",
  title: "第18章 文档：向网络世界阐释代码",
  question: "为新用户安装失败和维护者协议疑问设计文档入口",
  nodes: ["读者任务", "文档类型", "信息架构", "示例验证", "更新责任"],
  concepts: [
    "18. Documentation",
    "Documentation Concepts",
    "The Unix Style",
    "The Large-Document Bias",
    "Cultural Style",
    "The Zoo of Unix Documentation Formats",
    "troff and the Documenter's Workbench Tools",
    "TeX",
    "Texinfo",
    "POD",
    "HTML",
    "DocBook",
    "The Present Chaos and a Possible Way Out",
    "DocBook",
    "Document Type Definitions",
    "Other DTDs",
    "The DocBook Toolchain",
    "Migration Tools",
    "Editing Tools",
    "Related Standards and Practices",
    "SGML",
    "XML-DocBook References",
    "Best Practices for Writing Unix Documentation",
  ],
  actions: [
    {
      label: "收窄手册页",
      detail: "只改变手册页，保留HOWTO与FAQ的原始基线。",
    },
    {
      label: "显式化FAQ",
      detail: "把FAQ的输入、输出和失败状态写入可检查记录。",
    },
    {
      label: "绕过代码文档",
      detail: "跳过代码文档直接追求新鲜度，用来观察局部捷径的系统代价。",
    },
  ],
  boundaryNote:
    "文档不能替代清晰接口；若需要大量说明才能避免误用，应先修设计。",
  faultNote: "拒绝原因：README 展示过时命令，自动测试从不执行文档示例。",
} as const;

export function TaoupChapter18DocumentationTopologyLab() {
  return <UnixDecisionLab {...shared} view="topology" />;
}

export function TaoupChapter18DocumentationRepresentationLab() {
  return <UnixDecisionLab {...shared} view="representation" />;
}

export function TaoupChapter18DocumentationEvidenceLab() {
  return <UnixDecisionLab {...shared} view="evidence" />;
}
