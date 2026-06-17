/** 复习题库 · 碰撞触发事件与射线检测（u5-collision-raycast）。《Unity 5 权威讲解》第8章改编。 */

import type { ReviewQuestion } from "./types";

export const u5CollisionRaycastQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "u5-cr-1",
    chapter: "u5-collision-raycast",
    level: 1,
    question:
      "实心碰撞的三个事件回调 `OnCollisionEnter` / `Stay` / `Exit` 各在什么时机被调用？",
    answer:
      "两个**实心**碰撞器（都没勾 isTrigger）撞上时，引擎自动按名字调用它们：`OnCollisionEnter` 在**撞上的那一刻**调一次、`OnCollisionStay` 在两者**持续接触**期间每个物理帧都调、`OnCollisionExit` 在**分开的那一刻**调一次。你只要在脚本里把这些方法写出来即可。",
    tags: ["OnCollisionEnter", "OnCollisionStay", "OnCollisionExit", "定义"],
  },
  {
    id: "u5-cr-2",
    chapter: "u5-collision-raycast",
    level: 1,
    question:
      "`OnCollisionEnter(Collision c)` 的参数 `Collision c` 能拿到哪些信息？",
    answer:
      "`Collision c` 是这次碰撞的「档案」：`c.gameObject`（撞到了**谁**）、`c.relativeVelocity`（撞击**相对速度**，常拿来算撞击伤害）、`c.contacts`（**接触点**数组，要在撞击处冒火花就用它们的位置）。触发回调没有这些，因为没有真实碰撞。",
    tags: ["Collision", "relativeVelocity", "contacts", "定义"],
  },
  {
    id: "u5-cr-3",
    chapter: "u5-collision-raycast",
    level: 1,
    question:
      "触发器的三个回调 `OnTriggerEnter` / `Stay` / `Exit` 的参数是什么？什么时候被调用？",
    answer:
      "勾了 `isTrigger` 的碰撞器被穿过时，引擎调用它们，参数是 **`Collider other`**——穿过来的那个碰撞器（注意不是 `Collision`，因为没有真实撞击）。`OnTriggerEnter`：有东西**穿入**的那一刻调一次；`OnTriggerStay`：**停留**在范围内每个物理帧都调；`OnTriggerExit`：**穿出**的那一刻调一次。",
    tags: [
      "OnTriggerEnter",
      "OnTriggerStay",
      "OnTriggerExit",
      "Collider",
      "定义",
    ],
  },
  {
    id: "u5-cr-4",
    chapter: "u5-collision-raycast",
    level: 1,
    question: "`Physics.Raycast(...)` 是做什么的？它的几个参数分别是什么？",
    answer:
      "`Physics.Raycast` 从一个起点沿一个方向射一条**看不见的线**，检测命中的**第一个**碰撞体——像拿激光笔往前一指看打中谁。常见签名 `Physics.Raycast(origin, direction, out RaycastHit hit, maxDistance, layerMask)`：`origin` 起点、`direction` 方向、`out hit` 装命中信息、`maxDistance` 最大距离、`layerMask` 过滤只检测哪些层。命中返回 `true`。",
    tags: ["Physics.Raycast", "射线检测", "定义"],
  },
  {
    id: "u5-cr-5",
    chapter: "u5-collision-raycast",
    level: 1,
    question: "命中后，`RaycastHit hit` 里能读到哪些信息？",
    answer:
      "`hit.point`（命中点的**世界坐标**）、`hit.normal`（命中面的**法线方向**，做贴墙 / 斜坡对齐用）、`hit.distance`（起点到命中点的**距离**）、`hit.collider` / `hit.transform`（命中的那个**对象**）。一句话：射线打中后「打中哪儿、那个面朝哪、多远、打中了谁」全在这里读。",
    tags: ["RaycastHit", "point", "normal", "distance", "定义"],
  },
  {
    id: "u5-cr-6",
    chapter: "u5-collision-raycast",
    level: 1,
    question: "`LayerMask` 是干什么的？为什么 Raycast 常要传它？",
    answer:
      '`LayerMask` 是一个用「位」表示「**要检测哪些层**」的过滤器。Unity 每个对象可分到 32 个 Layer 之一；给 Raycast 传一个 LayerMask，射线就**只检测选中的层、忽略其余**（常写 `LayerMask.GetMask("Enemy")` 或 Inspector 勾选）。要传它，是为了**避免射线命中自己、命中不该命中的层**——不传则默认检测所有层、范围太大。',
    tags: ["LayerMask", "层过滤", "定义"],
  },
  {
    id: "u5-cr-7",
    chapter: "u5-collision-raycast",
    level: 1,
    question: "怎么实现「鼠标点选场景中的物体」？用到哪个方法？",
    answer:
      "用 `Camera.main.ScreenPointToRay(Input.mousePosition)` 把屏幕上的鼠标点转成一条**从摄像机射向场景的射线**，再传给 `Physics.Raycast(ray, out hit, maxDistance)`，命中返回的 `hit.collider`（或 `hit.transform`）就是点中的物体。这是「屏幕坐标 → 世界射线 → 命中检测」的标准三步。",
    tags: ["ScreenPointToRay", "鼠标点选", "Camera", "定义"],
  },
  {
    id: "u5-cr-8",
    chapter: "u5-collision-raycast",
    level: 1,
    question: "`Debug.DrawRay` 有什么用？它会影响游戏运行吗？",
    answer:
      "`Debug.DrawRay(origin, direction, color, duration)` 在**编辑器的 Scene 视图**里画出一条射线，纯**调试用**，不影响游戏运行、不参与任何物理。它是排查「射线到底射到哪了 / 朝哪个方向 / 多长」的利器——比如 Raycast 漏检时，先用它把射线画出来肉眼看一眼是否对准了目标。",
    tags: ["Debug.DrawRay", "调试", "定义"],
  },

  // ── L2 理解：辨析 / 关系 ──
  {
    id: "u5-cr-9",
    chapter: "u5-collision-raycast",
    level: 2,
    question:
      "`OnCollision*` 和 `OnTrigger*` 两套回调，什么时候走哪一套？参数有何不同？",
    answer:
      "**看 isTrigger**：参与的两个碰撞器**都没勾** `isTrigger` → 走 `OnCollision*`（实心碰撞，会物理阻挡），参数是 **`Collision c`**（含撞到谁 / 相对速度 / 接触点）。**任一勾了** `isTrigger` → 走 `OnTrigger*`（只感应、不阻挡），参数是 **`Collider other`**（穿过来的碰撞器，没有撞击速度可拿）。写反了那一套就永远不被调用。",
    tags: ["OnCollision", "OnTrigger", "isTrigger", "辨析"],
  },
  {
    id: "u5-cr-10",
    chapter: "u5-collision-raycast",
    level: 2,
    question:
      "碰撞 / 触发事件要真正触发，需要同时满足哪几个条件？两个静态碰撞器会怎样？",
    answer:
      "三个必备条件：①两个对象**都有 Collider**；②这俩里**至少一个有 Rigidbody**（动态或运动学都行）；③谁勾了 isTrigger 决定走哪套回调（任一勾了走 `OnTrigger*`，都没勾走 `OnCollision*`）。**两个都是静态碰撞器**（都没 Rigidbody）时，引擎**根本不为它俩做碰撞计算**——啥事件都不触发。",
    tags: ["触发条件", "Rigidbody", "Collider", "静态碰撞器", "辨析"],
  },
  {
    id: "u5-cr-11",
    chapter: "u5-collision-raycast",
    level: 2,
    question:
      '在触发回调里区分「进来的是谁」，为什么推荐 `other.CompareTag("Player")` 而不是 `other.tag == "Player"`？',
    answer:
      '`other.tag == "Player"` 比较字符串会产生**字符串内存分配**——在每帧可能多次触发的回调里，是垃圾回收（GC）的常见来源，造成卡顿。`CompareTag` 是引擎优化过的**整数比较**，又快又不产生垃圾；而且标签名拼错时它会在编辑器报「未定义标签」，比 `==` 静默失败更易排错。所以一律用 `CompareTag`。',
    tags: ["CompareTag", "tag", "GC", "辨析"],
  },
  {
    id: "u5-cr-12",
    chapter: "u5-collision-raycast",
    level: 2,
    question:
      "`Physics.Raycast`、`Physics.RaycastAll`、`Physics.Linecast` 有何区别？",
    answer:
      "`Raycast`：从一点沿一方向射线，命中**第一个**碰撞体就返回（最常用，如射击、着地检测）。`RaycastAll`：返回沿途**所有**命中的碰撞体（一个 `RaycastHit[]`），用于穿透型武器、激光穿过多层。`Linecast(a, b)`：检测**两点之间**有没有遮挡（如判断「敌人能不能看见玩家」的视线检测），本质是定起点和终点的射线。",
    tags: ["Raycast", "RaycastAll", "Linecast", "辨析"],
  },
  {
    id: "u5-cr-13",
    chapter: "u5-collision-raycast",
    level: 2,
    question:
      "做「踩到尖刺持续掉血」和「捡到金币」，分别该用 Enter / Stay / Exit 里的哪个？为什么？",
    answer:
      "**捡金币**：用 `OnTriggerEnter`（或 `OnCollisionEnter`）——碰到的那**一刻**响应一次就够，捡完销毁金币。**踩尖刺持续掉血**：用 `OnTriggerStay`（或 `OnCollisionStay`）——它在**持续接触/停留期间每个物理帧都调**，正好用来「待在上面就一直扣血」（配 `Time.fixedDeltaTime` 控制掉血速率）。要点：一次性事件用 Enter、持续效果用 Stay、离开收尾用 Exit。",
    tags: ["OnTriggerStay", "Enter", "Stay", "应用辨析"],
  },

  // ── L3 应用：用法 / 排错 ──
  {
    id: "u5-cr-14",
    chapter: "u5-collision-raycast",
    level: 3,
    question:
      "写了 `OnTriggerEnter`，玩家走进区域却一点反应都没有。列出最可能的原因和修法。",
    answer:
      "三种最常见的漏法：①感应区的碰撞器**没勾 `isTrigger`**（没勾走的是 `OnCollision*`，不是 `OnTrigger*`）；②**两个对象都没有 Rigidbody**（引擎不为两个静态碰撞器算碰撞）；③某一方**漏挂了 Collider**。\n修法：把感应区 Collider 的 **Is Trigger 勾上**、给该动的一方（玩家）**加 Rigidbody**、两边都挂上 **Collider**——三者缺一不可。再核对方法名 / 参数：应是 `OnTriggerEnter(Collider other)`（`Collider` 不是 `Collision`），引擎按名字反射调用、拼错静默失败。",
    tags: ["OnTriggerEnter", "排错", "isTrigger", "Rigidbody"],
  },
  {
    id: "u5-cr-15",
    chapter: "u5-collision-raycast",
    level: 3,
    question:
      "从角色身上发射的射线，第一个命中的竟然是自己，或前方有目标却漏检。为什么？怎么改？",
    answer:
      "原因：①起点在角色自己的碰撞体**内部**，射线一出生就命中了自身的 collider；②**没传 layerMask**，命中了不该命中的层（含自己所在的层）。\n修法：把起点**抬离自身碰撞体**（如 `transform.position + transform.forward * 0.5f` 或 `+ Vector3.up * 0.1f`），并传一个 `layerMask` **排除自己所在的层**、只检测目标层；必要时给本对象单独分一个层以便过滤。",
    tags: ["Raycast", "命中自己", "layerMask", "起点偏移", "排错"],
  },
  {
    id: "u5-cr-16",
    chapter: "u5-collision-raycast",
    level: 3,
    question:
      "两个实心物体撞上了，写在 `OnTriggerEnter` 里的逻辑却永远不执行；或方法名写成 `OnColisionEnter`。问题出在哪？怎么修？",
    answer:
      "两个问题，都会**静默失败**：①**实心碰撞只走 `OnCollision*`、触发器才走 `OnTrigger*`**——实心物体撞上写在 `OnTriggerEnter` 里当然不进；②Unity 是**按方法名反射调用**这些回调的，名字拼错（`OnColisionEnter` 少个 i）引擎找不到、也不报错。\n修法：实心碰撞写 `OnCollisionEnter(Collision c)`、触发器写 `OnTriggerEnter(Collider other)`，**别写反**；逐字母核对方法名，参数类型 `Collision` / `Collider` 也别混。",
    tags: ["OnCollisionEnter", "回调名拼错", "静默失败", "排错"],
  },
  {
    id: "u5-cr-17",
    chapter: "u5-collision-raycast",
    level: 3,
    question:
      "要给一个挂了 Rigidbody 的球做「脚下 0.2m 内有没有地面（是否着地）」的判断，怎么用 Raycast 实现？",
    answer:
      "从球的位置沿 `Vector3.down` 射一条短射线，只检测「地面层」：\n```csharp\npublic LayerMask groundMask;\nbool IsGrounded()\n{\n    return Physics.Raycast(transform.position, Vector3.down, 0.2f, groundMask);\n}\n```\n要点：①方向 `Vector3.down`、`maxDistance` 给 `0.2f` 表示「脚下 0.2m 内」；②传 `groundMask` **只把地面层算作地面**，避免小石子、自己等被误判；③若起点埋在球碰撞体里，可把起点抬到球底略外侧。返回 `true` 即着地。",
    tags: ["Raycast", "着地检测", "groundMask", "应用"],
  },
  {
    id: "u5-cr-18",
    chapter: "u5-collision-raycast",
    level: 3,
    question:
      "做一个「鼠标左键点中场景里的敌人就打印它的名字」的功能，请写出关键代码并说明放在哪个回调。",
    answer:
      '读输入放 `Update`，用摄像机把屏幕点转成射线再 Raycast：\n```csharp\nvoid Update()\n{\n    if (Input.GetMouseButtonDown(0))\n    {\n        Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);\n        if (Physics.Raycast(ray, out RaycastHit hit, 100f, enemyMask))\n            Debug.Log($"点中了 {hit.collider.name}");\n    }\n}\n```\n要点：①`ScreenPointToRay` 把鼠标屏幕坐标变成世界射线；②`Physics.Raycast(ray, out hit, 100f, enemyMask)` 命中敌人层就返回，`hit.collider.name` 即点中对象名；③传 `enemyMask` 只点中敌人、避免点到地面 / UI。',
    tags: ["ScreenPointToRay", "鼠标点选", "Raycast", "应用"],
  },

  // ── L4 综合：贯通 / 迁移 ──
  {
    id: "u5-cr-19",
    chapter: "u5-collision-raycast",
    level: 4,
    question:
      "做一个「玩家走进传送门（感应区）就传送，且只在脚踏到地面时才能跳」的功能：传送门用碰撞事件还是触发事件？着地判断用什么？各自需要哪些组件 / 条件，为什么这么选？",
    answer:
      '①**传送门**：用**触发事件**（`OnTriggerEnter`）——传送门应该「能穿过、只感应」，把它的 Collider **勾上 isTrigger**，在 `OnTriggerEnter(Collider other)` 里 `if (other.CompareTag("Player"))` 执行传送。必备条件：传送门挂 Collider 且勾 isTrigger、玩家有 Collider + Tag=Player + **Rigidbody**（满足「至少一个有 Rigidbody」），否则回调不触发。用触发而非碰撞，是因为不想物理阻挡玩家、只想感应到「进来了」。\n②**着地判断**：用**射线检测**（`Physics.Raycast`）——从玩家脚下沿 `Vector3.down` 射一条短射线（如 0.2m），传 `groundMask` 只检测地面层，命中即着地、才允许跳。用 Raycast 而非碰撞事件，是因为「脚下有没有地面」是一个**主动的瞬时查询**，比维护 `OnCollisionStay` 标记更简单可靠。\n③要点对比：传送门是「**被动等通知**」（撞 / 穿就回调）→ 用事件；着地是「**主动去问**」（这一刻脚下有没有地面）→ 用射线。再叠上一章的规则：玩家是动态体（Rigidbody）、地面是静态体、传送门是带 isTrigger 的静态碰撞器，靠玩家身上的 Rigidbody 让事件得以触发。',
    tags: [
      "综合",
      "OnTriggerEnter",
      "Raycast",
      "着地检测",
      "CompareTag",
      "layerMask",
      "迁移",
    ],
  },
];
