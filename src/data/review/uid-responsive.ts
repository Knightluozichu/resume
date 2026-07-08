import type { ReviewQuestion } from "./types";

/** 响应式 UI 设计 复习题 */
export const uidResponsiveQuestions: ReviewQuestion[] = [
  {
    id: "uid-responsive-1",
    chapter: "uid-responsive",
    level: 1,
    question: "Canvas Scaler 的三种缩放模式是什么？推荐用哪种？",
    answer: "Constant Pixel Size（固定像素，不随屏幕缩放）、Scale With Screen Size（按屏幕大小缩放，推荐）、Constant Physical Size（按物理尺寸缩放， DPI 相关）。游戏 UI 推荐 Scale With Screen Size，设置 Reference Resolution（如 1920x1080），UI 会按基准分辨率设计并自动适配不同屏幕。",
    tags: ["Canvas Scaler", "缩放"],
  },
  {
    id: "uid-responsive-2",
    chapter: "uid-responsive",
    level: 2,
    question: "Scale With Screen Size 模式下 Match 属性的作用是什么？",
    answer: "Match 决定当屏幕宽高比与 Reference Resolution 不同时，以宽度还是高度为基准缩放。Match=0 以宽度为基准（横屏游戏推荐，宽度填满，高度可能留白或裁剪）；Match=1 以高度为基准（竖屏游戏推荐）；Match=0.5 宽高各占一半（折中）。选择取决于游戏的主要方向和 UI 布局策略。",
    tags: ["Match", "缩放", "宽高比"],
  },
  {
    id: "uid-responsive-3",
    chapter: "uid-responsive",
    level: 3,
    question: "如何适配 iPhone 的刘海屏和圆角？",
    answer: "使用 Screen.safeArea 获取安全区域，在 Awake 中将根 Canvas 的 RectTransform 调整到 safeArea 范围内：rectTransform.offsetMin = safeArea.position; rectTransform.offsetMax = safeArea.max - screen.size。或者用 RectTransform.applySafeArea 方法。注意：1)不同设备 safeArea 不同，必须运行时获取；2)刘海方向可能旋转（竖屏/横屏切换），需监听 Screen.onResolutionChanged；3)全屏背景图不裁剪，只裁剪交互元素。",
    tags: ["SafeArea", "刘海屏", "适配"],
  },
  {
    id: "uid-responsive-4",
    chapter: "uid-responsive",
    level: 4,
    question: "设计一个同时支持手机竖屏和平板横屏的 UI 布局方案？",
    answer: "1)Canvas Scaler 用 Scale With Screen Size，Reference Resolution 设为 1080x1920（竖屏基准），Match=1（以高度为基准）；2)检测宽高比：if ((float)Screen.width / Screen.height > 1.5f) 横屏布局 else 竖屏布局；3)横屏时切换 LayoutGroup 方向（Vertical→Horizontal）、调整元素尺寸和间距；4)关键 UI 元素用拉伸锚点（四角拉开）确保填满屏幕，次要元素用点锚点固定位置；5)Safe Area 适配确保不被刘海/圆角遮挡；6)用 AspectRatioFitter 约束特定元素的比例。核心原则：以一个方向为基准设计，另一个方向用布局系统自适应。",
    tags: ["横竖屏", "适配", "综合"],
  },
];
