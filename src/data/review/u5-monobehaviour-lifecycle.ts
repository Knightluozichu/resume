/** 复习题库 · MonoBehaviour 生命周期（u5-monobehaviour-lifecycle）。《Unity 5 权威讲解》第4章改编。 */

import type { ReviewQuestion } from "./types";

export const u5MonobehaviourLifecycleQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "u5-mb-1",
    chapter: "u5-monobehaviour-lifecycle",
    level: 1,
    question: "什么是 MonoBehaviour？脚本为什么要继承它？",
    answer:
      "MonoBehaviour 是 Unity 里**所有「能挂到 GameObject 上当组件」的脚本都要继承的基类**。脚本只有继承了它，才会被引擎认作组件，并自动获得 `Awake`、`Start`、`Update` 等一整套**生命周期回调**。一个没继承 MonoBehaviour 的普通 C# 类，就算写了名叫 `Update` 的方法，引擎也不会去调它。",
    tags: ["MonoBehaviour", "基类", "定义"],
  },
  {
    id: "u5-mb-2",
    chapter: "u5-monobehaviour-lifecycle",
    level: 1,
    question: "什么是「生命周期（Lifecycle）」？什么是「回调（Callback）」？",
    answer:
      "**生命周期**指一个脚本组件从「被创建」到「被销毁」之间，引擎会在若干**固定时刻**主动调用它的一组方法——这些时刻连起来就是它的「一生」。**回调**指由引擎在特定时刻「反过来调用」你的方法（而不是你主动去调它），如 `Awake`、`Update`。你只管按约定的名字把方法写好，何时调、调几次由引擎决定。",
    tags: ["生命周期", "回调", "callback", "定义"],
  },
  {
    id: "u5-mb-3",
    chapter: "u5-monobehaviour-lifecycle",
    level: 1,
    question: "Awake 在什么时机被调用？它有什么特点？",
    answer:
      "`Awake` 在对象**一被创建就立刻**调用，是生命周期里**最早**的一个，且整个一生**只调一次**——即使对象当前处于禁用状态也会调。它适合做「**自己内部**」的初始化，比如缓存自身组件的引用、给自己的字段赋初值。",
    tags: ["Awake", "时机", "定义"],
  },
  {
    id: "u5-mb-4",
    chapter: "u5-monobehaviour-lifecycle",
    level: 1,
    question: "Start 在什么时机被调用？它有什么特点？",
    answer:
      "`Start` 在该脚本的**第一帧 Update 之前**调用，且**只调一次**。它的关键特点是：此刻**全场所有对象的 Awake 都已经执行完**，所以适合做「**依赖别的对象**」的初始化（去引用、读取别的对象已准备好的数据）。注意：对象若一直处于禁用状态，就一直轮不到 Start。",
    tags: ["Start", "时机", "定义"],
  },
  {
    id: "u5-mb-5",
    chapter: "u5-monobehaviour-lifecycle",
    level: 1,
    question: "Update、FixedUpdate、LateUpdate 各在什么时机调用？",
    answer:
      "①**Update**：每一**渲染帧**调用一次，频率跟着帧率走（帧率高一秒跑得多）。②**FixedUpdate**：按**固定时间步长**调用（默认 0.02s，一秒 50 次），与帧率脱钩。③**LateUpdate**：在同一帧里**所有对象的 Update 都执行完之后**才调用。同一帧内三者相对次序为 FixedUpdate（可能 0/1/多次）→ Update → LateUpdate。",
    tags: ["Update", "FixedUpdate", "LateUpdate", "时机"],
  },
  {
    id: "u5-mb-6",
    chapter: "u5-monobehaviour-lifecycle",
    level: 1,
    question: "OnEnable、OnDisable、OnDestroy 分别在什么时候触发？",
    answer:
      "`OnEnable` 在对象 / 组件**每次被启用**时调（刚创建若是启用状态也算一次），可反复发生；`OnDisable` 在**被禁用**时调（Inspector 取消勾选或代码 `enabled = false`），与 OnEnable 成对、可反复；`OnDestroy` 在对象**被销毁**（调 `Destroy` 或场景卸载）时调一次，是生命周期的最后一站。",
    tags: ["OnEnable", "OnDisable", "OnDestroy", "时机"],
  },

  // ── L2 理解：辨析 / 关系 ──
  {
    id: "u5-mb-7",
    chapter: "u5-monobehaviour-lifecycle",
    level: 2,
    question:
      "请按正确顺序写出 MonoBehaviour 的主干生命周期回调，并指出哪些只调一次、哪些反复执行。",
    answer:
      "主干顺序：**Awake → OnEnable → Start →（每帧循环：FixedUpdate → Update → LateUpdate）→ OnDisable → OnDestroy**。\n- 进场只一次：Awake（最早）、OnEnable、Start（首帧前）。\n- 每帧**反复执行**：FixedUpdate、Update、LateUpdate。\n- 退场只一次：OnDisable、OnDestroy。\n用片场比喻：进场准备一次、每帧表演反复、谢幕退场一次。",
    tags: ["顺序", "生命周期", "辨析"],
  },
  {
    id: "u5-mb-8",
    chapter: "u5-monobehaviour-lifecycle",
    level: 2,
    question: "Awake 和 Start 都在「开演前」、都只调一次，它们到底差在哪？",
    answer:
      "两个关键区别：①**先后**——Awake 比 Start 早。②**跨对象时序**——当场上有多个对象时，引擎会先把**所有对象的 Awake 全部跑完**，才回头依次跑各自的 Start。由此分工不同：Awake 此刻别的对象可能还没初始化好，只适合做「自己的」初始化；Start 此刻全场 Awake 已结束，适合做「依赖别人」的初始化（跨对象引用）。一句话：自己的事放 Awake，牵扯别人的事放 Start。",
    tags: ["Awake", "Start", "辨析", "顺序"],
  },
  {
    id: "u5-mb-9",
    chapter: "u5-monobehaviour-lifecycle",
    level: 2,
    question: "为什么 Update 的调用频率不固定，而 FixedUpdate 的固定？",
    answer:
      "`Update` 是**每渲染一帧**调一次，而帧率本身会波动（设备性能、场景复杂度都影响），所以一秒内 Update 跑的次数随帧率高低而变，不固定。`FixedUpdate` 则按**固定的时间步长**推进（默认 0.02s 一次），与「画了几帧」无关——当某帧特别慢，引擎会在这一帧里**补跑多次** FixedUpdate 来追上固定节拍；某帧特别快则可能一次都不跑。这就是「一个渲染帧里 FixedUpdate 可能跑 0/1/多次」的由来。",
    tags: ["Update", "FixedUpdate", "帧率", "辨析"],
  },
  {
    id: "u5-mb-10",
    chapter: "u5-monobehaviour-lifecycle",
    level: 2,
    question: "为什么相机跟随适合放 LateUpdate，而不是 Update？",
    answer:
      "因为 `LateUpdate` 在同一帧里**所有对象的 Update 都执行完之后**才调用。把相机跟随放这里，能保证**角色这一帧已经移动到位**，相机再去对准它，画面才稳。若放在 `Update`，由于同帧内各对象 Update 的先后不定，可能出现相机先更新、角色后更新的情况，导致相机跟随滞后或画面抖动。这就是「等别人都动完我再动」的逻辑要放 LateUpdate 的原因。",
    tags: ["LateUpdate", "相机跟随", "辨析"],
  },
  {
    id: "u5-mb-11",
    chapter: "u5-monobehaviour-lifecycle",
    level: 2,
    question:
      "OnEnable / OnDisable 与 Awake / OnDestroy 在「调用次数」上有什么本质区别？",
    answer:
      "`Awake` 和 `OnDestroy` 在一个对象的一生里**各只发生一次**（创建一次、销毁一次）。而 `OnEnable` / `OnDisable` **可以反复发生**——只要你把对象 / 组件禁用再启用，这一对就会再各调一次。所以「成对的注册 / 注销」要放在 OnEnable / OnDisable（每次启停都正确配对），而「一生只做一次的初始化 / 清理」放在 Awake / OnDestroy。",
    tags: ["OnEnable", "OnDisable", "OnDestroy", "调用次数", "辨析"],
  },
  {
    id: "u5-mb-12",
    chapter: "u5-monobehaviour-lifecycle",
    level: 2,
    question:
      "一个脚本里写了 Update 方法却没写 public，引擎还能调到它吗？为什么？",
    answer:
      "能调到。引擎调用生命周期回调靠的是**方法名约定**（通过反射 / 引擎内部机制按名字找到 `Awake`、`Update` 等），**与方法的可见性无关**——所以这些回调即使写成私有（不加 `public`）也照样被调用。因此实践中常把它们写成无修饰符（默认 private），既能被引擎调用，又避免被外部误调。",
    tags: ["回调", "可见性", "约定", "辨析"],
  },

  // ── L3 应用：用法 / 排错 ──
  {
    id: "u5-mb-13",
    chapter: "u5-monobehaviour-lifecycle",
    level: 3,
    question:
      "在 A 的 Awake 里 `GetComponent` 拿 B 身上的脚本，结果是 null 或数据是初始值。问题出在哪？怎么改？",
    answer:
      "问题在于把**跨对象的引用放在了 Awake**。Awake 阶段全场的 Awake 并非一齐完成——你引用的 B 可能**还没轮到调 Awake**、尚未初始化好，于是拿到 null 或初始值。\n修法：把这段**跨对象引用从 Awake 挪到 Start**。进 Start 时全场所有 Awake 必定都已结束，B 的组件 / 数据早已准备好，引用就安全了。Awake 只留给「自己身上」的初始化（比如缓存自身组件）。",
    tags: ["Awake", "Start", "跨对象引用", "排错"],
  },
  {
    id: "u5-mb-14",
    chapter: "u5-monobehaviour-lifecycle",
    level: 3,
    question:
      "给刚体施力的代码误写在 Update 里，物体移动忽快忽慢、帧率一掉就发飘甚至穿墙。原因与修法？",
    answer:
      "原因：`Update` 跟着帧率走、**时间步长不固定**，而物理引擎要求**恒定时间步长**才能正确积分。用变化的步长喂物理，就会出现移动速度随帧率波动、帧率掉时发飘、单帧位移过大时穿过碰撞体（穿墙）等现象。\n修法：把 `Rigidbody.AddForce`、`rb.velocity = ...` 这类**物理代码移到 FixedUpdate**（步长固定 0.02s，与帧率脱钩）。读输入仍放 Update，把输入值存起来，在 FixedUpdate 里使用。",
    tags: ["FixedUpdate", "物理", "穿墙", "排错"],
  },
  {
    id: "u5-mb-15",
    chapter: "u5-monobehaviour-lifecycle",
    level: 3,
    question:
      "一个对象在 Inspector 里初始没勾选（禁用），运行后它的 Start 一直没跑、初始化没生效。为什么？怎么办？",
    answer:
      "因为 `Start` 只在对象**首次变为启用、即将进入第一帧 Update 之前**才调；对象一直保持禁用，就一直轮不到 Start，里面的初始化自然不执行。\n办法：①若它本就该一开始工作，让它出生时就启用；②把「无论如何都要先做」的初始化放进 **Awake**——Awake 在对象创建时就调，**即使对象禁用也会调**，Start 只留给「启用后才需要」的部分；③或在代码里需要时把它 `SetActive(true)` 启用，届时才会触发它的 Start。",
    tags: ["Start", "禁用", "SetActive", "排错"],
  },
  {
    id: "u5-mb-16",
    chapter: "u5-monobehaviour-lifecycle",
    level: 3,
    question:
      "需要「在角色启用时订阅一个事件、禁用时退订」，应该把订阅 / 退订分别放在哪两个回调里？为什么不放 Awake / OnDestroy？",
    answer:
      "应放在 **OnEnable（订阅）/ OnDisable（退订）** 这一对里。因为对象可能在运行中被反复禁用、启用——OnEnable / OnDisable **每次启停都会成对触发**，能保证「启用就订阅、禁用就退订」始终配平，不会出现禁用期间还在收事件、或重复订阅的问题。若放 Awake / OnDestroy，它们一生只各调一次：对象被禁用时不会退订（仍在监听），重新启用时也不会再订阅——配对就乱了。",
    tags: ["OnEnable", "OnDisable", "事件订阅", "应用"],
  },

  // ── L4 综合：贯通 / 迁移 ──
  {
    id: "u5-mb-17",
    chapter: "u5-monobehaviour-lifecycle",
    level: 4,
    question:
      "用「数字片场」的比喻，把 MonoBehaviour、生命周期、Awake、Start、Update、FixedUpdate、LateUpdate、OnDestroy 串成一个完整的故事讲一遍。",
    answer:
      "你写的脚本得先报名成「演员」——继承 **MonoBehaviour**，导演（引擎）才认得它、才会按时刻表喊它。这套时刻表就是它的**生命周期**：演员一被叫上场（创建），先到后台做**自己的准备**（换装记词）= **Awake**，最早、只一次；接着**登台亮相** = OnEnable；正式开演前再扫一眼全场（此时别的演员都准备好了），做**牵扯别人的对词** = **Start**，只一次。开演后进入**每帧表演**：常规台词 / 走位 = **Update**（跟着「演出帧率」走，忙时跑得密）；而吊威亚、受力翻滚这类**特技（物理）**走后台**固定节拍的排练** = **FixedUpdate**（不管台上演多快，节拍恒定）；最后由跟拍的摄影机**等所有演员这帧都动完了再对准主角** = **LateUpdate**（相机跟随）。等这位演员**谢幕退场**（被销毁），做最后的收尾清场 = **OnDestroy**。整条线：进场准备一次、每帧表演反复、谢幕退场一次。",
    tags: ["综合", "数字片场", "生命周期", "贯通"],
  },
  {
    id: "u5-mb-18",
    chapter: "u5-monobehaviour-lifecycle",
    level: 4,
    question:
      "做一个「玩家用键盘控制角色物理移动、相机平滑跟随」的功能，请把读输入、施加物理力、相机跟随这三段代码分别安排到哪些回调里，并说明理由。",
    answer:
      "①**读输入 → Update**：输入要在每渲染帧及时响应、不漏帧，Update 每帧调一次最合适；在这里读取按键 / 摇杆，把「这一帧玩家想往哪走」存到一个字段里。②**施加物理力 → FixedUpdate**：移动靠刚体受力 / 设速度属于物理，必须放固定步长的 FixedUpdate，才不会因帧率波动而发飘、穿墙；它从上一步存好的字段里取输入来用。③**相机跟随 → LateUpdate**：相机要在角色这一帧已经移动到位之后再去对准它，放 LateUpdate（所有 Update 跑完才调）能避免相机先于角色更新导致的抖动。\n关键链条：Update 收集意图 → FixedUpdate 执行物理 → LateUpdate 让相机收尾。这样既保证输入灵敏，又保证物理稳定、画面不抖。",
    tags: ["综合", "Update", "FixedUpdate", "LateUpdate", "迁移", "应用"],
  },
];
