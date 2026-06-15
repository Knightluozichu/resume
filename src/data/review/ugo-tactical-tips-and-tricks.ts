/** 复习题库 · 战术技巧（ugo-tactical-tips-and-tricks）。Unity Game Optimization Ch10 改编。 */

import type { ReviewQuestion } from "./types";

export const ugoTacticalTipsAndTricksQuestions: ReviewQuestion[] = [
  {
    id: "ugo-tt-1",
    chapter: "ugo-tactical-tips-and-tricks",
    level: 1,
    question: "进入/退出 Unity Play Mode 的快捷键是什么？",
    answer:
      "Windows：`Ctrl+P`；macOS：`⌘P`。比鼠标点 Play 按钮快得多，是每天使用频率最高的快捷键。",
    tags: ["快捷键", "Play Mode"],
  },
  {
    id: "ugo-tt-2",
    chapter: "ugo-tactical-tips-and-tricks",
    level: 1,
    question: "Playmode Tint 的作用是什么？",
    answer:
      "给运行时 Editor 窗口染上指定颜色，让开发者一眼认出「当前是 Play Mode」。防止误在 Play Mode 下修改 Prefab 等运行时数据，退出后才发现白改了。",
    tags: ["Playmode Tint", "Editor"],
  },
  {
    id: "ugo-tt-3",
    chapter: "ugo-tactical-tips-and-tricks",
    level: 1,
    question: "在 Hierarchy 中快速聚焦到某个 GameObject 的快捷键是什么？Scene 视图里按哪个键可以切到 Game 视图？",
    answer:
      "聚焦选中物体：`F`。Scene ↔ Game 视图切换：`Ctrl+Tab`（Windows）或 `⌘Tab`（macOS）在视图间切换。",
    tags: ["快捷键", "导航"],
  },
  {
    id: "ugo-tt-4",
    chapter: "ugo-tactical-tips-and-tricks",
    level: 2,
    question: "Profiler.BeginSample / EndSample 和 ProfilerMarker 有什么区别？什么时候用哪个？",
    answer:
      "`BeginSample(string)` 每帧分配字符串，产生 GC.Alloc，适合调试阶段偶尔使用。`ProfilerMarker` 是静态实例，无字符串分配，适合热路径（每帧高频调用），用 `using (marker.Auto())` 自动配对。热路径首选 ProfilerMarker。",
    tags: ["ProfilerMarker", "Profiler"],
  },
  {
    id: "ugo-tt-5",
    chapter: "ugo-tactical-tips-and-tricks",
    level: 2,
    question: "Deep Profile 什么时候应该打开？什么时候应该关闭？",
    answer:
      "只在怀疑某个特定函数有性能问题、需要看它内部每个子调用耗时时打开。日常不要常开——它会插桩每一个 C# 方法调用，开销极大（可能让帧时间翻几倍），会严重干扰测量结果。",
    tags: ["Deep Profile", "Profiler"],
  },
  {
    id: "ugo-tt-6",
    chapter: "ugo-tactical-tips-and-tricks",
    level: 2,
    question: "Better Stream 模式和标准 Profiler 采样有什么不同？什么场景使用它？",
    answer:
      "标准采样在 Editor 内存中缓存少量帧（约 300 帧）。Better Stream 模式把数据持续写入文件，可记录数十分钟不占内存。适合「跑几十分钟才出现的偶发卡顿」——事后从文件中加载分析。",
    tags: ["Better Stream", "Profiler"],
  },
  {
    id: "ugo-tt-7",
    chapter: "ugo-tactical-tips-and-tricks",
    level: 2,
    question: "如何查看 Unity 包体中各类资源占了多少空间？排在第一位的一般是什么？",
    answer:
      "Console → 右上角菜单 → Open Editor Log，搜索 `Build Report`。Detailed build report 会逐文件列出大小。通常排在第一位的是 Texture（纹理）——如果压缩格式未正确设置，可能占包体 40-60%。",
    tags: ["Build Report", "包体"],
  },
  {
    id: "ugo-tt-8",
    chapter: "ugo-tactical-tips-and-tricks",
    level: 3,
    question: "你的包体比竞品大一倍——你会先查什么？请按优先级列出 3 项检查。",
    answer:
      "① 纹理压缩格式：是否每个平台设了正确的 Hardware 压缩（iOS=ASTC, Android=ETC2），默认为 RGBA32=4-8倍膨胀。② Managed Stripping Level：是否设为 High，是否因反射用到了 link.xml 白名单。③ Editor Log Build Report：按大小排序，看哪个资源类别占比异常——可能是某资源 Read/Write 未关、Audio 未压缩、或 Resources 目录拖进了不该进包的资源。",
    tags: ["包体优化", "诊断"],
  },
  {
    id: "ugo-tt-9",
    chapter: "ugo-tactical-tips-and-tricks",
    level: 2,
    question: "Canvas 下 Image 和 Text 的 RaycastTarget 属性为什么是隐性 CPU 浪费？应该在什么情况下关闭？",
    answer:
      "每个开启 RaycastTarget 的 UI 元素都会参与 EventSystem 的每帧射线遍历。纯装饰文字、背景图、非交互 UI 开启它是纯粹浪费。应在 Hierarchy 批量选中这些非交互元素，在 Inspector 中关闭 RaycastTarget。经验值：几十个关闭可省 0.5-1ms 帧预算。",
    tags: ["RaycastTarget", "UI 优化"],
  },
  {
    id: "ugo-tt-10",
    chapter: "ugo-tactical-tips-and-tricks",
    level: 3,
    question: "你在 Texture Import 的 Default 标签页设了 ASTC 压缩，Build Android 后包体没变小——为什么？",
    answer:
      "Default 标签页设置只对 PC 等默认平台生效。Android/iOS 必须点 Platform 标签页（Android/iOS），勾选 Override for Android/iOS，再单独设置压缩格式。Default 的设置不会自动覆盖到平台 Override。",
    tags: ["Platform Overrides", "纹理压缩", "常见误区"],
  },
  {
    id: "ugo-tt-11",
    chapter: "ugo-tactical-tips-and-tricks",
    level: 2,
    question: "Save Layout 解决什么效率问题？建议保存哪两套 Layout？",
    answer:
      "解决「每次切换任务都要手动拖窗口」的低效。建议保存：① 调试布局（Profiler + Game + Console）② 编码布局（Scene + Game + Project）。在 Preferences → Shortcuts 中可给两套 Layout 分配快捷键，实现一键切换。",
    tags: ["Layout", "工作流"],
  },
  {
    id: "ugo-tt-12",
    chapter: "ugo-tactical-tips-and-tricks",
    level: 3,
    question: "项目中几十个 UI 按钮的 RaycastTarget 全开着，你想优化——但关闭后触摸穿透到了后面的 3D 物体。干净的修复方案是什么？",
    answer:
      "保留交互层 Canvas 的 Raycaster 和 UI 元素的 RaycastTarget 开启。把背景/装饰 UI 移到另一个独立的 Canvas，且这个新 Canvas 不挂 GraphicRaycaster 组件。这样既省去了不必要的射线检测，又不会让触摸穿透到 3D 世界。注意 Canvas 追加会增加合批边界——对于纯装饰背景来说一般是净收益。",
    tags: ["UI 优化", "RaycastTarget", "Canvas"],
  },
];
