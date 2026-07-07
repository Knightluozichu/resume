import type { ReviewQuestion } from "./types";

/** 组件模式复习题 */
export const gppComponentQuestions: ReviewQuestion[] = [
  {
    id: "gpp-component-01",
    chapter: "gpp-component",
    level: 1,
    question: "组件模式（Component）的意图是什么？",
    answer:
      "意图：用「组合」代替「深度继承」，让实体的能力由它持有的组件集合决定，而非由它在继承树中的位置决定。\n\n核心思路：\n- 不再设计 `Entity → Character → Player`、`Entity → Character → Enemy` 这样的深层继承树。\n- 而是让 `GameObject` 只是一个「组件容器」，持有若干组件：`PhysicsComponent`、`RenderComponent`、`InputComponent`、`AIComponent` 等。\n- 实体的行为 = 它挂了哪些组件 + 各组件怎么配置。玩家挂 `PlayerInputComponent`，敌人挂 `AIInputComponent`，其余组件共用。\n\n解决的问题：\n- 继承深渊：层次太深，改底层父类影响所有子类，牵一发动全身。\n- 「父类爆炸」：想加「会飞的玩家」「会游泳的敌人」要在父类塞 `canFly`/`canSwim` 标志，污染所有子类，标志越来越多。\n- 多重需求组合：角色可能需要「物理+渲染+输入+战斗+拾取」的任意子集，继承无法灵活表达这种组合。\n\n组件模式让「加新能力 = 挂新组件」，不碰其他实体，避免继承树的僵硬。Unity、Unreal 的实体系统都基于此思想。",
    tags: ["意图", "组合", "继承深渊", "组件容器"],
  },
  {
    id: "gpp-component-02",
    chapter: "gpp-component",
    level: 2,
    question: "Unity 的组件系统是如何工作的？",
    answer:
      "Unity 的组件系统是组件模式的工业级实现：\n\n核心结构：\n- `GameObject`：轻量容器，本身几乎没有行为，只持有组件列表、名称、标签、层级关系（Transform 也是组件）。\n- `Component`（Unity 中称 `MonoBehaviour`）：挂载在 GameObject 上的功能单元，每个组件负责一方面（Transform 管位置、Renderer 管渲染、Collider 管碰撞、Rigidbody 管物理、脚本管自定义逻辑）。\n\n工作流程：\n1. 创建 GameObject（空容器）。\n2. 挂载组件——可在编辑器里 Add Component，或代码 `AddComponent<T>()`。\n3. 引擎每帧按生命周期调用组件的回调：`Awake` → `Start` → `Update`/`FixedUpdate` → `OnDestroy` 等。\n4. 组件之间通过 `GetComponent<T>()` 互相获取引用来通信。\n\n举例（玩家角色）：GameObject \"Player\" 挂载 Transform（位置/旋转/缩放）、MeshRenderer（渲染模型）、Rigidbody（物理模拟）、CapsuleCollider（碰撞体）、PlayerController（自定义脚本：输入→移动）、Health（自定义脚本：血量）。\n- 不用为「玩家」写一个包含所有功能的巨型类，而是组合现成组件 + 自定义脚本。\n- 敌人共用 Rigidbody/Collider/Renderer，只把 PlayerController 换成 EnemyAI 脚本。\n\n特点：\n- 数据驱动：组件可在编辑器里增删、调参数，运行时也可动态 `AddComponent`/`Destroy`。\n- 复用性：同一组件（如 Health）可挂在玩家、敌人、可破坏物上，一份代码服务多种实体。\n- 灵活组合：「飞行敌人」= Renderer + Rigidbody(useGravity=false) + EnemyAI + FlyController，按需挂载，不碰继承。\n\n局限（也是组件模式的通病）：\n- 组件间通信依赖 `GetComponent<T>()` 查找，有耦合和性能开销。\n- 数据分散在各组件里，不连续，cache 不友好（大规模实体时演进出 ECS/DOD）。\n- 组件太多时难以理清「这个实体到底有什么能力」（需靠编辑器面板可视化）。\n\nUnity 的实践证明了组件模式对中等规模实体、快速迭代的巨大价值，是游戏引擎的主流范式。",
    tags: ["Unity", "组件系统", "GameObject", "MonoBehaviour", "实践"],
  },
  {
    id: "gpp-component-03",
    chapter: "gpp-component",
    level: 3,
    question: "设计一个 `GameObject` 持有 `Physics`/`Render`/`Input` 组件的结构。",
    answer:
      "结构设计：\n\n1. 组件基类：\n定义 `abstract class Component`，含 `owner: GameObject` 和 `update(dt)` 方法，子类实现具体逻辑。\n\n2. 具体组件：\n- `PhysicsComponent`：持有 `x, y, vx, vy`，update 里应用速度（`x += vx * dt`），做碰撞检测。\n- `RenderComponent`：持有 `texture`，update 里从 `owner.get(PhysicsComponent)` 读位置，调 `engine.draw(texture, phys.x, phys.y)` 渲染。\n- `InputComponent`：update 里读输入，写 `PhysicsComponent` 的速度——`if (input.left) phys.vx = -100`，`if (input.jump) phys.vy = -300`。\n- `AIComponent`：update 里找玩家目标，朝玩家移动——`phys.vx = target.x > phys.x ? 50 : -50`。\n\n3. GameObject 容器：\n- `add<T>(c: T)`：挂载组件，设置 `c.owner = this`，压入 `components` 数组。\n- `get<T>(type)`：按类型查找组件（`components.find(c => c instanceof type)`）。\n- `update(dt)`：遍历所有组件调 `c.update(dt)`。\n\n4. 组装不同实体：\n- 玩家 = Physics + Input + Render('player.png')。\n- 敌人 = Physics + AI + Render('enemy.png')——复用 Physics/Render，只把 Input 换成 AI。\n- 静态装饰物（树）= 只有 Render('tree.png')，无物理无输入。\n\n设计要点：\n1. 组件通过 `owner.get(Type)` 互相查找通信——Render 从 Physics 读位置，Input 写 Physics 的速度。\n2. 实体差异 = 组件组合差异。玩家/敌人的区别只是 Input vs AI 组件，其余复用。\n3. 加新能力（如「可拾取」）只需写 `PickupComponent` 挂上去，不碰现有组件。\n4. 组件更新顺序需注意：先 Input/AI（决定速度）→ Physics（移动）→ Render（画）——可在 update 里按类型排序或用优先级。\n5. 这是「面向对象组件」形态；进一步把组件数据按类型连续存储（所有 PhysicsComponent 的 x 连续）就演进到 ECS/DOD，提升 cache 性能。",
    tags: ["应用", "GameObject", "Physics", "Render", "Input", "组件组合"],
  },
  {
    id: "gpp-component-04",
    chapter: "gpp-component",
    level: 4,
    question: "组件模式存在什么通信问题？组件之间如何交互？有哪些方案及取舍？",
    answer:
      "通信问题：\n组件模式把实体的功能拆散到多个组件，但组件间往往需要协作——Render 要读 Physics 的位置、Input 要写 Physics 的速度、Health 变了要通知 UI。组件彼此独立，如何通信成了核心难题。\n\n常见方案及取舍：\n\n1. 直接引用（GetComponent 查找）：\n- 组件 A 调 `owner.get(PhysicsComponent)` 拿到 B 的引用，直接读写。\n- 优点：简单直接，类型安全。\n- 缺点：强耦合——A 知道 B 的具体类型，B 不存在时 A 要处理 null；组件依赖关系隐式，难以静态分析；`GetComponent` 查找有开销（虽可缓存引用）。\n- 适合：固定、紧密的组件协作（Render 永远依赖 Physics）。\n\n2. 共享数据对象（Blackboard / 共享状态）：\n- GameObject 持有一个共享的数据容器（键值对或结构体），各组件读写共享字段，互不直接引用。\n- 优点：组件解耦——A 写 `shared.pos`，B 读 `shared.pos`，A 不知道 B 存在。\n- 缺点：字段约定隐式（无类型约束时易拼写错误）；数据流难追踪（谁改了 pos？）。\n- 适合：松散、可选的协作。\n\n3. 事件/消息（观察者 / 事件总线）：\n- 组件 A 发事件 `owner.emit('healthChanged', 80)`，组件 B（UI）订阅该事件响应。\n- 优点：完全解耦，发送方不知道接收方是谁，支持一对多。\n- 缺点：事件流隐式，调试困难（见观察者模式局限）；同步执行有时序问题。\n- 适合：一对多广播、可选响应（如 Health 变化通知 UI/音效/成就）。\n\n4. 组件间接口（抽象依赖）：\n- 定义接口 `IPhysics`（含 `getX()`），PhysicsComponent 实现它，RenderComponent 依赖 `IPhysics` 而非具体类。\n- 优点：松耦合，可替换实现（Mock 测试）。\n- 缺点：接口膨胀，间接一层。\n- 适合：需可测试/可替换的核心依赖。\n\n5. 集中式更新（系统）：\n- 不让组件互相通信，而是由外部「系统」统一拉取数据处理。如 `RenderSystem` 遍历所有有 Render+Physics 的实体，用 Physics 数据渲染——组件本身无感知。这是 ECS 的做法。\n- 优点：组件退化为纯数据，通信问题消失，数据连续 cache 友好。\n- 缺点：组件失去「自包含」封装，逻辑集中在系统，复杂度转移。\n- 适合：大规模实体、性能敏感场景。\n\n取舍建议：\n- 固定强依赖（Render↔Physics）→ 直接引用，简单高效。\n- 可选/一对多协作（Health→UI/音效）→ 事件。\n- 大规模、性能敏感 → ECS 系统化，消除组件间通信。\n- 没有银弹——混合使用最常见：核心紧耦合用引用，跨域通知用事件，热路径用系统化。\n\n组件模式的通信难题正是它演进到 ECS 的主要驱动力之一——ECS 通过「组件只存数据、系统集中处理」干脆绕开了组件间点对点通信。",
    tags: ["综合", "通信", "GetComponent", "事件", "共享状态", "ECS", "取舍"],
  },
];
