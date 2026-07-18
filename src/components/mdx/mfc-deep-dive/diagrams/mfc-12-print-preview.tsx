import { OfficialMfcLab } from "./official-mfc-lab";

const data = {
  title: "第12章 打印与预览",
  label: "第四篇 · 打印管线",
  color: "#a16207",
  soft: "#fefce8",
  chain: [
    "准备打印任务",
    "查询设备能力",
    "设置映射方式",
    "计算分页",
    "绘制页眉正文",
    "预览并结束",
  ],
  concepts: [
    "第12章 打印与预览",
    "概述",
    "打印操作的后台原理",
    "MFC默认的打印机制",
    "Scribble打印机制的增强",
    "打印机的页和文件的页",
    "配置GDI绘图工具",
    "尺寸与方向：关于映射方式（坐标系统）",
    "分页",
    "页眉与页脚",
    "动态计算页码",
    "打印预览（Print Preview）",
    "本章回顾",
  ],
} as const;

export function Mfc12PrintPreviewMapLab() {
  return <OfficialMfcLab {...data} view="map" />;
}

export function Mfc12PrintPreviewExperimentLab() {
  return <OfficialMfcLab {...data} view="experiment" />;
}

export function Mfc12PrintPreviewEvidenceLab() {
  return <OfficialMfcLab {...data} view="evidence" />;
}
