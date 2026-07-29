import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-chapter-17-portability",
  title: "第17章 可移植性：软件可移植性与遵循标准",
  question: "把一个依赖 GNU 扩展和本地路径的工具移到 POSIX 环境",
  nodes: ["平台矩阵", "标准基线", "假设清单", "兼容层", "移植测试"],
  concepts: [
    "17. Portability",
    "Evolution of C",
    "Early History of C",
    "C Standards",
    "Unix Standards",
    "Standards and the Unix Wars",
    "The Ghost at the Victory Banquet",
    "Unix Standards in the Open-Source World",
    "IETF and the RFC Standards Process",
    "Specifications as DNA, Code as RNA",
    "Programming for Portability",
    "Portability and Choice of Language",
    "Avoiding System Dependencies",
    "Tools for Portability",
    "Internationalization",
    "Portability, Open Standards, and Open Source",
  ],
  actions: [
    {
      label: "收窄POSIX 接口",
      detail: "只改变POSIX 接口，保留语言标准与系统差异的原始基线。",
    },
    {
      label: "显式化系统差异",
      detail: "把系统差异的输入、输出和失败状态写入可检查记录。",
    },
    {
      label: "绕过条件编译",
      detail: "跳过条件编译直接追求矩阵证据，用来观察局部捷径的系统代价。",
    },
  ],
  boundaryNote: "目标平台单一且扩展收益明确时可使用扩展，但必须隔离并记录。",
  faultNote:
    "拒绝原因：在一台机器编译成功就宣称可移植，未覆盖行为差异和工具链警告。",
} as const;

export function TaoupChapter17PortabilityTopologyLab() {
  return <UnixDecisionLab {...shared} view="topology" />;
}

export function TaoupChapter17PortabilityRepresentationLab() {
  return <UnixDecisionLab {...shared} view="representation" />;
}

export function TaoupChapter17PortabilityEvidenceLab() {
  return <UnixDecisionLab {...shared} view="evidence" />;
}
