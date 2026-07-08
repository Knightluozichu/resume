import type { ReviewQuestion } from "./types";

/** 协程与事件系统 复习题 */
export const usgCoroutineEventQuestions: ReviewQuestion[] = [
  {
    id: "usg-coroutine-event-1",
    chapter: "usg-coroutine-event",
    level: 1,
    question: "协程是什么？它和多线程有什么区别？",
    answer: "协程（Coroutine）是用 IEnumerator 实现的跨帧异步机制，用 yield return 控制暂停与恢复。区别：协程不是多线程——它仍在主线程执行，只是用 yield return 把执行权交还给 Unity，等条件满足后继续。协程内可直接访问 Unity API（主线程），多线程不能。协程不能做阻塞操作（死循环/Thread.Sleep），否则卡主线程。协程适合延迟序列、异步加载、分帧处理。",
    tags: ["协程", "多线程", "异步"],
  },
  {
    id: "usg-coroutine-event-2",
    chapter: "usg-coroutine-event",
    level: 2,
    question: "为什么事件订阅要放 OnEnable，取消要放 OnDisable？",
    answer: "因为 OnEnable/OnDisable 每次启用/禁用都触发，而 Awake/OnDestroy 只调用一次。订阅在 Awake 中则对象禁用再启用后订阅不会重新建立——事件丢失。取消在 OnDestroy 中则对象只是禁用（对象池场景）时订阅仍存在——禁用后仍响应事件。OnEnable 订阅 + OnDisable 取消，保证订阅生命周期与对象启用状态完全一致——启用时订阅，禁用时取消，不会漏接也不会多接。未取消的订阅还可能导致内存泄漏。",
    tags: ["事件", "OnEnable", "OnDisable", "内存泄漏"],
  },
  {
    id: "usg-coroutine-event-3",
    chapter: "usg-coroutine-event",
    level: 3,
    question: "用协程实现「每 2 秒生成一个敌人，持续 5 波后停止」的延迟序列。",
    answer: "```csharp\nIEnumerator SpawnWaves() {\n    for (int wave = 0; wave < 5; wave++) {\n        Instantiate(enemyPrefab, RandomPos(), Quaternion.identity);\n        yield return new WaitForSeconds(2f);\n    }\n    Debug.Log(\"5波生成完毕\");\n}\n// 启动：StartCoroutine(SpawnWaves());\n```\n用 for 循环控制 5 波，`yield return new WaitForSeconds(2f)` 在每波之间暂停 2 秒。协程自动在 GameObject 禁用或销毁时停止。如果需要中途停止，用 `StopCoroutine` 或保存返回的 Coroutine 引用。",
    tags: ["协程", "WaitForSeconds", "延迟序列"],
  },
  {
    id: "usg-coroutine-event-4",
    chapter: "usg-coroutine-event",
    level: 4,
    question: "设计一个用事件系统解耦的击杀计分系统：敌人被击杀时通知计分板加分，同时通知任务系统计数，互不依赖。",
    answer: "1)Enemy 类声明 `public static event Action<Enemy> OnEnemyKilled;`，死亡时 `OnEnemyKilled?.Invoke(this)` 触发。2)ScoreUI 在 OnEnable 中 `Enemy.OnEnemyKilled += HandleKill`，OnDisable 中 `-=`，HandleKill 内加分更新 UI。3)QuestSystem 同样订阅 `OnEnemyKilled`，在回调内做任务计数。4)Enemy 不需要知道 ScoreUI 和 QuestSystem 的存在——彻底解耦。5)新增订阅者（如成就系统）只需 `+=` 订阅，不改 Enemy 代码。这样发布者与订阅者完全解耦，符合开闭原则，可灵活扩展。",
    tags: ["事件系统", "解耦", "发布订阅", "综合"],
  },
];
