import { CssWorldLab } from "./official-css-world-lab";

const nodes = [
  "保留原生焦点",
  "绘制 outline",
  "处理偏移与圆角",
  "选择系统 cursor",
  "提供自定义回退",
  "核对键盘与指针",
] as const;

export function Csw11UserInterfaceMapLab() {
  return (
    <CssWorldLab
      title="第 11 章 用户界面样式 · 盒与流地图"
      label="CSS 世界 · 界面与流向"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Csw11UserInterfaceExperimentLab() {
  return (
    <CssWorldLab
      title="第 11 章 用户界面样式 · 边界实验"
      label="CSS 世界 · 界面与流向"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Csw11UserInterfaceEvidenceLab() {
  return (
    <CssWorldLab
      title="第 11 章 用户界面样式 · 恢复证据"
      label="CSS 世界 · 界面与流向"
      nodes={nodes}
      mode="evidence"
    />
  );
}
