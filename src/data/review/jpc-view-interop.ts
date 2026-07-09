import type { ReviewQuestion } from "./types";

export const jpcViewInteropQuestions: ReviewQuestion[] = [
  {
    id: "jpc-vi-1",
    chapter: "jpc-view-interop",
    level: 1,
    question: "AndroidView的factory和update分别在何时调用？为什么不能在update中创建新View？",
    answer: "调用时机：①factory——只在Composable首次进入组合时调用一次，负责创建View实例。②update——每次重组时调用，接收factory创建的View，负责根据最新State同步属性。不能在update中创建新View的原因：①性能——update每次重组调用，创建新View开销大（特别是WebView/MapView），导致卡顿。②状态丢失——新View是全新实例，之前配置（cookie、缓存、JS状态）全部丢失。③内存泄漏——旧View未释放，每次重组创建新View导致内存增长。④生命周期问题——View的attach/detach需要与窗口绑定，频繁创建销毁导致生命周期混乱。正确做法：factory创建View+一次性配置，update只同步变化的属性。",
    tags: ["AndroidView", "factory", "update"]
  },
  {
    id: "jpc-vi-2",
    chapter: "jpc-view-interop",
    level: 1,
    question: "在Compose中嵌入MapView需要处理哪些生命周期问题？",
    answer: "MapView是生命周期敏感组件，需要绑定onCreate/onStart/onResume/onPause/onStop/onDestroy/onLowMemory，否则地图不显示或内存泄漏。步骤：①factory中创建MapView并调用onCreate(null)和getMapAsync。②用DisposableEffect监听LocalLifecycleOwner生命周期，在LifecycleEventObserver的对应事件中调用MapView的方法（ON_CREATE→onCreate, ON_START→onStart, ON_RESUME→onResume等）。③onDispose中移除观察者并调用mapView.onDestroy()。④getMapAsync回调中配置GoogleMap，用remember保存引用。⑤AndroidView的update中根据State更新地图（移动camera、添加marker）。关键：Compose没有直接的生命周期回调，必须通过LocalLifecycleOwner桥接，DisposableEffect确保离开组合时清理。",
    tags: ["MapView", "生命周期", "DisposableEffect"]
  },
  {
    id: "jpc-vi-3",
    chapter: "jpc-view-interop",
    level: 2,
    question: "ComposeView有什么性能开销？如何优化多个ComposeView的使用？",
    answer: "ComposeView开销：①独立Composition——每个ComposeView创建独立Composition（SlotTable、Composer、Snapshot管理），多个ComposeView开销成倍增加。②无Composition共享——不同ComposeView无法共享remember/derivedStateOf和重组调度。③测量开销——ComposeView继承ViewGroup，每次measure/layout走传统View测量流程。优化策略：①合并ComposeView——多个小ComposeView合并为一个大ComposeView（如列表中每item一个ComposeView改为整个列表一个ComposeView+LazyColumn）。②Fragment级迁移——整个Fragment根View用一个ComposeView。③setViewCompositionStrategy——设置正确的销毁策略（DisposeOnViewTreeLifecycleDestroyed）。④避免在RecyclerView Adapter中使用ComposeView——ViewHolder回收频繁创建/销毁ComposeView，改用LazyColumn。原则：最小化ComposeView数量，最大化单个Composition内Composable数量。",
    tags: ["ComposeView", "性能开销", "优化"]
  },
  {
    id: "jpc-vi-4",
    chapter: "jpc-view-interop",
    level: 2,
    question: "设计一个从传统View体系渐进迁移到Compose的策略。",
    answer: "渐进迁移（自底向上）：①阶段一——迁移独立叶子页面（关于页、设置页），无复杂依赖，风险最低，团队熟悉Compose基本API。②阶段二——迁移列表项，LazyColumn替代RecyclerView+Adapter，立刻享受声明式优势。③阶段三——迁移表单和对话框，验证Compose状态管理能力。④阶段四——迁移容器页面，Scaffold+Navigation整合。关键原则：①每个Fragment独立迁移——不影响其他模块降低风险。②共享主题——MaterialComponents(XML)+MaterialTheme(Compose)保持视觉一致。③互操作——用AndroidView嵌入尚未迁移的View，用ComposeView在XML中嵌入Compose。④测试——每阶段回归测试确保功能不变。⑤不全量重写——保留业务逻辑层，只迁移UI层。时间线：小型App 1-2月，中大型3-6月分模块推进。",
    tags: ["渐进迁移", "迁移策略", "自底向上"]
  }
];
