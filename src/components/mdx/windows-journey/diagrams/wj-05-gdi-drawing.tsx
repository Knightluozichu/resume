import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第5章 遮羞的艺术——Windows游戏绘图技巧",
  label: "第二篇 · GDI 2D游戏编程",
  color: "#be185d",
  soft: "#fdf2f8",
  chain: [
    "取得设备环境",
    "建立坐标与资源",
    "选择GDI对象",
    "绘制离屏画面",
    "提交前台显示",
    "释放全部句柄",
  ],
  concepts: [
    "第5章 遮羞的艺术——Windows游戏绘图技巧",
    "5.1 透明贴图的两套体系",
    "5.2 透明遮罩法",
    "5.2.1 具体实现细节",
    "5.2.2 示例程序GDIdemo4",
    "5.3 透明色彩法",
    "5.3.1 具体实现细节",
    "5.3.2 示例程序GDIdemo5",
    "5.4 自己动手处理图片素材",
    "5.4.1 游戏素材的来源",
    "5.4.2 Photoshop图像处理软件",
    "5.4.3 处理游戏素材图片",
    "5.5 章节小憩",
  ],
} as const;

export function Wj05GdiDrawingMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj05GdiDrawingExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj05GdiDrawingEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
