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
      riskDelta: -16,
      visibilityDelta: 10,
      recoveryDelta: 8,
    },
    {
      label: "显式化字体资产",
      detail: "把字体资产的输入、输出和失败状态写入可检查记录。",
      riskDelta: -8,
      visibilityDelta: 18,
      recoveryDelta: 11,
    },
    {
      label: "绕过可重建",
      detail: "跳过可重建直接追求输出差异，用来观察局部捷径的系统代价。",
      riskDelta: 18,
      visibilityDelta: -14,
      recoveryDelta: -20,
    },
  ],
  metricLabels: ["源文件风险", "字体资产可见度", "输出差异恢复度"],
  boundaryNote: "像素完全一致不是唯一目标，但内容结构和关键版式必须可验证。",
  faultNote: "拒绝原因：只保存最终 PDF，丢失源文件、字体版本和生成命令。",
} as const;

export function TaoupColophonTopologyLab() {
  return (
    <UnixDecisionLab {...shared} view="topology" baseline={[42, 66, 64]} />
  );
}

export function TaoupColophonRepresentationLab() {
  return (
    <UnixDecisionLab
      {...shared}
      view="representation"
      baseline={[38, 62, 58]}
    />
  );
}

export function TaoupColophonEvidenceLab() {
  return (
    <UnixDecisionLab {...shared} view="evidence" baseline={[34, 72, 68]} />
  );
}
