/** 复习题库 · 脚本优化策略（ugo-scripting-strategies）。Unity Game Optimization Ch2 改编。 */

import type { ReviewQuestion } from "./types";

export const ugoScriptingStrategiesQuestions: ReviewQuestion[] = [
  {
    id: "ugo-ss-1",
    chapter: "ugo-scripting-strategies",
    level: 1,
    question: "为什么不应在 Update 里每帧调用 GetComponent？",
    answer:
      "GetComponent 需要穿越 C# 与原生引擎边界查找组件，有固定开销。每帧重复调用会把同一查找做 60 次以上，Profiler 里容易堆成热点。应在 Awake/Start 缓存到字段，或在 Inspector 拖序列化引用。",
    tags: ["GetComponent", "缓存"],
  },
  {
    id: "ugo-ss-2",
    chapter: "ugo-scripting-strategies",
    level: 1,
    question: "空的 Update() 函数会影响性能吗？为什么？",
    answer:
      "会。只要 MonoBehaviour 启用且定义了 Update，引擎 PlayerLoop 每帧仍会调度调用，即使函数体为空也有跨边界开销。大量空回调会拖慢主线程，应删除无用脚本或改用集中自定义 Update 层。",
    tags: ["空回调", "Update"],
  },
  {
    id: "ugo-ss-3",
    chapter: "ugo-scripting-strategies",
    level: 1,
    question: "Update、Coroutine、InvokeRepeating 分别适合什么场景？",
    answer:
      "Update 与帧率同步，适合每帧输入、动画跟随。Coroutine 用 yield 挂起，适合分步流程、等待秒/帧再继续。InvokeRepeating 按固定间隔触发，适合低频轮询（如每 2 秒刷新 UI），但不如事件驱动干净。",
    tags: ["Coroutine", "调度"],
  },
  {
    id: "ugo-ss-4",
    chapter: "ugo-scripting-strategies",
    level: 2,
    question: "Unity 里 `if (go == null)` 与 C# 普通 null 检查有何不同？",
    answer:
      "Unity 重载了 UnityEngine.Object 的 ==，对已销毁但仍占位的「假 null」对象也返回 true。纯 C# 引用可能非 null 但对象已在原生侧销毁。应用 Unity 的 == 或显式判活，避免对已销毁对象操作。",
    tags: ["空引用", "Unity Object"],
  },
  {
    id: "ugo-ss-5",
    chapter: "ugo-scripting-strategies",
    level: 2,
    question: "为什么应避免运行时使用 GameObject.Find 和 SendMessage？",
    answer:
      "Find/FindWithTag 从场景根遍历整棵层级树并按名称或标签匹配，复杂度随节点数增长。SendMessage 还要反射查找方法名。应在 Awake 缓存引用、用事件/接口直调，或启动时注册到管理器。",
    tags: ["Find", "SendMessage"],
  },
  {
    id: "ugo-ss-6",
    chapter: "ugo-scripting-strategies",
    level: 2,
    question: "比较距离时为什么推荐 Vector3.sqrMagnitude 而不是 magnitude？",
    answer:
      "magnitude 内部要开平方根（sqrt），比较远近时只需比平方距离即可，sqrMagnitude 省去 sqrt 更省 CPU。写法：`dist.sqrMagnitude < range * range` 而不是 `dist.magnitude < range`。",
    tags: ["Vector3", "数据结构"],
  },
  {
    id: "ugo-ss-7",
    chapter: "ugo-scripting-strategies",
    level: 2,
    question: "List 与数组在热路径上各有什么取舍？",
    answer:
      "数组长度固定、无额外分配，热循环首选。List 动态扩容方便但可能触发 GC；频繁 Add/Remove 时考虑预分配容量或对象池。Profiler 里若 GC Alloc 每帧上涨，先查容器与字符串拼接。",
    tags: ["List", "GC"],
  },
  {
    id: "ugo-ss-8",
    chapter: "ugo-scripting-strategies",
    level: 3,
    question: "Additive 与 Async 场景加载各解决什么问题？",
    answer:
      "Additive（LoadSceneMode.Additive）在保留当前场景的同时叠加载入，适合大地图分区、UI 叠加。Async（LoadSceneAsync）不阻塞主线程，可配合 allowSceneActivation 与进度条，避免切换场景时卡死一帧。",
    tags: ["场景加载", "Async"],
  },
  {
    id: "ugo-ss-9",
    chapter: "ugo-scripting-strategies",
    level: 3,
    question: "什么是集中自定义 Update 层？有什么好处？",
    answer:
      "由一个管理器在单一 Update 里遍历注册对象并调用自定义 Tick，而不是每个对象挂 MonoBehaviour.Update。好处：减少成百上千次引擎回调开销、统一控制更新频率、易做分帧与优先级。代价是需要自己维护注册表与生命周期。",
    tags: ["自定义 Update", "调度"],
  },
  {
    id: "ugo-ss-10",
    chapter: "ugo-scripting-strategies",
    level: 3,
    question: "Profiler 显示某脚本 GetComponent 占 CPU 很高，你会按什么顺序改？",
    answer:
      "① 把 GetComponent 移到 Awake/Start 或改 Inspector 序列化引用；② 检查是否有空 Update 可删；③ 若逻辑不需每帧，改 Coroutine/事件或降频；④ 仍不够则考虑自定义 Update 层合并调度。改后在同场景复测基线。",
    tags: ["Profiler", "优化流程"],
  },
  {
    id: "ugo-ss-11",
    chapter: "ugo-scripting-strategies",
    level: 2,
    question: "序列化字段引用和 Awake 里 GetComponent 缓存，优先选哪个？",
    answer:
      "能拖引用就优先 Inspector 序列化——零运行时查找、策划可在 prefab 上直接配。Awake 缓存适合同 GameObject 上组件或动态生成对象。两者都比每帧 GetComponent 好；禁止在 Update 里重复查找。",
    tags: ["序列化", "GetComponent"],
  },
];
