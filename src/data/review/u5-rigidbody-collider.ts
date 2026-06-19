/** 复习题库 · 刚体与碰撞器（u5-rigidbody-collider）。《Unity 5 权威讲解》第7章改编。 */

import type { ReviewQuestion } from "./types";

export const u5RigidbodyColliderQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "u5-rc-1",
    chapter: "u5-rigidbody-collider",
    level: 1,
    question: "`Rigidbody`（刚体）是干什么的？给对象加上它会发生什么？",
    answer:
      "`Rigidbody` 把一个 GameObject「**交给物理引擎管**」。加上它，对象就从「呆着不动」变成「**受物理支配**」：自动受重力下落、能被力（`AddForce`）推动、能与别的碰撞体碰撞反弹——这些都由引擎每个物理帧替你算，你只管下指令，不用自己写重力 / 碰撞逻辑。",
    tags: ["Rigidbody", "刚体", "定义"],
  },
  {
    id: "u5-rc-2",
    chapter: "u5-rigidbody-collider",
    level: 1,
    question:
      "`Collider`（碰撞器）是什么？引擎拿什么来做碰撞检测——精细网格还是别的？",
    answer:
      "`Collider` 是给对象套的一层「**碰撞外壳**」——一个用于碰撞检测的物理形状轮廓。引擎拿**这层轮廓**（不是你看到的精细渲染网格）判断两个对象有没有撞上、撞上往哪弹。形状越简单越便宜：常用 primitive 有 `BoxCollider` / `SphereCollider` / `CapsuleCollider`。",
    tags: ["Collider", "碰撞器", "定义"],
  },
  {
    id: "u5-rc-3",
    chapter: "u5-rigidbody-collider",
    level: 1,
    question:
      "Rigidbody 的 `mass` / `drag` / `useGravity` / `constraints` 各管什么？",
    answer:
      "`mass`（质量）：越重，同样的力推它动得越慢（不影响自由下落速度）。`drag`（线性阻力）：越大速度衰减越快，像在水里。`useGravity`：是否受重力——关掉就不自动下落。`constraints`：冻结某些轴的位置 / 旋转，常用 `FreezeRotation` 防止物体乱翻滚。",
    tags: ["Rigidbody", "mass", "drag", "useGravity", "constraints", "定义"],
  },
  {
    id: "u5-rc-4",
    chapter: "u5-rigidbody-collider",
    level: 1,
    question:
      "`rb.AddForce(...)` 是做什么的？第二个参数 `ForceMode` 是干嘛的？",
    answer:
      "`AddForce` 给刚体**施加一个力**，写成 `rb.AddForce(力向量, 模式)`。力按「力 = 质量 × 加速度」影响速度，同样的力推质量大的对象动得慢。第二个参数 `ForceMode` 选施力方式：`Force`（持续推力，受质量影响）/ `Impulse`（瞬间冲量，做跳跃 / 击飞）/ `VelocityChange`（直接改速度，忽略质量）/ `Acceleration`（持续加速度，忽略质量）。",
    tags: ["AddForce", "ForceMode", "定义"],
  },
  {
    id: "u5-rc-5",
    chapter: "u5-rigidbody-collider",
    level: 1,
    question: "`isKinematic` 勾上后，这个 Rigidbody 会变成什么样的「身体」？",
    answer:
      "勾上 `isKinematic` 后，刚体变成「**运动学体**」：**不再受重力和力**（`AddForce` 对它无效），只能由脚本 / 动画用 `MovePosition` 之类去移动；但它移动时仍能**顶开**别的动态刚体。用于电梯、移动平台、被动画驱动的角色——这些要「会动、但不被物理推来推去」的对象。",
    tags: ["isKinematic", "运动学", "定义"],
  },
  {
    id: "u5-rc-6",
    chapter: "u5-rigidbody-collider",
    level: 1,
    question: "Collider 的 `isTrigger` 勾上后有什么不同？",
    answer:
      "勾上 `isTrigger` 后，这个碰撞器**不再物理阻挡**别人（别人会直接穿过去），只「**感应**到有东西穿过」并发出触发事件——像一道看不见的感应门，常用于「踩到某区域就触发机关」这类感应区。具体的事件回调（`OnTriggerEnter` 等）属于下一章的内容。",
    tags: ["isTrigger", "触发器", "定义"],
  },
  {
    id: "u5-rc-7",
    chapter: "u5-rigidbody-collider",
    level: 1,
    question: "`PhysicMaterial`（物理材质）能调对象的什么属性？",
    answer:
      "`PhysicMaterial` 调一个表面的**手感**：`bounciness`（弹性，0 不弹、1 几乎全弹回）、`dynamicFriction` / `staticFriction`（滑动 / 静止摩擦，越小越滑像冰面）。把它赋给 `Collider.material`，就能做出「超弹的弹力球」或「滑溜的冰面」等效果。",
    tags: ["PhysicMaterial", "摩擦", "弹性", "定义"],
  },

  // ── L2 理解：辨析 / 关系 ──
  {
    id: "u5-rc-8",
    chapter: "u5-rigidbody-collider",
    level: 2,
    question:
      "静态体 / 动态体 / 运动学体三种「身体类型」分别怎么搭、各自怎样表现？",
    answer:
      "**静态体**：只有 `Collider`、**没有 Rigidbody**——撞它它不动，但挡得住别人（墙、地面）。**动态体**：有 `Rigidbody`（非 kinematic）——受力 / 被撞会动、会被撞飞（可推的箱子、能滚的球）。**运动学体**：`Rigidbody` + `isKinematic`——不受力、撞它它不动，但它自己移动时能**顶开**动态体（电梯、移动平台）。",
    tags: ["静态体", "动态体", "运动学", "三态", "辨析"],
  },
  {
    id: "u5-rc-9",
    chapter: "u5-rigidbody-collider",
    level: 2,
    question:
      "为什么物理操作（AddForce / velocity）要写在 `FixedUpdate` 而不是 `Update`？",
    answer:
      "`Update` 每帧调一次、**帧率不固定**；而物理引擎按**固定步长**跑。在 `Update` 里施力等于「按帧率乱给力」，会导致不同机器上运动快慢不一、还时而抽搐。`FixedUpdate` 与物理引擎**同节拍**（固定步长），所以所有 `AddForce` / `velocity` / `MovePosition` 都该放这里；只有「读输入」可放 `Update`，存下来到 `FixedUpdate` 里用。",
    tags: ["FixedUpdate", "Update", "AddForce", "辨析"],
  },
  {
    id: "u5-rc-10",
    chapter: "u5-rigidbody-collider",
    level: 2,
    question:
      "`ForceMode.Force` 和 `ForceMode.Impulse`、`VelocityChange` 有什么区别？分别什么时候用？",
    answer:
      "`Force`：**持续推力**，受质量影响——适合发动机、风这类「一直推」的力。`Impulse`：**瞬间冲量**，受质量影响——适合跳跃、爆炸击飞这类「猛地一下」。`VelocityChange`：直接改速度，**忽略质量**——想让所有质量的物体「同样的输入得到同样的速度变化」时用。前两个受 `mass` 影响（越重越难推），后者不受。",
    tags: ["ForceMode", "Force", "Impulse", "VelocityChange", "辨析"],
  },
  {
    id: "u5-rc-11",
    chapter: "u5-rigidbody-collider",
    level: 2,
    question:
      "什么时候用 primitive collider（盒 / 球 / 胶囊），什么时候才该用 `MeshCollider`？",
    answer:
      "**优先用 primitive**（`BoxCollider` / `SphereCollider` / `CapsuleCollider`）：它们很便宜，方正物体用盒、球形用球、角色用胶囊，能拼出大致形状就够了。只有当物体形状很不规则、且精确碰撞确实重要时才用 `MeshCollider`——它贴网格本身、**很贵**，且用在会动的对象上必须勾 `convex`（会被简化成凸包）。能用 primitive 拼就别上 MeshCollider。",
    tags: ["Collider", "MeshCollider", "primitive", "Convex", "辨析"],
  },
  {
    id: "u5-rc-12",
    chapter: "u5-rigidbody-collider",
    level: 2,
    question:
      "给一面墙 / 地面，应该「只加 Collider」还是「加 Collider + Rigidbody」？为什么？",
    answer:
      "墙、地面这类「挡得住、但自己不该动」的对象，应该**只加 Collider、不加 Rigidbody**——这就是「静态碰撞器」，能挡住别的动态物体，自己纹丝不动。给它加 Rigidbody 反而会让它自己受重力**塌下去**，是常见误用。（若需要「会动又要挡人」的对象，给 Rigidbody 并勾 `isKinematic` 做成运动学体。）",
    tags: ["静态碰撞器", "Rigidbody", "Collider", "辨析"],
  },
  {
    id: "u5-rc-13",
    chapter: "u5-rigidbody-collider",
    level: 2,
    question: "`mass`（质量）越大，物体自由下落就越快吗？mass 到底影响什么？",
    answer:
      "**不是。** 真空里所有质量的物体下落一样快，Unity 的重力也一样——`mass` **不影响自由下落的速度**。`mass` 只影响「**受力 / 碰撞时的反应**」：越重越难被推动、被撞时越不容易飞。想让某物体「不下落」，应关 `useGravity` 或用 `constraints` 冻结 Y 轴，而不是去调 `mass`。",
    tags: ["mass", "重力", "useGravity", "辨析"],
  },

  // ── L3 应用：用法 / 排错 ──
  {
    id: "u5-rc-14",
    chapter: "u5-rigidbody-collider",
    level: 3,
    question:
      "一个挂了 Rigidbody 的物体，用 `transform.position = ...` 直接瞬移，结果穿墙、位置剧烈抖动。为什么？该怎么动它？",
    answer:
      "原因：`transform` 瞬移是「**无视物理的传送**」，它跳过引擎的碰撞检测和速度积分，让物理状态和实际位置打架——所以会穿墙、抖动、碰撞乱套。\n修法：**动态体**靠 `rb.AddForce(...)` 施力或 `rb.velocity = ...` 设速度移动；**运动学体 / 需要精确位移的**用 `rb.MovePosition(目标)`（在物理步里平滑移动并参与碰撞）。给了 Rigidbody 的物体，原则上别再碰它的 `transform`。",
    tags: ["transform", "MovePosition", "穿墙", "排错"],
  },
  {
    id: "u5-rc-15",
    chapter: "u5-rigidbody-collider",
    level: 3,
    question:
      "两个该相撞的物体直接穿过对方，碰撞 / 触发事件一个都不触发。最可能的原因和修法？",
    answer:
      "最可能的原因：碰撞 / 触发要被引擎处理，参与的**两个对象里至少要有一个带 `Rigidbody`**（且两边都得有 `Collider`）。如果两个都是「静态碰撞器」（都没 Rigidbody），引擎根本不为它俩做碰撞计算。\n修法：给其中那个该动的物体加上 `Rigidbody`（动态或运动学均可）；再确认两边都挂了 `Collider`、且 Collider 形状真的罩住了物体。",
    tags: ["碰撞事件", "Rigidbody", "Collider", "排错"],
  },
  {
    id: "u5-rc-16",
    chapter: "u5-rigidbody-collider",
    level: 3,
    question:
      "在 `Update` 里 `AddForce`，物体在不同帧率机器上快慢不一、还时而抽搐。为什么？怎么改？",
    answer:
      "原因：`Update` 每帧调一次、帧率不固定，而物理引擎按固定步长跑；在 `Update` 里施力等于按帧率乱给力，所以高帧率机器施力次数多、低帧率次数少，表现就不一致、还抽搐。\n修法：把 `AddForce` / `velocity` / `MovePosition` 等所有物理操作搬进 **`FixedUpdate`**（固定步长、与物理同拍）；只把「读输入」留在 `Update`，用一个标记 / 变量把输入传到 `FixedUpdate` 里执行。",
    tags: ["Update", "FixedUpdate", "AddForce", "帧率", "排错"],
  },
  {
    id: "u5-rc-17",
    chapter: "u5-rigidbody-collider",
    level: 3,
    question:
      "两个用 `MeshCollider` 的物体贴在一起却怎么都碰不到、直接穿插。为什么？怎么解决？",
    answer:
      "原因：两个**都没勾 Convex** 的 MeshCollider，引擎默认**不为它俩做碰撞**（凹网格对凹网格的碰撞太贵，被禁掉了）。\n修法：把会动的那个 MeshCollider 勾上 `convex = true`（它会被简化成凸包）；或更省的办法——用 primitive collider（盒 / 球 / 胶囊）拼出大致形状代替 MeshCollider，既便宜又稳。",
    tags: ["MeshCollider", "Convex", "穿插", "排错"],
  },
  {
    id: "u5-rc-18",
    chapter: "u5-rigidbody-collider",
    level: 3,
    question:
      "想做「按空格让一个挂了 Rigidbody 的球起跳」，请说出输入和施力分别放哪、用什么 ForceMode。",
    answer:
      "**输入读在 `Update`**（帧率内最及时地捕捉按键），如 `if (Input.GetKeyDown(KeyCode.Space)) jumpQueued = true;`，用一个 `bool` 标记把「要跳」传给物理。**施力放 `FixedUpdate`**：`if (jumpQueued) { rb.AddForce(Vector3.up * 5f, ForceMode.Impulse); jumpQueued = false; }`——用 `Impulse` 给一个向上的瞬间冲量做起跳，施完把标记清掉避免重复施力。这就是「输入驱动物理」的标准拆分：读输入在 Update、动物理在 FixedUpdate。",
    tags: ["AddForce", "Impulse", "FixedUpdate", "起跳", "应用"],
  },

  // ── L4 综合：贯通 / 迁移 ──
  {
    id: "u5-rc-19",
    chapter: "u5-rigidbody-collider",
    level: 4,
    question:
      "做一个「移动平台托着玩家箱子匀速来回」的功能：平台、箱子、地面三者各该用哪种身体类型 / 组件，平台怎么移动，为什么这么选？",
    answer:
      "①**地面**：静态体——只加 `Collider`、不加 Rigidbody。它要挡住一切但自己绝不动，加 Rigidbody 反而会塌。\n②**平台**：运动学体——`Rigidbody` + `isKinematic`，外加 Collider。它要「会动、但不被物理推来推去」，且移动时能**顶起**站在上面的箱子。移动用 `rb.MovePosition(目标)` 放在 `FixedUpdate`（在物理步里平滑移动、正确参与碰撞），目标位置用 `Time.fixedDeltaTime` 推进做匀速来回；**绝不能用 `transform.position` 直接挪**（会穿插 / 抖动，且托不动箱子）。\n③**箱子**：动态体——`Rigidbody`（非 kinematic）+ Collider，受重力压在平台上，被平台顶着一起移动。\n串起来：静态地面挡底，运动学平台用 MovePosition 主动移并顶起动态箱子，动态箱子靠重力贴着平台。核心是「该被物理推的用动态、要自己动又挡人的用运动学 + MovePosition、纯背景挡墙用静态」。",
    tags: [
      "综合",
      "运动学",
      "MovePosition",
      "静态体",
      "动态体",
      "FixedUpdate",
      "迁移",
    ],
  },
];
