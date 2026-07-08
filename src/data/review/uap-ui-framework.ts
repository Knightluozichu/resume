import type { ReviewQuestion } from "./types";

export const uapUiFrameworkQuestions: ReviewQuestion[] = [
  {
    id: "uap-ui-framework-1",
    chapter: "uap-ui-framework",
    level: 1,
    question: "UI 框架 MVP 三层各自的职责是什么？",
    answer: "View（纯表现层）：只负责把数据渲染到 UGUI 控件，不含逻辑，是 MonoBehaviour。Presenter（中间层）：处理 UI 交互逻辑，连接 View 和 Model，纯 C# 类可测试。Model（数据层）：持有 UI 状态，可被多个 Presenter 共享，变化时通过事件通知。View 依赖 Presenter，Presenter 依赖 Model，反向走事件。",
    tags: ["MVP", "UI架构", "职责分离"],
  },
  {
    id: "uap-ui-framework-2",
    chapter: "uap-ui-framework",
    level: 2,
    question: "为什么 UI 要做动静分离？不分会怎样？",
    answer: "Canvas 的重建粒度是自身——任何子元素变化都触发整个 Canvas 重建（布局重算+网格重建）。如果所有 UI 放一个 Canvas，一个文本变化就重建全部，Profile 显示 Canvas.SendWillRenderCanvals 占大头。动静分离：静态背景一个 Canvas，动态文本/列表单独 Canvas。拆分后只有变化的 Canvas 重建，静态的永不重建。滚动列表尤其要独立 Canvas。",
    tags: ["动静分离", "Canvas", "性能"],
  },
  {
    id: "uap-ui-framework-3",
    chapter: "uap-ui-framework",
    level: 3,
    question: "UI 列表 1000 条数据，怎么保证滚动不卡？",
    answer: "用虚拟滚动（Virtual Scroll）：只实例化可见区域的 Item（约 10-20 个），滚动时复用 Item、只更新数据。核心是对象池 + 滚动位置计算。监听 ScrollRect.onValueChanged，根据可见区域算出需要显示的 index 范围，从池取 Item 填数据，滚出区域的 Item 回池。1000 条数据实际只渲染 15 个 Item，性能与数据量无关。可用 EnhancedScroller 或自实现。",
    tags: ["虚拟滚动", "对象池", "列表性能"],
  },
  {
    id: "uap-ui-framework-4",
    chapter: "uap-ui-framework",
    level: 4,
    question: "设计一套 UI 框架，要求支持面板栈管理、弹窗排队、层级控制。给出核心设计。",
    answer: "1）UIPanel 基类：定义 OnOpen(param)/OnClose()/OnRefresh() 生命周期，所有面板继承；2）UIManager：维护面板栈（Stack<UIPanel>），Open 走 push、Close 走 pop；层级通过 Canvas.sortingOrder 递增控制（HUD/Panel/Dialog/Top 分组）；3）弹窗队列：Dialog 单独队列，一次只显示一个，关闭后弹下一个；4）对象池：面板预制体池化，Get 激活 Release 禁用回池，不 Destroy；5）面板间不直接调用，走 EventBus 发信号联动（如「购买成功」信号→背包刷新+商店刷新）。这样面板可独立开发、可复用、可测试。",
    tags: ["UI框架", "栈管理", "综合"],
  },
];
