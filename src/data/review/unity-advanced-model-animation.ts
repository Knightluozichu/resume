/** 复习题库 · 3D模型与动画（unity-advanced-model-animation）。《Unity3D高级编程：主程手记》第5章。 */

import type { ReviewQuestion } from "./types";

export const unityAdvancedModelAnimationQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "ua-ma-1",
    chapter: "unity-advanced-model-animation",
    level: 1,
    question: "Animator 状态机（State Machine）的核心组成要素有哪些？",
    answer:
      "Animator 状态机的核心组成：① **States（状态）**——每个状态对应一段动画片段（AnimationClip），如 Idle、Run、Attack、Die，状态有 Entry（入口）、Any State（任意状态）、Exit（退出）三个特殊状态；② **Transitions（过渡/转换线）**——定义从一个状态到另一个状态的过渡条件、过渡时长（Has Exit Time 是否等当前动画播完再切、Transition Duration 交叉淡入淡出时长）、是否可以打断自己；③ **Parameters（参数）**——驱动状态转换的变量，支持四种类型：Float、Int、Bool、Trigger（触发后自动复位）；④ **Layers（动画层）**——多层状态机叠加，常用于上半身/下半身分离动画（如下半身跑、上半身瞄准射击），通过 Avatar Mask 和 Weight 控制每层的影响范围和权重；⑤ **Blend Trees（混合树）**——根据一个或多个参数（如速度 Speed、方向 Direction）在多个动画片段之间做线性混合，实现如走→跑的平滑过渡、不同方向的 strafing。",
    tags: ["Animator", "状态机", "StateMachine", "Transition", "BlendTree", "Layers", "Parameters"],
  },
  {
    id: "ua-ma-2",
    chapter: "unity-advanced-model-animation",
    level: 1,
    question: "什么是 Root Motion（根运动）？它和「原地动画」有什么区别？",
    answer:
      "Root Motion 是指动画片段中包含了角色根骨骼（Root）的位移/旋转信息，播放动画时由 Animator 直接将位移应用到 GameObject 的 Transform 上——角色的移动距离和方向完全由动画数据决定。**区别**：① **Root Motion 动画**——美术在 DCC（Maya/3ds Max）中制作动画时角色是「走出去的」，动画曲线记录了根骨骼的位移，Animator.ApplyRootMotion=true 时角色会跟着动画移动，移动精度和动画表现完全匹配，不会出现「脚滑」（脚在地上蹭）；② **原地动画（In-Place）**——动画中角色的位移被烘焙到原位（根骨骼不移动），角色移动完全由脚本控制 Transform.position 或 CharacterController.Move，动画只负责表现「跑的动作」，移动距离由代码决定。**适用场景**：Root Motion 适合精确操控的动作游戏（如黑魂、只狼的闪避/处决动画位移必须精确），原地动画适合 MMO/MOBA 等需要脚本精确控制移动速度、方向、网络同步的游戏（服务器和客户端都用代码算位置）。两者也可以混合使用（如用 Animator.deltaPosition 获取动画位移再交给 CharacterController 应用）。",
    tags: ["RootMotion", "根运动", "原地动画", "位移", "Animator"],
  },

  // ── L2 理解：原理 / 区别 ──
  {
    id: "ua-ma-3",
    chapter: "unity-advanced-model-animation",
    level: 2,
    question: "SkinnedMeshRenderer（蒙皮网格渲染器）的蒙皮原理是什么？为什么蒙皮动画开销比刚体动画大？",
    answer:
      "**蒙皮原理**：SkinnedMeshRenderer 渲染的是「骨骼绑定」的网格：① 网格的每个顶点都绑定到一根或多根骨骼（Bone），每根骨骼有对应的权重（Weight，通常最多 4 根骨骼影响一个顶点，权重和为 1）；② 骨骼以 Transform 层级关系存在，形成骨骼树（Skeleton Hierarchy），动画驱动骨骼的位置/旋转/缩放变化；③ 每帧顶点着色器（或 CPU）根据当前骨骼变换矩阵和权重，对顶点做线性蒙皮计算：`v' = Σ(weight_i * boneMatrix_i * v)`，即每个顶点的最终位置是其绑定的几根骨骼变换后位置的加权平均；④ 计算后的顶点送去渲染。**为什么开销大**：① 刚体动画（无蒙皮的 MeshRenderer）只需移动 Transform，顶点位置不变，GPU 直接用静态顶点缓冲；② 蒙皮网格每帧需要更新所有顶点位置——老版本在 CPU 做蒙皮再传顶点到 GPU，新版本（大多数平台）在 GPU 顶点着色器做蒙皮（Skinning Pass），但仍然需要每帧传递骨骼矩阵数组（通常几十到几百个矩阵），并且顶点处理量是刚性网格的数倍；③ 骨骼越多、顶点越多、单个顶点绑定骨骼数越多，蒙皮开销越大；④ 蒙皮还会影响动态合批（蒙皮网格不能动态合批）。优化方向：控制骨骼数量（移动端角色 30~60 根以内）、控制顶点数、使用 GPU Skinning、必要时用 LOD 减面远处用低模或 Impostor。",
    tags: ["SkinnedMeshRenderer", "蒙皮", "骨骼动画", "GPU Skinning", "顶点", "性能"],
  },
  {
    id: "ua-ma-4",
    chapter: "unity-advanced-model-animation",
    level: 2,
    question: "Animation Events（动画事件）是什么？使用时要注意什么坑？",
    answer:
      "Animation Events 是在动画时间轴上挂载的回调点——当动画播放到事件标记的帧时，Unity 会调用挂载该动画的 Animator 所在 GameObject 上的一个指定名字的方法（可传 Int/Float/String/Object 参数）。常用于动画与逻辑同步：如攻击动画第 10 帧产生伤害判定（OnHit）、脚步声动画对应帧播放音效（OnFootstep）、技能动画结束帧触发特效回收（OnAnimEnd）。\n\n**要注意的坑**：① **方法名必须完全匹配**——事件调用的是 SendMessage 风格的反射调用，方法名拼写错误不会报编译错误，运行时静默失败，必须在 Animator 所在 GameObject（或其子节点？实际上是 Animator 所在根物体）上有对应签名的方法；② **过渡期间可能重复触发或不触发**——两个动画交叉淡入淡出时，如果事件在过渡区间内，可能触发两次（两个动画都经过该帧）或不触发（被跳过），关键事件需要用 StateMachineBehaviour 或代码状态标记做防护；③ **GameObject 禁用/销毁时事件丢失**——如果动画播到一半 GameObject 被 SetActive(false) 或 Destroy，未触发的事件不会补发；④ **参数类型限制**——只能传一个参数，且类型只有 Int/Float/String/Object 四种，不能传自定义类型；⑤ **频繁的事件会增加 CPU 开销**——每帧要检查是否有事件需要触发，大量事件会增加负担。**最佳实践**：关键逻辑事件（如伤害判定）推荐在 Animator StateMachineBehaviour 的 OnStateEnter/OnStateExit 或通过动画状态轮询（检查 normalizedTime）来触发，Animation Events 适合做音效/特效等表现层同步。",
    tags: ["AnimationEvents", "动画事件", "回调", "帧同步", "坑"],
  },
  {
    id: "ua-ma-5",
    chapter: "unity-advanced-model-animation",
    level: 2,
    question: "什么是动画重定向（Humanoid Avatar Retargeting）？它为什么能实现「一套动画给多个角色用」？",
    answer:
      "动画重定向是 Unity Humanoid（人形）动画系统的核心能力：可以让同一套人形动画（如走、跑、跳）应用到不同比例、不同骨骼结构的人形角色上。**原理**：① **Avatar 映射**——导入模型时，Unity 将模型的骨骼映射到一个统一的「人形骨架（Humanoid Avatar）」上，这个标准骨架定义了人体的关键骨骼（头、脊椎、左右手、左右腿等约 50~70 个映射点），不同模型的骨骼不管在 DCC 里叫什么名字，都映射到同一套标准骨骼上；② **肌肉空间（Muscle Space）**——Humanoid 动画不是存储骨骼的原始旋转值，而是存储「肌肉」的拉伸/收缩程度（如手臂抬起多少度、膝盖弯曲多少度），这是一个抽象的、归一化的人体姿态空间；③ **重定向计算**——播放动画时，Unity 先从动画的肌肉空间还原出标准骨架姿态，再根据目标角色 Avatar 的骨骼映射和骨骼比例（T-Pose 初始姿势），把标准姿态转换为目标角色的骨骼变换。这样不管角色是瘦是胖、腿长腿短，只要是人形且 Avatar 配置正确，就能复用同一套动画数据。**注意**：重定向只适用于 Humanoid 类型，Generic 类型动画不能重定向；手指/面部等精细动画重定向质量可能下降；非人形生物（四足动物、怪物）不适用 Humanoid。",
    tags: ["动画重定向", "Retargeting", "Humanoid", "Avatar", "肌肉空间", "动画复用"],
  },

  // ── L3 应用：优化 / 实践 ──
  {
    id: "ua-ma-6",
    chapter: "unity-advanced-model-animation",
    level: 3,
    question: "模型导入（Model Import）阶段有哪些关键的优化设置？请从面数、骨骼、材质、动画压缩几个角度说明。",
    answer:
      "**模型导入优化**：\n\n**Mesh/面数相关**：① 控制多边形数量——移动端主角 3000~10000 三角面，NPC/怪物 1500~5000，场景道具更简单；② Read/Write Enabled 关闭——默认关闭，开启会在 CPU 内存保留一份 Mesh 副本导致内存翻倍，只有需要脚本修改 Mesh（如捏脸、布料、Mesh 合并）时才开启；③ Optimize Mesh——勾选后会重排顶点/索引顺序提升 GPU 缓存命中率；④ 禁止 Import Cameras/Lights（除非确实需要从 DCC 导入）；⑤ Mesh Compression——开启可减小磁盘和运行时内存占用（但会损失精度，极端情况可能导致穿模，对精度要求高的模型慎用）。\n\n**骨骼/蒙皮相关**：① Rig 类型选择正确——人形角色用 Humanoid（可重定向），其他用 Generic；② Optimize Game Objects——勾选后会将骨骼层级从 Hierarchy 中隐藏（只暴露指定的骨骼），减少 Transform 层级深度和 Animator 每帧遍历骨骼的开销；③ 控制骨骼数量——移动端控制在 30~60 根，PC 端不超过 100 根；④ Skin Weights 标准——Standard（4 骨）够用，不需要更多骨骼影响。\n\n**材质相关**：① 共享材质——同用途部件尽量共享材质以利合批；② 使用 Material Remap 或 OnPostprocessMaterial 在导入时自动替换为项目标准材质；③ 尽量减少 Material 数量——一个角色 1~3 个材质为宜。\n\n**动画压缩相关**：① Animation Compression 设置为 Optimal（Unity 自动选择最佳压缩），动画精度要求高的（如面部表情）可以用 High；② Resample Curves 关闭不需要的曲线；③ 不要导入不需要的动画（Import Animation 可只导入需要的 Clip，通过 Clips 列表裁剪）；④ Anim.Compression 下的 Rotation/Position/Scale Error 默认值即可，关键部位（如持武器的手）可以单独减小误差；⑤ 关闭 Constant Curve 的冗余数据（Remove Constant Scale/Offset Curves）。\n\n**其他**：① 使用 LOD Group 为不同距离准备不同面数的模型；② 不需要碰撞的模型不要自动生成 Mesh Collider；③ 导入后通过 AssetPostprocessor 做自动化处理（如自动设置、检查规范）。",
    tags: ["模型导入", "ImportSettings", "优化", "面数", "骨骼", "动画压缩", "LOD", "AssetPostprocessor"],
  },
  {
    id: "ua-ma-7",
    chapter: "unity-advanced-model-animation",
    level: 3,
    question: "Animator Culling Mode（剔除模式）的各个选项分别是什么？怎么选择合适的 Culling 模式来优化动画性能？",
    answer:
      "Animator 的 Culling Mode 控制当摄像机看不见该角色（SkinnedMeshRenderer 被剔除）时，动画是否继续更新：\n\n① **Always Animate（始终播放）**——即使角色完全在摄像机视野外，Animator 仍然完整更新状态机、采样动画、计算蒙皮。开销最大，但如果角色有离线逻辑依赖动画状态（如通过动画事件触发逻辑、Root Motion 影响位移），或者可能突然进入视野需要完整状态，需要用这个。\n\n② **Cull Update Transforms（剔除更新 Transform）**——角色不可见时，状态机继续运转（参数变化、状态切换正常进行），但**不计算 Root Motion 位移、不写回骨骼 Transform**。角色重新可见时骨骼位置会立刻同步到当前状态机状态的正确位置。适用于：需要动画状态机继续运转（如 AI 持续判断状态、等待动画播完切状态）但不需要骨骼精确位置的场景——这是最常用的优化选项，兼顾正确性和性能。\n\n③ **Cull Completely（完全剔除）**——角色不可见时 Animator 完全停止更新，状态机冻结、不做任何计算。角色重新可见时从冻结处继续播放。性能最好但有问题：如果角色不可见期间动画参数发生了变化（如进入战斗状态），动画不会切换，直到重新可见才会反应过来，会出现「看到角色时先愣一下才切动画」的延迟。适用于纯装饰性 NPC、环境动画等不需要后台逻辑驱动的角色。\n\n**主程指导原则**：① 玩家角色、重要 NPC/Boss 用 Cull Update Transforms 或 Always Animate（如果有精确的 Root Motion 网络同步要求）；② 场景中大量的小怪/装饰 NPC 用 Cull Completely，但要在它们即将进入视野前（如通过距离触发）强制刷新一次 Animator；③ 结合 LOD 和距离剔除——远处的角色可以降低动画更新频率（通过 Animator.updateMode 或自定义代码设置），甚至用顶点动画/Impostor 替代；④ UI 上的角色模型（如人物预览）用独立 Camera 渲染时注意 Culling 不要误杀。\n\n注意：Animator Culling 只影响 SkinnedMeshRenderer 不可见的情况，如果角色在视野内但被遮挡（被其他物体挡住），默认仍然会更新（因为遮挡剔除是粗粒度的），需要配合 Occlusion Culling 使用。",
    tags: ["AnimatorCulling", "CullingMode", "剔除", "性能优化", "AlwaysAnimate", "CullCompletely"],
  },

  // ── L4 主程视角 ──
  {
    id: "ua-ma-8",
    chapter: "unity-advanced-model-animation",
    level: 4,
    question: "你作为主程要制定团队的 3D 角色与动画技术规范和优化策略，覆盖模型导入、动画系统、运行时性能三个方面，你会定哪些强制规则？",
    answer:
      "**模型与资源规范（强制）**：① **面数预算**——移动端：主角 ≤8000 三角面、NPC ≤4000、小怪 ≤2000、场景装饰 ≤500；PC 端放宽 2~3 倍；所有模型必须做 LOD，LOD0→LOD1 面数砍 50%，LOD2 再砍 50%；② **骨骼数量**——移动端角色骨骼数 ≤60（含武器/挂件挂点），面部骨骼如果单独控制不计入（但要单独评估）；必须使用 Optimize Game Objects，仅暴露必要挂点（如武器挂点、特效挂点、UI 挂点）；③ **材质数量**——单个角色材质球 ≤3 个（身体/头发/武器各一个），优先使用共享材质；④ **导入设置统一模板**——通过 AssetPostprocessor 或 ModelImporter 默认设置强制：Read/Write Enabled 关、Mesh Compression 按需、Optimize Mesh 开、Animation Compression 为 Optimal；不允许手动改 Rig 为 Legacy；⑤ **禁止从 DCC 导入 Cameras/Lights/空节点**——除非特殊需求并标注。\n\n**动画系统规范（强制）**：① **Animator 架构**——必须使用分层状态机+Blend Tree，禁止在代码中直接 Play/交叉淡入淡出单个 AnimationClip（统一通过参数驱动状态机）；② **Animator Culling Mode**——主角/关键 NPC=Cull Update Transforms，小怪/装饰=Cull Completely，禁止所有角色都用 Always Animate；③ **Animation Events 使用规范**——表现层（音效、特效、粒子）用 Animation Events；逻辑层（伤害判定、状态切换、位移）必须用 StateMachineBehaviour 或代码轮询 AnimatorStateInfo，禁止依赖 Animation Events 做逻辑；④ **Root Motion 决策**——需要精确位移同步的动作类游戏可以开启 Root Motion，但必须由代码将 Animator.deltaPosition 经 CharacterController/CharacterMovement 组件应用（方便网络同步和自定义重力），不要直接让 Animator 移动 Transform；MMO/MOBA 类统一用原地动画+代码驱动位移；⑤ **Animator.UpdateMode**——默认 Normal（跟随 Update），物理相关动画用 AnimatePhysics（跟随 FixedUpdate），UI 等不受 timeScale 影响的用 UnscaledTime。\n\n**运行时性能优化（强制）**：① **GPU Skinning 开启**——在 Player Settings 中开启 GPU Skinning（移动端支持 OpenGL ES3.0+/Vulkan/Metal 的设备），将蒙皮计算从 CPU 放到 GPU；② **Animator 组件数量控制**——同屏可见的蒙皮角色数量有预算（移动端建议 ≤20 个全精度角色，其余用 LOD/简化）；③ **动画更新频率优化**——距离摄像机超过一定阈值的角色，通过自定义代码降低 Animator 更新频率（如每 2~3 帧更新一次），或使用 Snapshot/顶点动画/Impostor Billboard；④ **骨骼挂点优化**——特效/武器挂点不要每帧 GetBoneTransform 查找，在 Awake 时缓存；⑤ **关闭不可见角色的 Animator**——Cull Completely 之外，对于确定长时间不可见的角色（如远离玩家的 NPC），通过距离判断主动 enabled=false；⑥ **Animator.StringToHash 缓存**——所有 Animator 参数名（Hash）在类静态字段中缓存，禁止 Update 中用字符串查询参数；⑦ **避免每帧 SetFloat/SetBool 相同值**——代码中先判断参数当前值是否变化再 Set，减少无效调用触发状态机重算；⑧ **Profile 红线**——SkinnedMeshRenderer.Update 和 Animator.Update 在 CPU Profiler 中合计占比不应超过 4ms（中端移动设备目标帧率 30fps），超过必须排查骨骼数/面数/同屏数量。\n\n主程的核心思路是：**用自动化的 AssetPostprocessor 和 Editor 检查脚本在资源导入阶段就拦下不规范的资源**，不要指望人工 Review 发现每个面数超标/骨骼超标的模型；运行时通过预算+LOD+距离剔除控制同屏开销，用 Profiler 数据验证而非想当然优化。",
    tags: ["主程决策", "技术规范", "角色优化", "动画系统", "性能预算", "AssetPostprocessor", "GPUSkinning"],
  },
];
