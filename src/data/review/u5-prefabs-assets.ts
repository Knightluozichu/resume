/** 复习题库 · 预制体与资源管线（u5-prefabs-assets）。《Unity 5 权威讲解》第12章改编。 */

import type { ReviewQuestion } from "./types";

export const u5PrefabsAssetsQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "u5-pa-1",
    chapter: "u5-prefabs-assets",
    level: 1,
    question: "什么是预制体（Prefab）？它最大的价值是什么？",
    answer:
      "**预制体（Prefab）**是把一个**配好组件 / 参数的 GameObject 存成的可复用模板资产**。用它能在场景里造出任意多个一致的**实例**（敌人、子弹、道具……）。它最大的价值是：**改一次模板，所有照它造的实例都同步更新**——不用挨个手动改每个实例。用片场的话：预制体就像一张「角色定妆卡 / 标准道具图纸」，照着量产一模一样的群演 / 道具。",
    tags: ["预制体", "Prefab", "模板", "定义"],
  },
  {
    id: "u5-pa-2",
    chapter: "u5-prefabs-assets",
    level: 1,
    question: "预制体「资产」和「实例」各在哪里？它们什么关系？",
    answer:
      "**预制体资产**在 **Project 里**（是模板）；**实例**在**场景的 Hierarchy 里**（是它的克隆体）。两者**保持联动**：默认情况下，改资产，所有实例同步跟着变。一个资产可以对应场景里任意多个实例。一句话：资产是模板、实例是照模板造出来的副本，且副本默认跟随模板。",
    tags: ["资产", "实例", "instance", "定义"],
  },
  {
    id: "u5-pa-3",
    chapter: "u5-prefabs-assets",
    level: 1,
    question: "预制体实例的「覆盖（Override）」是什么意思？",
    answer:
      "**覆盖（Override）**指：单独修改某一个**实例**的某个属性（比如把这一个敌人的血量调高）。被覆盖的那个属性就**脱开资产、不再跟随**——以后资产再改这个属性，这个实例也不会跟着变（但它其它没被覆盖的属性仍跟随资产）。用片场的话：某个群演单独改了发型，就是一个 override。",
    tags: ["覆盖", "Override", "脱钩", "定义"],
  },
  {
    id: "u5-pa-4",
    chapter: "u5-prefabs-assets",
    level: 1,
    question: "在预制体实例上 **Apply** 和 **Revert** 各是做什么的？",
    answer:
      "**Apply**：把这个**实例的改动「推回」预制体资产**——相当于「以这个实例为准更新模板」，会**影响所有跟随该资产的实例**。**Revert**：**撤销这个实例的改动、回到资产当前的状态**（丢弃实例上的 override）。一句话：Apply = 实例 → 资产（影响全体）；Revert = 资产 → 实例（丢弃本实例改动）。",
    tags: ["Apply", "Revert", "推回资产", "定义"],
  },
  {
    id: "u5-pa-5",
    chapter: "u5-prefabs-assets",
    level: 1,
    question: "什么是资源的 GUID？它存在哪里？",
    answer:
      "**GUID（全局唯一 ID）**是 Unity 给每个资源分配的一个**全局唯一标识符**。Unity 为 **Assets/** 下的每个资源都生成一个**同名 .meta 文件**（如 `slime.png.meta`），GUID 和该资源的**导入设置**就存在这个 .meta 文件里。Unity 内部**靠 GUID 来引用资源，而不是靠文件路径**。",
    tags: ["GUID", ".meta", "唯一ID", "定义"],
  },
  {
    id: "u5-pa-6",
    chapter: "u5-prefabs-assets",
    level: 1,
    question: '`Resources.Load("路径")` 是做什么的？它加载的资源放在哪里？',
    answer:
      '`Resources.Load("路径")` 是在**运行时按路径字符串加载资源**的方法。它**只能加载放在名为 `Resources/` 的文件夹下**的资源（路径相对于 Resources 文件夹、不写扩展名）。例如 `Resources.Load<GameObject>("Enemies/Slime")` 加载 `Assets/Resources/Enemies/Slime.prefab`。注意它**要慎用**（见相关辨析题）。',
    tags: ["Resources.Load", "运行时加载", "Resources文件夹", "定义"],
  },
  {
    id: "u5-pa-7",
    chapter: "u5-prefabs-assets",
    level: 1,
    question: "Unity 里有哪几个「特殊文件夹」？各是干什么的？",
    answer:
      '几个常见的特殊文件夹：**Resources/**——里面的资源可在运行时用 `Resources.Load("路径")` 按路径加载；**StreamingAssets/**——里面的文件**原样打包**，运行时按文件路径直接读（如配置、视频）；**Editor/**——只在编辑器里编译运行的代码（不会进最终包）；**Plugins/**——放原生 / 第三方插件。另外还有 **AssetBundle**（不是文件夹，而是按需下载 / 分发的资源包，用来做 DLC / 热更）。',
    tags: ["特殊文件夹", "Resources", "StreamingAssets", "Editor", "定义"],
  },
  {
    id: "u5-pa-8",
    chapter: "u5-prefabs-assets",
    level: 1,
    question:
      "Unity 5 支持「嵌套预制体（Nested Prefab）」和「预制体变体（Prefab Variant）」吗？",
    answer:
      "**不支持。** 嵌套预制体和预制体变体是 Unity **2018.3** 才引入的。Unity 5 用的是**经典（扁平）预制体**模型：实例 + 覆盖（override）+ Apply / Revert，预制体里**不能再嵌套另一个预制体作为可独立维护的预制体**。本章只讲 Unity 5 的扁平预制体工作流。",
    tags: ["嵌套预制体", "扁平预制体", "版本差异", "定义"],
  },

  // ── L2 理解：辨析 / 关系 ──
  {
    id: "u5-pa-9",
    chapter: "u5-prefabs-assets",
    level: 2,
    question:
      "改了「预制体资产」和改了「某个实例的属性」，影响范围有什么不同？",
    answer:
      "**改资产**：所有**跟随该资产**的实例都**同步更新**（没被覆盖的属性都跟着变）——这是预制体的核心价值。**改某个实例的属性**：只产生一个 **override**，**只影响这一个实例**，且被改的属性从此**脱开资产**、不再跟随。一句话：想影响全体就改资产（或对实例 Apply）；想只改一个不影响别人，就保持实例 override 别 Apply。",
    tags: ["资产", "实例", "覆盖", "辨析"],
  },
  {
    id: "u5-pa-10",
    chapter: "u5-prefabs-assets",
    level: 2,
    question:
      "在 Unity 里给一个资源**改名**或**移动位置**，引用它的地方会断吗？为什么？",
    answer:
      "**不会断**（前提是 .meta 跟着资源一起走）。因为 Unity **引用靠 GUID，不靠路径**——改名 / 移动只改变了文件路径，但 .meta 里的 **GUID 没变**，所有引用记的都是 GUID，于是照样能找到。**例外**：如果在 Unity 外面（比如系统资源管理器）移动文件、把 .meta **落下了**，或 .meta 丢失，GUID 就没了——引用会断、Unity 重新导入会分配新 GUID。所以一定要让 .meta 跟资源一起移动、一起进版本控制。",
    tags: ["GUID", "改名", "引用", "辨析"],
  },
  {
    id: "u5-pa-11",
    chapter: "u5-prefabs-assets",
    level: 2,
    question:
      "拿到一个对象 / 资源有「Inspector 拖引用」「Instantiate」「Resources.Load」三条路，各适合什么场景？",
    answer:
      '**① Inspector 拖引用**（`[SerializeField]`）：在**编辑期就把对象 / 预制体绑好**，零运行时查找、最快最稳——**首选**。**② Instantiate 预制体**：**运行时按模板复制出新实例**（生成子弹、敌人、特效），复制源通常已用拖引用绑好。**③ `Resources.Load("路径")`**：**运行时按路径字符串加载** Resources/ 下的资源——适合「编译期不知道要哪个、运行时才决定」的少量资源，但**慎用**（见下题）。',
    tags: ["拖引用", "Instantiate", "Resources.Load", "辨析"],
  },
  {
    id: "u5-pa-12",
    chapter: "u5-prefabs-assets",
    level: 2,
    question: "为什么官方建议**慎用 Resources**？它有哪些代价？",
    answer:
      "因为 `Resources/` 文件夹里的资源有几个硬伤：① **全部进包**——不管运行时用不用得到，整个 Resources 都会被打进最终包，**无法被裁剪**（构建剥离用不到的资源时跳过 Resources）；② **拖慢启动**——Resources 的索引在启动时构建，资源越多启动越慢、内存越大；③ 失去显式依赖管理。所以官方建议**少用 Resources**，需要按需加载 / 分发的大资源应改用 **AssetBundle**。",
    tags: ["Resources", "包体膨胀", "AssetBundle", "辨析"],
  },
  {
    id: "u5-pa-13",
    chapter: "u5-prefabs-assets",
    level: 2,
    question: "Apply 和 Revert 的方向正好相反，怎么记不混？",
    answer:
      "记「箭头方向」：**Apply = 实例 → 资产**（把实例上的改动**推回**模板，影响所有跟随的实例）；**Revert = 资产 → 实例**（把资产**当前状态拉回**这个实例，**丢弃**实例上的 override）。一句话口诀：**Apply 影响全体（往模板推），Revert 只还原自己（丢本实例改动）**。",
    tags: ["Apply", "Revert", "方向", "辨析"],
  },

  // ── L3 应用：用法 / 排错 ──
  {
    id: "u5-pa-14",
    chapter: "u5-prefabs-assets",
    level: 3,
    question:
      "你改了场景里某个预制体实例的属性，结果预制体资产**没跟着变**，其它实例也没变。为什么？想让全体都生效该怎么做？",
    answer:
      "因为改实例属性**只在那个实例上产生了一个 override（覆盖）**，默认**不会**回写到资产，所以资产和其它实例都不变——这是预期行为（覆盖就是为了让单个实例与众不同）。**想让全体都生效**有两条路：① 直接**在预制体资产上改**那个属性（双击进预制体 / 在 Project 选中资产改）；② 在这个实例上点 **Apply**，把改动**推回资产**，资产更新后其它跟随的实例就都跟着变了。",
    tags: ["override", "Apply", "全体生效", "排错"],
  },
  {
    id: "u5-pa-15",
    chapter: "u5-prefabs-assets",
    level: 3,
    question:
      "团队协作时，有人 push 后，别人拉下来发现预制体上拖好的引用全断了 / 资源被重新导入。最可能是什么原因？怎么避免？",
    answer:
      "最可能是 **.meta 文件没被纳入版本控制**（被 .gitignore 忽略了，或没一起提交）。引用靠 GUID，GUID 存在 .meta 里——别人拉下来没有 .meta，Unity 就会**重新导入资源、分配新的 GUID**，于是所有按旧 GUID 的引用全部对不上、断掉。**避免**：① 在 Project Settings → Editor 里把 **Version Control 设为 Visible Meta Files**；② **把所有 .meta 一起提交**（不要 ignore 掉 .meta）；③ 移动 / 改名资源在 Unity 里做，让它连 .meta 一起处理。",
    tags: [".meta", "版本控制", "引用断", "排错"],
  },
  {
    id: "u5-pa-16",
    chapter: "u5-prefabs-assets",
    level: 3,
    question:
      "写一段脚本：在运行时用 `Resources.Load` 加载一个预制体并 Instantiate 出来。代码怎么写？要注意什么？",
    answer:
      '把预制体放在 `Assets/Resources/` 下（如 `Assets/Resources/Enemies/Slime.prefab`），然后：\n```csharp\n// 按路径加载（相对 Resources 文件夹、不写扩展名），泛型版直接返回 GameObject\nGameObject prefab = Resources.Load<GameObject>("Enemies/Slime");\nif (prefab != null)\n{\n    Instantiate(prefab, transform.position, Quaternion.identity);\n}\n```\n注意：① 路径相对于 **Resources/**、**不带扩展名**；② 加载失败（路径错 / 资源不在 Resources 下）会返回 **`null`**，要判空；③ **Resources 慎用**——能在编辑期 `[SerializeField]` 拖引用就别用 Resources.Load。',
    tags: ["Resources.Load", "Instantiate", "代码", "应用"],
  },
  {
    id: "u5-pa-17",
    chapter: "u5-prefabs-assets",
    level: 3,
    question:
      "你想让「这一个敌人血量比其它同种敌人高」，又不想影响别的敌人。该怎么操作？要不要 Apply？",
    answer:
      "直接在场景里**选中这一个敌人实例，改它的血量属性**即可——这会在该实例上产生一个 **override（覆盖）**，**只影响这一个**，它的血量从此脱开资产、不跟随。**绝对不要 Apply**：Apply 会把这个高血量**推回预制体资产**，结果**所有同种敌人都变成高血量**。口诀：想让一个与众不同 → 保持实例 override、别 Apply；想让全体都变 → 改资产或 Apply。",
    tags: ["override", "不Apply", "单体差异", "应用"],
  },
  {
    id: "u5-pa-18",
    chapter: "u5-prefabs-assets",
    level: 3,
    question:
      "代码里要造一个子弹实例，最推荐怎么拿到子弹预制体这个「复制源」？写出关键片段。",
    answer:
      '最推荐**在编辑期用 `[SerializeField]` 拖引用**绑好预制体，而不是运行时 `Resources.Load`：\n```csharp\npublic class Gun : MonoBehaviour\n{\n    // 在 Inspector 里把子弹预制体拖进这个槽（编译期绑定）\n    [SerializeField] private GameObject bulletPrefab;\n\n    public void Fire()\n    {\n        Instantiate(bulletPrefab, transform.position, transform.rotation);\n    }\n}\n```\n要点：`[SerializeField]` 让私有字段出现在 Inspector，运行前把预制体拖进去——零运行时查找、最快最稳；`Instantiate(模板, 位置, 朝向)` 照它复制实例。比 `Resources.Load("路径")` 更优（不进 Resources、可被裁剪、无路径字符串易错）。',
    tags: ["SerializeField", "Instantiate", "拖引用", "应用"],
  },

  // ── L4 综合：贯通 / 迁移 ──
  {
    id: "u5-pa-19",
    chapter: "u5-prefabs-assets",
    level: 4,
    question:
      "你要做一个「敌人」系统：场景里刷很多个一致的敌人，但其中一个 Boss 要更大更红；同时要支持运行时按波次生成；还在团队里协作。请把预制体（资产↔实例 / override / Apply）、加载方式、版本控制串一遍。",
    answer:
      "按「模板 + 实例 + 联动」这条主线落地：\n**① 做预制体资产**：把配好组件 / 参数（血量、AI、Renderer、Collider……）的敌人 GameObject 存成**预制体资产**（模板）。以后改模板，所有实例同步更新。\n**② 普通敌人 = 实例**：往场景拖出多个实例，它们都**跟随资产**，保持一致；要统一调整（比如全体加血）就**改资产**，全场敌人一起变。\n**③ Boss = 实例 override**：拖出一个实例，单独把它的体型 / 颜色调大调红——这是**覆盖（override）**，**只影响这一个**，**别 Apply**（Apply 会把 Boss 的样子推回资产、连累所有普通敌人）。\n**④ 运行时按波次生成**：用 `[SerializeField] GameObject enemyPrefab;` **编辑期拖引用**绑好预制体，运行时 `Instantiate(enemyPrefab, pos, rot)` 造实例——**优先拖引用**，少用 `Resources.Load`（全进包、拖慢启动）。\n**⑤ 团队协作**：所有资源（含预制体）**靠 GUID 引用**，GUID 存在 .meta 里——**把 .meta 一起提交进版本控制**（Visible Meta Files），否则别人拉下来重新导入、GUID 变了、引用全断。\n**贯穿原则**：一致的批量对象用预制体（改模板影响全体）；个别差异用实例 override（别 Apply）；拿复制源优先编辑期拖引用；.meta 必须进版本控制。\n（注意：Unity 5 是**扁平预制体**，没有嵌套预制体 / 变体——那是 2018.3 之后才有的。）",
    tags: ["综合", "预制体", "override", "Instantiate", ".meta", "迁移"],
  },
];
