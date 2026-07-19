import {
  WindowsJourneyMigrationLab,
  WindowsJourneyPipelineLab,
  WindowsJourneyRecoveryLab,
  type WindowsJourneyCausalModel,
  type WindowsJourneyCoverageNode,
} from "./official-windows-journey-book-lab";

const title = "第5章 遮羞的艺术——Windows游戏绘图技巧";
const focus = "用内存 DC、兼容位图和 BitBlt 控制精灵合成与透明掩码";
const stages = [
  "创建后备 DC",
  "清理背景",
  "绘制精灵",
  "完成合成",
  "一次发布"
];
const nodes = [
  {
    "label": "第5章 遮羞的艺术——Windows游戏绘图技巧",
    "mechanism": "围绕用内存 DC、兼容位图和 BitBlt 控制精灵合成与透明掩码，对 第5章 遮羞的艺术——Windows游戏绘图技巧，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留缓冲代际、BitBlt 次数、透明像素和帧差分。",
    "probe": "记录缓冲代际、BitBlt 次数、透明像素和帧差分"
  },
  {
    "label": "5.1 透明贴图的两套体系",
    "mechanism": "围绕用内存 DC、兼容位图和 BitBlt 控制精灵合成与透明掩码，5.1 透明贴图的两套体系 限定本章的一个知识坐标；独立解释围绕“所有绘制先在兼容内存 DC 完成，再以一次 BitBlt 发布完整帧”展开，并以“前台只观察到完整帧，遮罩和源图合成不污染背景”结束。",
    "probe": "记录缓冲代际、BitBlt 次数、透明像素和帧差分"
  },
  {
    "label": "5.2 透明遮罩法",
    "mechanism": "围绕用内存 DC、兼容位图和 BitBlt 控制精灵合成与透明掩码，5.2 透明遮罩法 限定本章的一个知识坐标；独立解释围绕“所有绘制先在兼容内存 DC 完成，再以一次 BitBlt 发布完整帧”展开，并以“前台只观察到完整帧，遮罩和源图合成不污染背景”结束。",
    "probe": "记录缓冲代际、BitBlt 次数、透明像素和帧差分"
  },
  {
    "label": "5.2.1 具体实现细节",
    "mechanism": "围绕用内存 DC、兼容位图和 BitBlt 控制精灵合成与透明掩码，5.2.1 具体实现细节 限定本章的一个知识坐标；独立解释围绕“所有绘制先在兼容内存 DC 完成，再以一次 BitBlt 发布完整帧”展开，并以“前台只观察到完整帧，遮罩和源图合成不污染背景”结束。",
    "probe": "记录缓冲代际、BitBlt 次数、透明像素和帧差分"
  },
  {
    "label": "5.2.2 示例程序GDIdemo4",
    "mechanism": "围绕用内存 DC、兼容位图和 BitBlt 控制精灵合成与透明掩码，对 5.2.2 示例程序GDIdemo4，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留缓冲代际、BitBlt 次数、透明像素和帧差分。",
    "probe": "记录缓冲代际、BitBlt 次数、透明像素和帧差分"
  },
  {
    "label": "5.3 透明色彩法",
    "mechanism": "围绕用内存 DC、兼容位图和 BitBlt 控制精灵合成与透明掩码，5.3 透明色彩法 限定本章的一个知识坐标；独立解释围绕“所有绘制先在兼容内存 DC 完成，再以一次 BitBlt 发布完整帧”展开，并以“前台只观察到完整帧，遮罩和源图合成不污染背景”结束。",
    "probe": "记录缓冲代际、BitBlt 次数、透明像素和帧差分"
  },
  {
    "label": "5.3.1 具体实现细节",
    "mechanism": "围绕用内存 DC、兼容位图和 BitBlt 控制精灵合成与透明掩码，5.3.1 具体实现细节 限定本章的一个知识坐标；独立解释围绕“所有绘制先在兼容内存 DC 完成，再以一次 BitBlt 发布完整帧”展开，并以“前台只观察到完整帧，遮罩和源图合成不污染背景”结束。",
    "probe": "记录缓冲代际、BitBlt 次数、透明像素和帧差分"
  },
  {
    "label": "5.3.2 示例程序GDIdemo5",
    "mechanism": "围绕用内存 DC、兼容位图和 BitBlt 控制精灵合成与透明掩码，对 5.3.2 示例程序GDIdemo5，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留缓冲代际、BitBlt 次数、透明像素和帧差分。",
    "probe": "记录缓冲代际、BitBlt 次数、透明像素和帧差分"
  },
  {
    "label": "5.4 自己动手处理图片素材",
    "mechanism": "围绕用内存 DC、兼容位图和 BitBlt 控制精灵合成与透明掩码，5.4 自己动手处理图片素材 限定本章的一个知识坐标；独立解释围绕“所有绘制先在兼容内存 DC 完成，再以一次 BitBlt 发布完整帧”展开，并以“前台只观察到完整帧，遮罩和源图合成不污染背景”结束。",
    "probe": "记录缓冲代际、BitBlt 次数、透明像素和帧差分"
  },
  {
    "label": "5.4.1 游戏素材的来源",
    "mechanism": "围绕用内存 DC、兼容位图和 BitBlt 控制精灵合成与透明掩码，对 5.4.1 游戏素材的来源，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留缓冲代际、BitBlt 次数、透明像素和帧差分。",
    "probe": "记录缓冲代际、BitBlt 次数、透明像素和帧差分"
  },
  {
    "label": "5.4.2 Photoshop图像处理软件",
    "mechanism": "围绕用内存 DC、兼容位图和 BitBlt 控制精灵合成与透明掩码，5.4.2 Photoshop图像处理软件 限定本章的一个知识坐标；独立解释围绕“所有绘制先在兼容内存 DC 完成，再以一次 BitBlt 发布完整帧”展开，并以“前台只观察到完整帧，遮罩和源图合成不污染背景”结束。",
    "probe": "记录缓冲代际、BitBlt 次数、透明像素和帧差分"
  },
  {
    "label": "5.4.3 处理游戏素材图片",
    "mechanism": "围绕用内存 DC、兼容位图和 BitBlt 控制精灵合成与透明掩码，对 5.4.3 处理游戏素材图片，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留缓冲代际、BitBlt 次数、透明像素和帧差分。",
    "probe": "记录缓冲代际、BitBlt 次数、透明像素和帧差分"
  },
  {
    "label": "5.5 章节小憩",
    "mechanism": "围绕用内存 DC、兼容位图和 BitBlt 控制精灵合成与透明掩码，对 5.5 章节小憩，收尾不是装饰，而是要求用缓冲代际、BitBlt 次数、透明像素和帧差分复盘“前台只观察到完整帧，遮罩和源图合成不污染背景”是否在正常和失败路径同时成立。",
    "probe": "记录缓冲代际、BitBlt 次数、透明像素和帧差分"
  }
] satisfies WindowsJourneyCoverageNode[];
const model = {
  "historicalLabel": "GDI 双缓冲",
  "modernLabel": "现代离屏表面",
  "unit": "撕裂像素",
  "historicalBase": 16,
  "historicalSlope": 6,
  "modernBase": 7,
  "modernSlope": 1.5,
  "faultPenalty": 20,
  "invariant": "前台只观察到完整帧，遮罩和源图合成不污染背景",
  "fault": "源 DC 与目标 DC 尺寸或 ROP 顺序错误",
  "evidence": "缓冲代际、BitBlt 次数、透明像素和帧差分"
} satisfies WindowsJourneyCausalModel;
const props = { title, focus, stages, nodes, model };

export function Wj05GdiDrawingMapLab() {
  return <WindowsJourneyPipelineLab {...props} />;
}

export function Wj05GdiDrawingExperimentLab() {
  return <WindowsJourneyMigrationLab {...props} />;
}

export function Wj05GdiDrawingEvidenceLab() {
  return <WindowsJourneyRecoveryLab {...props} />;
}
