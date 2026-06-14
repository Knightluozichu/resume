import type { ReviewQuestion } from "./types";
export const wmsQuestions: ReviewQuestion[] = [
  { id: "wms-1", chapter: "wms", level: 1, question: "WMS 的三大职责是什么？", answer: "① 窗口管理(添加/删除/更新/Z-Order)；② 输入事件分发(触摸发到哪个窗口)；③ 窗口动画(Activity切换/Toast动画)。", tags: ["WMS"] },
  { id: "wms-2", chapter: "wms", level: 1, question: "触摸事件从硬件到 Activity.onTouchEvent 的完整链路？", answer: "硬件→内核→EventHub→InputReader→InputDispatcher→InputManagerService→WMS查找目标窗口(坐标+Z-Order)→Socket→App进程→ViewRootImpl→主线程Handler→DecorView→View树dispatchTouchEvent→onTouchEvent。", tags: ["触摸事件"] },
  { id: "wms-3", chapter: "wms", level: 2, question: "为什么 Toast 浮在屏幕最上面，但你触摸它能点到下面的按钮？", answer: "Toast 的 Window 设置了 FLAG_NOT_TOUCHABLE。WMS 查找触摸目标时看到这个 flag 就跳过，把事件发给下面的窗口→触摸穿透。", tags: ["Toast"] },
  { id: "wms-4", chapter: "wms", level: 2, question: "Android 10+ 系统弹窗有什么限制？怎么获取权限？", answer: "Android 10 限制后台 App 启动系统级窗口→需 SYSTEM_ALERT_WINDOW 权限并在设置里手动开启。检查 Settings.canDrawOverlays()，引导用户在设置授权。", tags: ["弹窗权限"] },
];
