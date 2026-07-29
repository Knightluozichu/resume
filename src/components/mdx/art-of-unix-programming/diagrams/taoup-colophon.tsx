import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-colophon",
  title: "Colophon",
  question: "从源文档重建网页与印刷版，并比较关键结构差异",
  nodes: ["源格式", "转换工具", "排版资产", "构建命令", "产物校验"],
  concepts: ["Colophon"],
  actions: [
    {
      label: "收窄源文件",
      detail: "只改变源文件，保留工具版本与字体资产的原始基线。",
    },
    {
      label: "显式化字体资产",
      detail: "把字体资产的输入、输出和失败状态写入可检查记录。",
    },
    {
      label: "绕过可重建",
      detail: "跳过可重建直接追求输出差异，用来观察局部捷径的系统代价。",
    },
  ],
  boundaryNote: "像素完全一致不是唯一目标，但内容结构和关键版式必须可验证。",
  faultNote: "拒绝原因：只保存最终 PDF，丢失源文件、字体版本和生成命令。",
} as const;

export function TaoupColophonTopologyLab() {
  return <UnixDecisionLab {...shared} view="topology" />;
}

export function TaoupColophonRepresentationLab() {
  return <UnixDecisionLab {...shared} view="representation" />;
}

export function TaoupColophonEvidenceLab() {
  return <UnixDecisionLab {...shared} view="evidence" />;
}
