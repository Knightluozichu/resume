import type { ReviewQuestion } from "./types";
export const drawOptimizationQuestions: ReviewQuestion[] = [
  { id: "do-1", chapter: "draw-optimization", level: 1, question: "Android 一帧渲染的流水线是什么？必须在多长时间内完成？", answer: "VSYNC→Input→Animation→measure→layout→draw→合成→上屏。必须在 16ms 内完成（60fps）。超过就掉帧→用户感知卡顿。", tags: ["渲染流水线"] },
  { id: "do-2", chapter: "draw-optimization", level: 1, question: "什么是过度绘制（Overdraw）？怎么检测？", answer: "同一像素被画了多次。用开发者选项→GPU过度绘制检测→原色好/蓝色可接受/红色严重。减少手段：移除windowBackground、减少嵌套背景。", tags: ["Overdraw"] },
  { id: "do-3", chapter: "draw-optimization", level: 2, question: "为什么嵌套 LinearLayout 是性能杀手？", answer: "LinearLayout 需要两次 measure（第一次测尺寸、第二次分配weight）。每多一层→子View的measure次数翻倍。三层嵌套=最深View被measure 2³=8次。ConstraintLayout单层解决→不触发多重measure。", tags: ["布局优化"] },
  { id: "do-4", chapter: "draw-optimization", level: 2, question: "自定义 View 的 onDraw 里有 new Paint() 有什么问题？", answer: "onDraw 每帧调用(每秒60次)→每帧都 new Paint 触发分配和GC→卡顿。应该把 Paint 等对象创建在初始化时，onDraw 里只复用。", tags: ["onDraw"] },
];
