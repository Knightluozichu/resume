import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-chapter-09-generation",
  title: "第9章 生成：提升规格说明的层次",
  question: "从字段规格同时生成解析器、帮助文本和测试向量",
  nodes: ["唯一规格", "转换规则", "生成产物", "差异检查", "重建门禁"],
  concepts: [
    "9. Generation",
    "Data-Driven Programming",
    "Case Study: ascii",
    "Case Study: Statistical Spam Filtering",
    "Case Study: Metaclass Hacking in fetchmailconf",
    "Ad-hoc Code Generation",
    "Case Study: Generating Code for the ascii Displays",
    "Case Study: Generating HTML Code for a Tabular List",
  ],
  actions: [
    {
      label: "收窄数据驱动",
      detail: "只改变数据驱动，保留确定生成与禁止手改的原始基线。",
    },
    {
      label: "显式化禁止手改",
      detail: "把禁止手改的输入、输出和失败状态写入可检查记录。",
    },
    {
      label: "绕过产物校验",
      detail: "跳过产物校验直接追求版本追踪，用来观察局部捷径的系统代价。",
    },
  ],
  boundaryNote: "若生成器比目标逻辑更难理解且只运行一次，直接实现可能更清晰。",
  faultNote: "拒绝原因：在生成文件上手工修补，下一次生成静默覆盖且无法追溯。",
} as const;

export function TaoupChapter09GenerationTopologyLab() {
  return <UnixDecisionLab {...shared} view="topology" />;
}

export function TaoupChapter09GenerationRepresentationLab() {
  return <UnixDecisionLab {...shared} view="representation" />;
}

export function TaoupChapter09GenerationEvidenceLab() {
  return <UnixDecisionLab {...shared} view="evidence" />;
}
