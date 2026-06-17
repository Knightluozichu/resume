/** 复习题库 · 脚本控制对象与组件（u5-scripting-objects）。《Unity 5 权威讲解》第5章改编。 */

import type { ReviewQuestion } from "./types";

export const u5ScriptingObjectsQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "u5-so-1",
    chapter: "u5-scripting-objects",
    level: 1,
    question: "GetComponent<T>() 是干什么的？取不到时返回什么？",
    answer:
      "`GetComponent<T>()` 在「**同一个 GameObject**」上按类型 `T` 查找已挂着的组件，找到就返回那个组件的**引用**（于是你能调它的方法、读写它的属性）。**取不到（这个对象没挂这个类型的组件）时返回 `null`**——所以拿到结果习惯先判空再用。想连子物体一起找用 `GetComponentInChildren`，向上找父物体用 `GetComponentInParent`。",
    tags: ["GetComponent", "组件", "定义"],
  },
  {
    id: "u5-so-2",
    chapter: "u5-scripting-objects",
    level: 1,
    question: "Instantiate 和 Destroy 各做什么？",
    answer:
      "`Instantiate` 按一个「模板」（通常是**预制体 Prefab**）在运行时**复制出一个新对象实例**放进场景，并返回这个新实例的引用；常用重载是 `Instantiate(模板, 位置, 旋转)`。`Destroy` 则**销毁**一个 GameObject（连同它所有组件）或某个单独组件，让它从场景里消失。`Destroy(obj, 秒数)` 可以延迟销毁。",
    tags: ["Instantiate", "Destroy", "定义"],
  },
  {
    id: "u5-so-3",
    chapter: "u5-scripting-objects",
    level: 1,
    question: "什么是预制体（Prefab）？它和 Instantiate 是什么关系？",
    answer:
      "**预制体（Prefab）** 是把一个配好组件和参数的 GameObject 存成的**可复用模板**资源。它和 `Instantiate` 的关系是：预制体充当 `Instantiate` 的「**复制源**」——运行时用 `Instantiate(prefab, ...)` 照它复制出任意多个实例（子弹、敌人、特效等）。",
    tags: ["预制体", "Prefab", "Instantiate", "定义"],
  },
  {
    id: "u5-so-4",
    chapter: "u5-scripting-objects",
    level: 1,
    question: "[SerializeField] 这个特性是干什么用的？",
    answer:
      "`[SerializeField]` 加在**私有字段**上，作用是让这个私有字段也**显示到 Inspector 面板**上，从而能在编辑器里**拖拽赋值**。这是「拖引用」的前提：你可以把场景里的对象直接拖进那个槽，运行前就把字段赋好。写成 `public` 也会出现在 Inspector，但会破坏封装，所以推荐 `[SerializeField] private`。",
    tags: ["SerializeField", "Inspector", "定义"],
  },
  {
    id: "u5-so-5",
    chapter: "u5-scripting-objects",
    level: 1,
    question:
      "查找对象的 GameObject.Find / FindWithTag / FindObjectOfType 各按什么来找？",
    answer:
      '`GameObject.Find("名字")` 按对象的**名字**搜；`GameObject.FindWithTag("标签")` 按**标签（Tag）**搜——标签是给对象贴的分类字符串（如 Player、Enemy）；`Object.FindObjectOfType<T>()` 按**类型**在场景里找第一个该类型的对象。三者都要在运行时**遍历搜索**，较慢。',
    tags: ["GameObject.Find", "FindWithTag", "标签", "定义"],
  },
  {
    id: "u5-so-6",
    chapter: "u5-scripting-objects",
    level: 1,
    question:
      "在 MonoBehaviour 里想操作自身的位置 / 旋转，写什么？需要先 GetComponent 吗？",
    answer:
      "**不需要先 GetComponent**——`MonoBehaviour` 里直接写 `transform` 就指向自身的 Transform 组件。移动用 `transform.Translate(...)`，旋转用 `transform.Rotate(...)`；也可以直接读写 `transform.position`（世界坐标）和 `transform.rotation`（朝向）来「瞬移 / 瞬转」。",
    tags: ["transform", "Translate", "Rotate", "用法"],
  },

  // ── L2 理解：辨析 / 关系 ──
  {
    id: "u5-so-7",
    chapter: "u5-scripting-objects",
    level: 2,
    question:
      "Destroy 是「立即」销毁对象吗？调用 Destroy(go) 后紧接着的下一句、以及下一帧，go 还能访问吗？",
    answer:
      "`Destroy` **不是立即生效**——它只「预约」在**本帧结束**时才真正销毁。所以：①**同一帧紧接着的下一句**：`go` 还活着、**仍能访问**（但你应当把它视作已失效，别再依赖它）；②**下一帧起**：`go` 已被真正销毁，再访问会拿到一个「已销毁」的空壳，对它取属性 / 调方法会报错。",
    tags: ["Destroy", "延迟销毁", "辨析"],
  },
  {
    id: "u5-so-8",
    chapter: "u5-scripting-objects",
    level: 2,
    question:
      "为什么 transform.Translate 移动时要乘 Time.deltaTime？不乘会怎样？",
    answer:
      "`Time.deltaTime` 是「上一帧到这一帧的间隔秒数」。乘上它，每帧的位移就 = 速度 × 这一帧用了多少时间，于是总速度**与帧率无关**（高帧率每帧动得少、低帧率每帧动得多，叠起来一样快）。**不乘**的话，移动量就变成「每帧固定走 N」，帧率高的设备一秒帧数多、跑得飞快，帧率低的跑得慢——同一段代码在不同设备上速度不一致。",
    tags: ["Time.deltaTime", "transform", "帧率", "辨析"],
  },
  {
    id: "u5-so-9",
    chapter: "u5-scripting-objects",
    level: 2,
    question:
      "Destroy(gameObject) 和 Destroy(GetComponent<Rigidbody>()) 有什么区别？",
    answer:
      "`Destroy(gameObject)` 销毁的是「**整个对象**」——连同它身上挂着的所有组件一起从场景消失。`Destroy(GetComponent<Rigidbody>())`（或 `Destroy(this)`）销毁的只是「**某一个组件**」，对象本身和其它组件都还在。想让对象整个消失就传 `gameObject`；只想拆掉某个能力（如不再受物理）就传那个组件。",
    tags: ["Destroy", "组件", "GameObject", "辨析"],
  },
  {
    id: "u5-so-10",
    chapter: "u5-scripting-objects",
    level: 2,
    question:
      "GetComponent、GetComponentInChildren、GetComponentInParent 三者找的范围有什么不同？",
    answer:
      "①`GetComponent<T>()`：只在「**自己这个 GameObject**」上找。②`GetComponentInChildren<T>()`：在「**自己 + 所有子物体**」里找第一个。③`GetComponentInParent<T>()`：在「**自己 + 所有父物体**」里向上找第一个。三者一样——**找不到都返回 `null`**。按你要的组件挂在哪一层来选对应的方法。",
    tags: ["GetComponent", "InChildren", "InParent", "辨析"],
  },
  {
    id: "u5-so-11",
    chapter: "u5-scripting-objects",
    level: 2,
    question:
      "为什么说在 Inspector 里「拖引用」比代码里用 GameObject.Find 更好？",
    answer:
      "①**性能**：`Find` 要在运行时**遍历整个场景**按字符串匹配，慢；拖引用是编辑器期就指好的，**零运行时查找开销**。②**稳定**：`Find` 名字写错只会默默返回 `null`，还**找不到失活对象**；拖引用直接指向具体对象，不靠字符串。③**清晰**：拖好的引用在 Inspector 一眼可见，谁引用了谁很直观。所以优先用 `[SerializeField]` 拖引用，把 `Find` 留给少数没法提前指定的场景。",
    tags: ["拖引用", "GameObject.Find", "SerializeField", "辨析"],
  },
  {
    id: "u5-so-12",
    chapter: "u5-scripting-objects",
    level: 2,
    question:
      "transform.Translate/Rotate 与直接给 transform.position/rotation 赋值，分别适合什么场景？",
    answer:
      "`transform.Translate` / `Rotate`（配合 `Time.deltaTime`）适合**连续运动**——每帧累加一点位移 / 转角，做出平滑的移动、旋转。直接给 `transform.position` / `transform.rotation` 赋值是**一步到位**：`position` 赋值即「瞬移」到某世界坐标，`rotation`（用 `Quaternion.Euler` 构造）即「瞬转」到某朝向，适合传送、初始定位、对齐这类不需要过渡的场景。",
    tags: ["transform", "position", "Translate", "辨析"],
  },

  // ── L3 应用：用法 / 排错 ──
  {
    id: "u5-so-13",
    chapter: "u5-scripting-objects",
    level: 3,
    question:
      "代码 `GetComponent<Rigidbody>().velocity = v;` 报 NullReferenceException，怎么回事？怎么改？",
    answer:
      "原因：这个 GameObject **根本没挂 Rigidbody**，`GetComponent<Rigidbody>()` 返回了 `null`，你却直接拿 `null` 的 `.velocity`，于是空引用崩溃。\n修法：取完先判空再用——`var rb = GetComponent<Rigidbody>(); if (rb != null) rb.velocity = v;`；或确保该对象确实挂了 Rigidbody。更好的做法是在 `Start` 里 `rb = GetComponent<Rigidbody>();` 取一次缓存，既避免每帧重取，也好集中判空。",
    tags: ["GetComponent", "null", "NullReference", "排错"],
  },
  {
    id: "u5-so-14",
    chapter: "u5-scripting-objects",
    level: 3,
    question:
      "把 GetComponent 和 GameObject.Find 写进了 Update，结果游戏变卡。为什么？怎么改？",
    answer:
      "原因：`GetComponent` 和 `Find` 都有开销，尤其 `Find` 要**满场遍历**按字符串匹配；放进 `Update` 就是**每帧都重做一遍**这种查找，帧数一高浪费巨大，明显拖慢。\n修法：把这些查找**移到 `Start` / `Awake` 里做一次，把结果缓存到字段**，`Update` 里直接用缓存的引用。能用 `[SerializeField]` 拖引用的就别用 `Find`，从根上省掉运行时查找。",
    tags: ["Update", "GetComponent", "Find", "性能", "排错"],
  },
  {
    id: "u5-so-15",
    chapter: "u5-scripting-objects",
    level: 3,
    question:
      "脚本里 `[SerializeField] private Transform target;`，运行时却 NullReferenceException。最可能的原因和修法？",
    answer:
      "最可能的原因：**忘了在 Inspector 里把对象拖进那个槽**——`target` 字段还是空的 `None`，运行时自然是 `null`，一访问 `target.position` 就崩。\n修法：在场景里选中挂了该脚本的对象，在 Inspector 找到 `Target` 槽，把目标对象**拖进去**；养成「拖完所有引用再运行」的习惯。（若该引用确实可能为空，代码里用前也应判空。）",
    tags: ["SerializeField", "Inspector", "null", "排错"],
  },
  {
    id: "u5-so-16",
    chapter: "u5-scripting-objects",
    level: 3,
    question:
      "用 Instantiate 不停生成子弹后，场景里对象越积越多、越来越卡。怎么解决？",
    answer:
      "原因：`Instantiate` 出来的实例**不会自己消失**，只生成不销毁，对象数量无限增长，渲染 / 物理负担越来越重。\n基本修法：给每个生成的实例安排销毁——最简单是 `Destroy(bullet, 5f)`（飞 5 秒后自动销毁），或在子弹命中 / 出界时 `Destroy(gameObject)`。要点是「**有生就有灭**」：每个 `Instantiate` 都要对应一条销毁路径。（高频生成场景里，更优的是「对象池」复用，这是后续优化话题，但本章先用 Destroy 兜底。）",
    tags: ["Instantiate", "Destroy", "性能", "应用"],
  },

  // ── L4 综合：贯通 / 迁移 ──
  {
    id: "u5-so-17",
    chapter: "u5-scripting-objects",
    level: 4,
    question:
      "做一个「按空格发射子弹、子弹向前飞、3 秒后消失」的发射器，请说出用到哪些命令、各放在哪个回调里、为什么。",
    answer:
      "①**子弹预制体引用**：用 `[SerializeField] private GameObject bulletPrefab;` 暴露到 Inspector，**拖引用**而非 `Find`（更快更稳）。\n②**读输入 + 生成 → `Update`**：在 `Update` 里用 `Input.GetKeyDown(KeyCode.Space)` 检测按下，按下就 `Instantiate(bulletPrefab, transform.position, transform.rotation)` 照模板复制一颗子弹；输入要每帧及时响应，所以放 `Update`。\n③**清理 → `Destroy(bullet, 3f)`**：生成后立刻安排 3 秒延迟销毁，保证「有生就有灭」，对象不会越积越多。\n④**子弹自己向前飞**：在子弹脚本里，可在 `Update` 用 `transform.Translate(Vector3.forward * 速度 * Time.deltaTime)`（乘 deltaTime 保证速度与帧率无关），或挂 Rigidbody 在 `FixedUpdate` 给速度走物理。\n串起来：拖引用拿到模板 → Update 收输入并 Instantiate → 延迟 Destroy 兜底清理 → 子弹用 transform/物理自行飞行。",
    tags: [
      "综合",
      "Instantiate",
      "Destroy",
      "transform",
      "SerializeField",
      "迁移",
    ],
  },
];
