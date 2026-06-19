/** 复习题库 · 协程与时间（u5-coroutines-time）。《Unity 5 权威讲解》第6章改编。 */

import type { ReviewQuestion } from "./types";

export const u5CoroutinesTimeQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "u5-ct-1",
    chapter: "u5-coroutines-time",
    level: 1,
    question: "什么是协程（Coroutine）？它和普通函数最大的不同是什么？",
    answer:
      "**协程**是一个能「**中途暂停、之后从断点那一行继续**」的特殊函数。普通函数一旦进去就一口气跑到底；协程却能在 `yield return` 处**就地暂停**、把控制权交还引擎，到点了再从停下处接着走。用它把一件事**分散到多帧**做、或把一串动作**按时间排开**，既不阻塞主线程，也不用在 `Update` 里手搓计时器。它在 Unity 里靠「返回 `IEnumerator` + 函数体里 `yield return`」实现。",
    tags: ["协程", "Coroutine", "定义"],
  },
  {
    id: "u5-ct-2",
    chapter: "u5-coroutines-time",
    level: 1,
    question:
      "在 Unity 里写一个协程，函数的返回类型是什么？怎么启动它、怎么停？",
    answer:
      "协程函数的返回类型必须是 **`IEnumerator`**（来自 `System.Collections`），且函数体里至少有一个 `yield`。**启动**用 `StartCoroutine(Foo())`（要先调用 `Foo()` 拿到 `IEnumerator` 再传进去）。**停止**用 `StopCoroutine`（停某一个）或 `StopAllCoroutines`（停本脚本所有协程）。",
    tags: ["IEnumerator", "StartCoroutine", "StopCoroutine", "定义"],
  },
  {
    id: "u5-ct-3",
    chapter: "u5-coroutines-time",
    level: 1,
    question:
      "`yield return null` 和 `yield return new WaitForSeconds(t)` 各表示等多久？",
    answer:
      "`yield return null` 表示**挂起到「下一帧」**——下一帧的 Update 阶段再从下一行继续，是逐帧推进最常用的写法。`yield return new WaitForSeconds(t)` 表示**等约 t 秒**（≈ 若干帧）后再继续；注意它用的是「游戏时间」，会被 `Time.timeScale` 缩放。",
    tags: ["yield return", "null", "WaitForSeconds", "定义"],
  },
  {
    id: "u5-ct-4",
    chapter: "u5-coroutines-time",
    level: 1,
    question: "`Time.deltaTime` 是什么？为什么每帧移动 / 计时常要乘它？",
    answer:
      "`Time.deltaTime` 是「**上一帧到这一帧的间隔秒数**」。在每帧逻辑里把移动 / 旋转 / 计时的量乘上它，结果就**与帧率无关**——高帧率每帧动得少、低帧率每帧动得多，叠起来一样快，不同设备表现一致。它本身**受 `Time.timeScale` 缩放**（暂停时为 0）。",
    tags: ["Time.deltaTime", "帧率", "定义"],
  },
  {
    id: "u5-ct-5",
    chapter: "u5-coroutines-time",
    level: 1,
    question: "`Time.timeScale` 是干什么的？设成 1 / 0.5 / 0 分别是什么效果？",
    answer:
      "`Time.timeScale` 是「**游戏世界的时间倍率**」：`1` = 正常速度、`0.5` = 慢动作、`0` = **整个游戏暂停**（物理、动画、`WaitForSeconds` 全冻住）。它会缩放 `Time.deltaTime` 和 `WaitForSeconds` 这类「游戏时间」，但不影响带 `Realtime` / `unscaled` 的那些。",
    tags: ["Time.timeScale", "暂停", "慢动作", "定义"],
  },
  {
    id: "u5-ct-6",
    chapter: "u5-coroutines-time",
    level: 1,
    question: "`yield return StartCoroutine(其它协程())` 这种写法表示什么？",
    answer:
      "这是**嵌套协程**：它让当前协程「**等另一个协程整段跑完**」再继续。比如 `yield return StartCoroutine(FadeIn())` 会挂起当前协程，直到 `FadeIn` 这个子协程彻底结束，才往下走。用它能把「淡入 → 台词 → 淡出」这类动作顺序地排成一条时间线。",
    tags: ["嵌套协程", "StartCoroutine", "yield return", "定义"],
  },

  // ── L2 理解：辨析 / 关系 ──
  {
    id: "u5-ct-7",
    chapter: "u5-coroutines-time",
    level: 2,
    question:
      "协程是「新开一条线程并行跑」吗？两个 yield 之间的代码在什么时机执行？",
    answer:
      "**不是。** 协程**不是线程**——它仍在**主线程**上逐帧推进，只是能在 `yield` 处暂停、让出当前帧。两个 `yield` 之间的代码是在**同一帧内一口气跑完**的，不会真正并行。所以如果你在两个 yield 之间塞一个超耗时的死循环，整个游戏照样会卡住——那不是协程能解决的，需要 `Thread` / `Job` 系统。",
    tags: ["协程", "线程", "主线程", "辨析"],
  },
  {
    id: "u5-ct-8",
    chapter: "u5-coroutines-time",
    level: 2,
    question:
      "`WaitForSeconds` 和 `WaitForSecondsRealtime` 有什么区别？什么时候必须用后者？",
    answer:
      "区别在「用哪种时间」：`WaitForSeconds` 走「**游戏时间**」，会被 `Time.timeScale` 缩放；`WaitForSecondsRealtime` 走「**真实墙上时间**」，**不受 `timeScale` 影响**。\n当游戏被暂停（`timeScale = 0`）时还需要计时 / 倒计时（如暂停菜单里的「3 秒后隐藏提示」），就**必须用 `WaitForSecondsRealtime`**——否则 `WaitForSeconds` 会跟着游戏一起冻住、永远等不到。",
    tags: ["WaitForSeconds", "WaitForSecondsRealtime", "timeScale", "辨析"],
  },
  {
    id: "u5-ct-9",
    chapter: "u5-coroutines-time",
    level: 2,
    question: "用协程替代「在 Update 里手搓计时器」，好在哪？",
    answer:
      "做「等一会儿再做某事 / 把一串动作按时间排开」时，手搓计时器要养计时器字段、每帧累加、判一堆状态，又啰嗦又容易漏。协程把「等多久、做什么」**顺着写下来**——`yield return new WaitForSeconds(t)` 一句就表达了「等 t 秒」，没有计时器字段、没有 `Update` 里的状态判断，读起来就是流程本身，引擎替你管「什么时候接着跑」。",
    tags: ["协程", "Update", "计时器", "辨析"],
  },
  {
    id: "u5-ct-10",
    chapter: "u5-coroutines-time",
    level: 2,
    question: "停协程有「按引用」和「按名字」两种方式，它们能交叉用吗？",
    answer:
      '**不能交叉。怎么启动就得怎么停。** ①按引用：`running = StartCoroutine(Loop());`（存下返回的 `Coroutine` 句柄）配 `StopCoroutine(running);`——最稳，推荐。②按名字：`StartCoroutine("Loop")` 配 `StopCoroutine("Loop")`。若用引用启动却用字符串名去停（或反过来），是**停不掉**的。另外按字符串名只能启动无参或单参数的协程。',
    tags: ["StopCoroutine", "引用", "字符串", "辨析"],
  },
  {
    id: "u5-ct-11",
    chapter: "u5-coroutines-time",
    level: 2,
    question:
      "`Time.deltaTime` 和 `Time.unscaledDeltaTime`、`Time.time` 与 `Time.fixedDeltaTime` 分别是什么、受不受 timeScale 影响？",
    answer:
      "`Time.deltaTime`：上一帧间隔秒数，**受 timeScale 缩放**（暂停为 0）。`Time.unscaledDeltaTime`：上一帧间隔秒数，**不受 timeScale**（暂停时仍前进）。`Time.time`：游戏开局至今的秒数。`Time.fixedDeltaTime`：FixedUpdate 的固定步长（默认 0.02s）。**规律：带 `unscaled` / `Realtime` 的不受 timeScale 影响，其余的都受。**",
    tags: ["Time", "deltaTime", "unscaledDeltaTime", "辨析"],
  },
  {
    id: "u5-ct-12",
    chapter: "u5-coroutines-time",
    level: 2,
    question:
      "`WaitForFixedUpdate` 和 `WaitForEndOfFrame` 各自等到什么时机恢复？",
    answer:
      "`WaitForFixedUpdate`：挂起到**下一次「固定步长」FixedUpdate**——和物理引擎的节拍对齐，适合和物理同步的协程逻辑。`WaitForEndOfFrame`：挂起到**本帧渲染完、画面提交前**——仍属于**当前帧**的最末尾，常用于「等画面画好后再截屏」这类需求。",
    tags: ["WaitForFixedUpdate", "WaitForEndOfFrame", "yield return", "辨析"],
  },

  // ── L3 应用：用法 / 排错 ──
  {
    id: "u5-ct-13",
    chapter: "u5-coroutines-time",
    level: 3,
    question:
      "暂停菜单里 `Time.timeScale = 0` 后，一个 `yield return new WaitForSeconds(3f)` 的协程再也不往下走。为什么？怎么改？",
    answer:
      "原因：`WaitForSeconds` 走「游戏时间」，`timeScale = 0` 时游戏时间停止前进，那 3 秒的倒计时**永远到不了点**，协程卡死在那一行。\n修法：把 `WaitForSeconds` 换成 **`WaitForSecondsRealtime`**——它走真实墙上时间，不受 `timeScale` 影响，暂停下照样计时。凡是暂停界面里还要计时 / 倒计时的协程，一律用 Realtime。",
    tags: ["WaitForSeconds", "timeScale", "WaitForSecondsRealtime", "排错"],
  },
  {
    id: "u5-ct-14",
    chapter: "u5-coroutines-time",
    level: 3,
    question:
      "一个协程跑到一半「凭空停了」，后半段日志再没出现。最可能的原因和排查方向？",
    answer:
      "最可能的原因：协程**绑在启动它的那个 GameObject / 脚本组件上**——当这个对象被**销毁（Destroy）或整个 GameObject 被禁用（SetActive(false)）**时，它身上正在跑的协程会**被一起停掉**。\n排查 / 修法：检查启动这个协程的对象在那段时间是否被销毁或失活；需要跨对象、长时间存活的计时逻辑，应挂到一个**不会被销毁 / 失活**的管理者对象上，别挂在朝生暮死的临时对象（如子弹、特效）上。",
    tags: ["协程", "Destroy", "SetActive", "排错"],
  },
  {
    id: "u5-ct-15",
    chapter: "u5-coroutines-time",
    level: 3,
    question:
      "想做「每隔 1 秒打印一次倒计时 3 → 2 → 1 → GO」，请写出协程的核心结构。",
    answer:
      '用一个循环 + 每次循环末尾 `yield return new WaitForSeconds(1f)`：\n```csharp\nIEnumerator Run()\n{\n    for (int n = 3; n >= 1; n--)\n    {\n        Debug.Log(n);\n        yield return new WaitForSeconds(1f);\n    }\n    Debug.Log("GO");\n}\n```\n要点：①`for` 循环打印 `3 2 1`，每次末尾等 1 秒，把这「分了时间的一串动作」顺着写下来，不用 `Update` 攒计时器；②循环结束后再 `Debug.Log("GO")`，函数体跑完协程自然结束；③用 `StartCoroutine(Run())` 启动。（若希望暂停下也走，把 `WaitForSeconds` 换成 `WaitForSecondsRealtime`。）',
    tags: ["协程", "WaitForSeconds", "倒计时", "应用"],
  },
  {
    id: "u5-ct-16",
    chapter: "u5-coroutines-time",
    level: 3,
    question:
      "把一段超耗时的计算（一帧内 while 算几百万次）放进协程，游戏照样卡死。协程没起到「不卡」的作用，为什么？怎么办？",
    answer:
      "原因：协程**不是线程**，仍在主线程逐帧推进；两个 `yield` 之间的代码是在**同一帧内一口气跑完**的。你把死循环整个塞在两个 yield 之间，它就在这一帧里全跑完，主线程被占住，自然卡死。\n办法：把重活**用 `yield` 切成多帧**——每处理一小批就 `yield return null` 让出这一帧，下一帧再接着处理下一批，从而把耗时摊到很多帧、不卡画面。若是纯后台计算（不碰 Unity API），才考虑 `Thread` / `Job` 系统真正并行。",
    tags: ["协程", "线程", "yield", "性能", "排错"],
  },

  // ── L4 综合：贯通 / 迁移 ──
  {
    id: "u5-ct-17",
    chapter: "u5-coroutines-time",
    level: 4,
    question:
      "做一个「按 P 暂停游戏，暂停时屏幕上的提示 3 秒后自动淡出，再按 P 恢复」的功能，请说出会用到协程 / Time 的哪些点、各为什么这么选。",
    answer:
      "①**暂停 / 恢复**：按 P 时 `Time.timeScale = 0`（暂停整个游戏：物理、动画都冻住），再按 P 时 `Time.timeScale = 1` 恢复。读输入 `Input.GetKeyDown(KeyCode.P)` 放 `Update`。\n②**3 秒后自动淡出提示**：用协程 `StartCoroutine(HideTipAfter(3f))`，里面 `yield return new WaitForSecondsRealtime(3f)` 再隐藏——**必须用 Realtime**，因为此刻 `timeScale = 0`，用 `WaitForSeconds` 会跟着冻住、永远不淡出。\n③**淡出动画本身**：在一个循环里逐帧降低 alpha，每帧 `yield return null` 推进；若想暂停下也能动，alpha 步进要用 `Time.unscaledDeltaTime`（不受 timeScale），否则 timeScale=0 时 `deltaTime` 为 0、淡出停滞。\n④**可中断**：把协程句柄 `tipCo = StartCoroutine(...)` 存下来，玩家若提前关掉提示就 `StopCoroutine(tipCo)`（按引用启、按引用停）。\n串起来：Update 收 P 键切 timeScale → 暂停态下用 Realtime 计时、用 unscaledDeltaTime 推进淡出 → 句柄按引用停以支持中断。核心是「暂停下的时间逻辑认准不受 timeScale 影响的 Realtime / unscaled」。",
    tags: [
      "综合",
      "timeScale",
      "WaitForSecondsRealtime",
      "unscaledDeltaTime",
      "StopCoroutine",
      "迁移",
    ],
  },
];
