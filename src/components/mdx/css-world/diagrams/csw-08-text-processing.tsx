import { CssWorldLab } from "./official-css-world-lab";

const nodes = [
  "确定字号与单位",
  "选择字体回退链",
  "匹配字重与字形",
  "装载 @font-face",
  "控制间距与断行",
  "应用首字与首行",
] as const;

export function Csw08TextProcessingMapLab() {
  return (
    <CssWorldLab
      title="第 8 章 强大的文本处理能力 · 盒与流地图"
      label="CSS 世界 · 文本与装饰"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Csw08TextProcessingExperimentLab() {
  return (
    <CssWorldLab
      title="第 8 章 强大的文本处理能力 · 边界实验"
      label="CSS 世界 · 文本与装饰"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Csw08TextProcessingEvidenceLab() {
  return (
    <CssWorldLab
      title="第 8 章 强大的文本处理能力 · 恢复证据"
      label="CSS 世界 · 文本与装饰"
      nodes={nodes}
      mode="evidence"
    />
  );
}
