import type { ReviewQuestion } from "./types";
export const windowManagerQuestions: ReviewQuestion[] = [
  { id: "wm-1", chapter: "window-manager", level: 1, question: "Window、WindowManager、ViewRootImpl 分别是什么角色？", answer: "Window：抽象窗口概念(类型/flag)。WindowManager：App端管理器(Binder客户端调WMS)。ViewRootImpl：绘制引擎(measure/layout/draw)+事件分发。", tags: ["三剑客"] },
  { id: "wm-2", chapter: "window-manager", level: 1, question: "addView 到 View 上屏的完整流程是什么？", answer: "WindowManager→Binder→WMS创建窗口+分配Surface→返回Surface→创建ViewRootImpl→setView→performTraversals(measure/layout/draw)→提交Surface→SurfaceFlinger合成上屏。", tags: ["addView"] },
  { id: "wm-3", chapter: "window-manager", level: 2, question: "App 进程、system_server、SurfaceFlinger 三者在渲染中的分工？", answer: "App进程负责画(measure/layout/draw)；WMS(system_server)负责管(窗口大小/位置/层级)；SurfaceFlinger负责合(多个Surface叠一起输出屏幕)。三权分立。", tags: ["分工"] },
  { id: "wm-4", chapter: "window-manager", level: 2, question: "窗口类型的 Z-Order 层级规律是什么？", answer: "应用窗口(1-99) < 子窗口(1000-1999:Dialog/Popup) < 系统窗口(2000-2999:Toast/状态栏)。值越大越上面。Toast 是系统窗口级→可显示在任何App之上。", tags: ["Z-Order"] },
];
