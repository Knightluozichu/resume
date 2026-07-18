import { CssWorldLab } from "./official-css-world-lab";

const nodes = [
  "解析颜色值",
  "传播 currentColor",
  "铺设背景色",
  "定位背景图",
  "应用重复与附着",
  "验证隐藏和兼容状态",
] as const;

export function Csw09DecorationMapLab() {
  return (
    <CssWorldLab
      title="第 9 章 元素的装饰与美化 · 盒与流地图"
      label="CSS 世界 · 文本与装饰"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Csw09DecorationExperimentLab() {
  return (
    <CssWorldLab
      title="第 9 章 元素的装饰与美化 · 边界实验"
      label="CSS 世界 · 文本与装饰"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Csw09DecorationEvidenceLab() {
  return (
    <CssWorldLab
      title="第 9 章 元素的装饰与美化 · 恢复证据"
      label="CSS 世界 · 文本与装饰"
      nodes={nodes}
      mode="evidence"
    />
  );
}
