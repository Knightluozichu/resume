/** 复习题库 · 数据表与程序（unity-advanced-data-table）。《Unity3D高级编程：主程手记》第3章。 */

import type { ReviewQuestion } from "./types";

export const unityAdvancedDataTableQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "ua-dt-1",
    chapter: "unity-advanced-data-table",
    level: 1,
    question: "什么是「数据驱动」（Data-Driven）？和「硬编码」（Hard-Code）有什么区别？",
    answer:
      "**数据驱动**是指游戏的行为参数、配置、数值等不写死在代码里，而是放在外部数据表（Excel/CSV/JSON/ScriptableObject）中，程序在运行时读取数据来决定行为——策划改数值不需要改代码、不需要重新编译，改表重启/热更即可。**硬编码**是指把数值和逻辑直接写在 C# 代码里（如 `if (level >= 10) reward = 1000`），每改一个数值都要改代码、走编译打包流程，效率极低且容易出错。数据驱动的核心收益是**策划和程序解耦**——策划负责调数值，程序负责提供机制，互不阻塞。",
    tags: ["数据驱动", "硬编码", "配置", "策划", "解耦"],
  },
  {
    id: "ua-dt-2",
    chapter: "unity-advanced-data-table",
    level: 1,
    question: "导表流程（Export Pipeline）通常包含哪些步骤？",
    answer:
      "标准导表流程：① **策划填表**——在 Excel（或在线表格如腾讯文档/飞书）中按规范填写配置，每行一条记录，每列一个字段，第一行列名/类型；② **导出中间格式**——导表工具读取 Excel，导出为 CSV/JSON/二进制中间文件（也可直接生成 ScriptableObject）；③ **校验**——导表工具对数据做合法性校验：类型检查、ID 唯一性、外键引用是否存在、数值范围、必填字段是否为空；④ **生成代码**——根据表结构自动生成对应的 C# 数据类（如 ItemConfig 类，每个字段对应一列）和 ID 常量/枚举；⑤ **打包进游戏**——将生成的数据文件（ScriptableObject/JSON/二进制）放到 Resources/Addressables/StreamingAssets 中，构建时打入包体；⑥ **运行时加载**——游戏启动时加载配置表到内存字典，业务代码通过 ID 查询。",
    tags: ["导表流程", "Excel", "导表工具", "配置校验", "数据加载"],
  },

  // ── L2 理解：为什么 / 区别 ──
  {
    id: "ua-dt-3",
    chapter: "unity-advanced-data-table",
    level: 2,
    question: "ScriptableObject 和 JSON/CSV 作为配置载体，各有什么优劣？",
    answer:
      "**ScriptableObject**：优势——① Unity 原生支持，Inspector 可直接预览和编辑；② 序列化效率高，二进制存储加载快；③ 可以直接引用其他 Unity 对象（Prefab、Sprite、AudioClip 等），不需要额外的地址映射；④ 支持自定义数据结构、嵌套类型、数组；⑤ 可以加 Editor 扩展做可视化编辑。劣势——① 必须在 Unity Editor 下生成，不方便策划用 Excel 批量编辑；② 版本管理上 YAML 文本格式对表格类数据 diff 不友好；③ 不适合热更（但可以通过 Addressables 远程下载解决）。**JSON/CSV**：优势——① 格式简单通用，策划可以用 Excel 编辑后导出，也可以用文本工具快速批量修改；② 易于做热更新（从服务器下载新 JSON）；③ 版本 diff 清晰。劣势——① 不能直接引用 Unity 资源，需要写一套资源路径→对象的映射层；② 加载时需要反序列化，启动速度慢于 ScriptableObject；③ 类型安全较弱（JSON 字段是弱类型，需要额外的解析和校验）；④ 二进制打包和压缩需要额外处理。**工程实践**：主程通常会做组合方案——策划在 Excel 编辑，导表工具同时生成 ScriptableObject（运行时用）+ JSON（热更备用），或全部转成 ScriptableObject 通过 Addressables 热更。",
    tags: ["ScriptableObject", "JSON", "CSV", "配置", "热更新", "资源引用"],
  },
  {
    id: "ua-dt-4",
    chapter: "unity-advanced-data-table",
    level: 2,
    question: "为什么导表流程必须有「配置校验」环节？校验至少要覆盖哪些维度？",
    answer:
      "配置错误是线上 Bug 的重灾区——策划配错一个 ID、漏填一个字段、配了一个不存在的外键，在游戏里可能表现为装备消失、关卡卡死、甚至崩溃。配置校验就是要在**导表阶段（打包前/提交前）就把错误拦下来**，而不是等到玩家跑游戏才发现。校验维度至少包括：① **类型校验**——数字字段填了非数字字符串、枚举字段填了不存在的枚举名；② **ID 唯一性**——同一张表的主键 ID 不能重复；③ **外键引用完整性**——A 表引用的 B 表 ID 在 B 表中必须存在（如装备的 buffId 必须在 buff 表中存在）；④ **必填字段**——标记了 required 的字段不能为空；⑤ **数值范围**——概率字段 0~1、等级字段不超过上限等；⑥ **跨表逻辑校验**——如物品售价不能低于商店回收价、技能冷却不能为负数；⑦ **资源存在性**——配置中引用的图片/Prefab/音效路径必须在项目中存在。校验失败时导表工具应打印清晰的错误信息（表名、行号、列名、错误原因）并中止导出。",
    tags: ["配置校验", "导表工具", "数据验证", "外键", "错误拦截"],
  },
  {
    id: "ua-dt-5",
    chapter: "unity-advanced-data-table",
    level: 2,
    question: "游戏中的多语言（本地化）通常怎么通过数据表实现？",
    answer:
      "多语言的标准方案：① **Key-Value 文本表**——所有 UI 文本、对话、提示语都用一个唯一的 Key（如 `UI_BAG_TITLE`、`ITEM_SWORD_NAME`）标识，多语言表中每个 Key 对应多种语言的翻译（列：Key / zh-CN / en-US / ja-JP ...）；② **文本不硬编码**——代码和 Prefab 中绝不出现用户可见的中文字符串，统一通过 `LocalizationMgr.Get(\"UI_BAG_TITLE\")` 或组件绑定 Key 获取；③ **切换语言**——运行时根据语言设置读取对应列的值，切换语言时广播事件通知所有 UI 刷新文本；④ **图片/声音多语言**——带文字的图片（如按钮上的「开始」）可以按语言分文件夹存放，通过资源加载器按当前语言加载对应版本；⑤ **字体适配**——不同语言可能需要不同字体（如中文用宋体/黑体，英文用 Arial，泰语需要特殊字体），字体也需要按语言配置；⑥ **多语言校验**——检查哪些 Key 在某些语言下缺失翻译，避免出现空白或显示 Key 名。工程上通常用 SmartLocalization、Unity Localization Package 或自研方案。",
    tags: ["多语言", "本地化", "i18n", "文本表", "Key-Value"],
  },

  // ── L3 应用：设计实践 ──
  {
    id: "ua-dt-6",
    chapter: "unity-advanced-data-table",
    level: 3,
    question: "设计一个导表工具时，你会怎么规划其架构和关键模块？",
    answer:
      "导表工具是项目基础建设，需要稳定、可扩展。关键模块：① **读取层**——用 EPPlus/NPOI（C#）或 Python 的 openpyxl 读取 Excel 文件，支持多个 sheet，每个 sheet 对应一张表；② **规则解析层**——读取表的「元数据行」：列名、类型（int/float/string/bool/enum/数组）、是否必填、范围约束、外键指向哪张表的哪个字段——通常约定第 2~3 行是类型/规则行；③ **数据校验层**——实现一组校验器（RequiredValidator、UniqueValidator、RefValidator、RangeValidator、RegexValidator 等），采用链式/责任链模式逐行逐列校验，收集所有错误统一输出（而不是遇到第一个错误就停）；④ **代码生成层**——根据表结构用模板引擎（如 T4、Scriban、StringTemplate）生成 C# 数据类（partial class，字段带类型）、ID 常量类、表管理类的骨架，生成的代码标注 `[GeneratedCode]` 不要手改；⑤ **导出层**——支持多种输出格式：ScriptableObject（二进制序列化）、JSON（热更用）、二进制自定义格式（极致加载速度），输出到指定目录；⑥ **CI 集成**——作为命令行工具集成到 Jenkins/GitLab CI，策划提交 Excel 后自动跑导表和校验，校验不通过不允许合入；⑦ **Editor 集成**——在 Unity 菜单中提供「一键导表」按钮，开发时不用切出 Unity。技术选型上，Python 导表工具开发快、跨平台，C# 导表工具可以直接利用 Unity API 生成 ScriptableObject，各项目根据团队技术栈选择。",
    tags: ["导表工具", "工具设计", "校验器", "代码生成", "CI"],
  },
  {
    id: "ua-dt-7",
    chapter: "unity-advanced-data-table",
    level: 3,
    question: "运行时配置管理器（ConfigManager）应该怎么设计？如何保证查询性能和内存占用？",
    answer:
      "ConfigManager 的设计要点：① **单例或静态入口**——游戏中全局唯一，启动时统一加载所有配置表（或按需懒加载大表）；② **按表存储 Dictionary**——每张表加载后存为 `Dictionary<IdType, ConfigType>`（如 `Dictionary<int, ItemConfig>`），以主键 ID 为 key 提供 O(1) 查询；③ **提供索引能力**——对于需要按非主键字段查询的场景（如「按品质查所有装备」），在加载时构建二级索引 `Dictionary<Quality, List<ItemConfig>>`，避免运行时反复遍历；④ **不可变设计**——配置加载后整个表是只读的，不允许运行时修改（如需运行时修改玩家数据，那是存档数据不是配置数据，两者分开）；⑤ **内存优化**——字符串使用 intern 机制（`string.Intern` 避免重复字符串多份拷贝）；大数组字段用 `readonly` 避免修改；不用的表可以懒加载或按需卸载（但大部分游戏配置全加载内存可接受，现代手游几百张表通常也就几十 MB）；⑥ **热更支持**——支持从远程下载新配置覆盖本地配置，下载后重新构建索引；⑦ **线程安全**——加载时可能在后台线程反序列化，读取在主线程，保证加载完成后只读无需加锁；⑧ **调试接口**——Editor 下提供配置查询窗口，方便策划/程序查配置。",
    tags: ["ConfigManager", "配置管理", "Dictionary", "索引", "内存", "热更"],
  },

  // ── L4 主程视角 ──
  {
    id: "ua-dt-8",
    chapter: "unity-advanced-data-table",
    level: 4,
    question: "项目中策划频繁抱怨「改个数值还要找程序」，程序频繁抱怨「策划配错表导致线上 Bug」。作为主程你会怎么从流程和工具上解决这对矛盾？",
    answer:
      "这是典型的效率 vs 质量的矛盾，主程需要从工具、流程、规范三管齐下：**工具层（降低策划操作门槛）**：① 做一套好用的导表工具+配置编辑器——不是让策划填冰冷的 Excel，而是在 Unity 里做可视化配置窗口（类似 Inspector 的定制面板），支持下拉选择（枚举/外键直接选而不是填 ID）、预览效果（配置个技能就能在窗口里看到技能特效预览）、实时校验提示；② 导表工具在策划保存 Excel 时自动在后台跑校验，错误立刻标红提示，不等到打包才发现；③ 提供「改表立即生效」的开发模式——Editor 下监听 Excel 文件变化自动重新导入，不用重启游戏就能看到新数值。**流程层（保证质量）**：① 配置表走 Git/版本管理，策划通过 MR/PR 提交配置，程序 Code Review 配置变更（重点关注逻辑相关的字段）；② CI 流水线自动跑导表+校验+启动冒烟测试，校验不通过/测试挂了直接禁止合入；③ 关键配置（如付费相关、核心数值）设置需要高级策划/数值策划审批才能合入。**规范层（划清边界）**：① 程序负责「机制」——代码里只写逻辑，不写数值，所有可调参数必须上表；② 策划负责「数值」——表的结构（列名/类型/约束）由程序定义，表的数据（行内容）由策划填，改结构需要双方沟通；③ 配置表写注释列说明每个字段的含义、取值范围、默认值，减少策划理解错误。核心思想是**用工具把能自动化的全自动化，用流程把不能自动化的风险点卡住**，让策划高效填表的同时不让错误配置流到线上。",
    tags: ["主程决策", "工具链", "流程", "策划协作", "配置管理", "CI"],
  },
];
