/** 复习题库 · GameObject 与组件模型（u5-gameobject-component）。《Unity 5 权威讲解》第2章改编。 */

import type { ReviewQuestion } from "./types";

export const u5GameobjectComponentQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "u5-gc-1",
    chapter: "u5-gameobject-component",
    level: 1,
    question: "什么是「GameObject」？为什么说它「本身什么都不会」？",
    answer:
      "GameObject 是 Unity 场景里最基本的「东西」——角色、摄影机、灯光、地面都是 GameObject。说它「什么都不会」是因为它本身只是一个**空壳/容器**，没有任何行为：默认连「在世界里的位置」这种事都不知道。它真正的本事，全靠挂在它身上的**组件（Component）**提供。用片场比喻：GameObject 是个还没拿到任何技能卡的空演员。",
    tags: ["GameObject", "定义", "空壳"],
  },
  {
    id: "u5-gc-2",
    chapter: "u5-gameobject-component",
    level: 1,
    question: "什么是「组件（Component）」？它和 GameObject 是什么关系？",
    answer:
      "组件是**挂在 GameObject 上、给它赋予某种能力的功能模块**，像给演员加的技能卡/装备。关系是「挂载」：一个 GameObject 通过挂上若干组件来获得能力——挂 Transform 才有位置、挂 Renderer 才画得出来、挂脚本才有玩法逻辑。**一个 GameObject 可以同时挂很多个组件**，组合出它的全部本事。",
    tags: ["组件", "Component", "定义", "挂载"],
  },
  {
    id: "u5-gc-3",
    chapter: "u5-gameobject-component",
    level: 1,
    question: "「Transform」组件是干什么的？它有什么特殊之处？",
    answer:
      "Transform 组件记录并控制 GameObject 的**位置（Position）、旋转（Rotation）、缩放（Scale）**——也就是它在世界里的「站位牌」。特殊之处：它是**每个 GameObject 都必有、且不可移除**的组件。任何 GameObject 一被创建就自带一个 Transform；你可以在 Inspector 里改它的值，但删不掉它。",
    tags: ["Transform", "定义", "必有组件"],
  },
  {
    id: "u5-gc-4",
    chapter: "u5-gameobject-component",
    level: 1,
    question: "列举几个常见组件，并说出它们各自给 GameObject 带来什么能力。",
    answer:
      "常见组件及其能力：**Renderer（如 MeshRenderer）**——把网格用材质画到屏幕上（它「画得出来」）；**Collider（如 BoxCollider）**——给它一个碰撞体积，能被撞到、能踩在上面（它「能碰撞」）；**Rigidbody**——交给物理引擎模拟，受重力、会被力推动（它「会动、会掉」）；**Script（脚本组件，继承 MonoBehaviour）**——你写的玩法逻辑（它「有了玩法」）。",
    tags: ["组件", "Renderer", "Collider", "Rigidbody", "脚本"],
  },
  {
    id: "u5-gc-5",
    chapter: "u5-gameobject-component",
    level: 1,
    question: "什么是「脚本组件（MonoBehaviour）」？",
    answer:
      "脚本组件是你用 C# 写的、继承自 **MonoBehaviour** 的类，用来给 GameObject 添加自定义的玩法逻辑。只有继承了 MonoBehaviour 的脚本，才能作为组件挂到 GameObject 上，并获得 Unity 的生命周期回调（如 `Start`、`Update`）。它和 Transform、Renderer 一样，也是挂在 GameObject 上的一个组件，只不过内容由你来写。",
    tags: ["MonoBehaviour", "脚本组件", "定义"],
  },
  {
    id: "u5-gc-6",
    chapter: "u5-gameobject-component",
    level: 1,
    question: "在编辑器里，怎么给一个 GameObject 添加组件？",
    answer:
      "在 Hierarchy 里选中目标 GameObject，看右侧的 **Inspector** 面板，最下方有一个 **Add Component** 按钮；点它、搜索组件名（如 Rigidbody、Box Collider，或你写的脚本名），点选即可挂上。挂上后该组件就出现在 Inspector 里、可以调它的属性。运行时也能用代码 `gameObject.AddComponent<T>()` 动态添加。",
    tags: ["Add Component", "Inspector", "添加组件"],
  },

  // ── L2 理解：为什么 / 区别 ──
  {
    id: "u5-gc-7",
    chapter: "u5-gameobject-component",
    level: 2,
    question: "「组合优于继承」是什么意思？传统继承在做游戏里会遇到什么麻烦？",
    answer:
      "「组合优于继承」是指**把功能拆成一块块可复用的组件，需要什么本事就给对象挂上对应组件**，而不是靠类的继承去堆叠能力。传统继承的麻烦是**组合爆炸**：要一个「会飞的敌人」造一个 FlyingEnemy 子类，要「会射击的」造 ShootingEnemy，要「既会飞又会射击的」又得造 FlyingShootingEnemy……能力种类一多，需要的子类数量呈 $2^n$ 指数膨胀，而且代码难以复用。组合则只需一个对象，按需勾选组件，自由拼装。",
    tags: ["组合优于继承", "继承", "组合爆炸", "设计"],
  },
  {
    id: "u5-gc-8",
    chapter: "u5-gameobject-component",
    level: 2,
    question:
      "为什么新建的一个空 GameObject，在屏幕上（Game 窗口里）看不到它？",
    answer:
      "因为一个空 GameObject 默认只带一个 **Transform** 组件——它有位置，但**没有任何负责「画出来」的组件**。要让一个物体出现在画面里，至少得给它挂上一个 **Renderer**（如 MeshRenderer，配合 MeshFilter 提供网格）。没有 Renderer，引擎就没有任何东西可画，所以它在 Game 窗口里是看不见的（虽然在 Hierarchy 里能看到它的名字、在 Scene 里能看到它的位置图标）。",
    tags: ["空GameObject", "Renderer", "看不到", "理解"],
  },
  {
    id: "u5-gc-9",
    chapter: "u5-gameobject-component",
    level: 2,
    question:
      "GameObject 和 Component 是两个不同的概念，容易混淆——它们的区别到底是什么？",
    answer:
      "**GameObject 是「容器/演员」，Component 是「挂在演员身上的能力/技能卡」**。GameObject 本身不提供任何具体行为，它的作用是「持有」一组组件；Component 才是真正干活的：Transform 管位置、Renderer 管绘制、脚本管玩法。一句话：你在场景里摆放、选中、命名的是 GameObject，而你给它「赋予本事」靠的是往它身上挂 Component。一个 GameObject 可以挂多个 Component，但 Component 不能脱离 GameObject 独立存在。",
    tags: ["GameObject", "Component", "区别", "混淆"],
  },
  {
    id: "u5-gc-10",
    chapter: "u5-gameobject-component",
    level: 2,
    question:
      "为什么 Transform 组件不能被移除，而 Renderer、Collider 这些可以？",
    answer:
      "因为**位置/旋转/缩放是任何 GameObject 都必须具备的基本属性**——哪怕一个空对象、一个纯逻辑对象，也得有「它在世界里在哪」这个信息（父子层级、坐标变换都依赖它）。所以 Unity 规定每个 GameObject 强制自带且不可删除 Transform。而 Renderer（画得出）、Collider（能碰撞）这些是**可选能力**：不是每个对象都需要被画出来或参与碰撞，所以它们可挂可不挂、可随时移除。",
    tags: ["Transform", "必有组件", "可选组件", "理解"],
  },
  {
    id: "u5-gc-11",
    chapter: "u5-gameobject-component",
    level: 2,
    question:
      "在 Inspector 里选中一个 GameObject 后看到的那一串东西是什么？它和「挂组件」有什么关系？",
    answer:
      "看到的那一串就是这个 GameObject **挂着的所有组件（Component）**，Inspector 把每个组件的属性都列出来给你看和改。第一项通常是 Transform（位置/旋转/缩放），后面跟着 MeshRenderer、Collider、你写的脚本等。所以「选中谁就显示谁的资料卡」，本质是「显示这个 GameObject 挂了哪些组件、各组件的参数是多少」——这正是「挂组件」的可视化结果。",
    tags: ["Inspector", "组件", "GameObject", "理解"],
  },

  // ── L3 应用：动手 / 排错 / 代码 ──
  {
    id: "u5-gc-12",
    chapter: "u5-gameobject-component",
    level: 3,
    question:
      "`GetComponent<T>()` 和 `AddComponent<T>()` 分别在什么时候用？写一段代码：在 Start 里拿到自身的 Rigidbody，如果没有就加一个。",
    answer:
      "`GetComponent<T>()` 用来**取得这个 GameObject 上已经挂着的某个组件**的引用（拿不到返回 `null`）；`AddComponent<T>()` 用来**在运行时给 GameObject 动态挂上一个新组件**。常见配合：先 Get，没有再 Add。\n\n```csharp\nusing UnityEngine;\n\npublic class EnsureRigidbody : MonoBehaviour\n{\n    void Start()\n    {\n        // 先尝试取自身已挂的 Rigidbody 组件\n        Rigidbody rb = GetComponent<Rigidbody>();\n\n        // 拿不到（null）说明还没挂，就动态加一个\n        if (rb == null)\n        {\n            rb = gameObject.AddComponent<Rigidbody>();\n        }\n\n        // 现在 rb 一定有效，可以用了\n        rb.mass = 2f;\n    }\n}\n```",
    tags: ["GetComponent", "AddComponent", "代码", "Rigidbody"],
  },
  {
    id: "u5-gc-13",
    chapter: "u5-gameobject-component",
    level: 3,
    question:
      "你给一个 GameObject 起好了名字、摆好了位置，运行时 Game 窗口里却什么都看不到。怎么排查？",
    answer:
      "多半是**少挂了负责绘制的组件**。排查步骤：①在 Inspector 里看这个 GameObject 挂了哪些组件——如果只有一个 Transform，那它当然画不出来。②给它挂上 **MeshFilter**（提供网格数据）+ **MeshRenderer**（负责绘制并指定材质），或者直接用一个内置的图形对象（如 Cube、Sphere，它们出生就带这两个组件）。③确认材质有效、摄影机能拍到它（位置在取景范围内）。核心一句：**没有 Renderer 就没有画面**。",
    tags: ["排错", "Renderer", "看不到", "MeshRenderer"],
  },
  {
    id: "u5-gc-14",
    chapter: "u5-gameobject-component",
    level: 3,
    question:
      "想做一个「会受重力下落、落地能被踩、还能用脚本控制」的平台，应该给这个 GameObject 挂哪些组件？",
    answer:
      "按需求逐项挂组件（组合的思路）：①**MeshRenderer**（+ MeshFilter）——让它画得出来；②**Collider**（如 BoxCollider）——给它碰撞体积，玩家才能踩在上面、不会穿过去；③如果要它**受重力下落**，再挂 **Rigidbody**（开启物理模拟）——注意纯静态地面通常不挂 Rigidbody，只有需要被物理驱动的才挂；④你写的**脚本组件**——实现「用脚本控制」的玩法逻辑。Transform 自带，无需手动挂。",
    tags: ["组件选择", "Rigidbody", "Collider", "应用"],
  },
  {
    id: "u5-gc-15",
    chapter: "u5-gameobject-component",
    level: 3,
    question:
      "代码里写了 `GetComponent<Rigidbody>().velocity = ...` 却报了空引用（NullReferenceException），最可能是什么原因？怎么改？",
    answer:
      "最可能是**这个 GameObject 上根本没挂 Rigidbody 组件**——`GetComponent<Rigidbody>()` 返回了 `null`，对 `null` 取 `.velocity` 就抛 NullReferenceException。改法二选一：①在编辑器里给该 GameObject 通过 **Add Component** 挂上 Rigidbody；②在代码里先判空，没有就用 `AddComponent<Rigidbody>()` 补上，再用。养成习惯：用 GetComponent 拿到引用后先检查是否为 `null`，确认组件确实挂了再访问它的属性。",
    tags: ["GetComponent", "NullReference", "排错", "Rigidbody"],
  },

  // ── L4 综合：贯通 / 迁移 ──
  {
    id: "u5-gc-16",
    chapter: "u5-gameobject-component",
    level: 4,
    question:
      "用「数字片场」的比喻，把 GameObject、Component、Transform、以及「组合优于继承」串成一个完整的故事讲一遍。",
    answer:
      "在数字片场里，**GameObject 是一个还没拿到任何技能卡的空演员**——它有名字、能被你点名（选中），但本身什么都不会。要让它有本事，你就往它身上贴**技能卡，也就是 Component**：贴上 **Transform**（每个演员一出生就强制自带、撕不掉的「站位牌」，记录他站哪、朝哪、多大）、贴上 **MeshRenderer** 他才画得出来、贴上 **Collider** 他才能被撞到、贴上你写的**脚本组件**他才有玩法。需要哪种本事就贴哪张卡——这就是 **组合优于继承**：不像传统做法那样为「会飞又会射击的敌人」专门造一个庞大的子类（能力一多子类就 $2^n$ 爆炸），而是一个演员按需自由拼装技能卡。你在 Inspector 里看到的那一摞，就是这个演员当前贴着的全部技能卡。",
    tags: ["综合", "数字片场", "组合优于继承", "贯通"],
  },
  {
    id: "u5-gc-17",
    chapter: "u5-gameobject-component",
    level: 4,
    question:
      "Unity 用「GameObject + 多个 Component」的组合模型，相比「一个庞大的角色类继承体系」，在可维护性和复用性上有哪些实际好处？",
    answer:
      "几条实际好处：①**复用**——同一个组件（如 FlyMovement、Health）可以挂到任意 GameObject 上，敌人、玩家、NPC 都能共用，不必各自在子类里重写；②**避免组合爆炸**——能力相互独立，新增一种能力只是新增一个组件，不会因为能力组合而催生 $2^n$ 个子类；③**运行时可变**——可以用 `AddComponent`/`Destroy` 在游戏过程中动态增删能力（比如拾取道具后临时获得「会飞」），继承体系做不到这点；④**关注点分离**——每个组件只负责一件事，单独测试、单独修改互不影响，代码更清晰。代价是组件之间的依赖与通信要靠 GetComponent 等手段显式管理。",
    tags: ["综合", "组合模型", "可维护性", "复用", "迁移"],
  },
];
