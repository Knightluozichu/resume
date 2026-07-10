import type { ReviewQuestion } from "./types";

/** 数据持久化 复习题 */
export const usgDataPersistenceQuestions: ReviewQuestion[] = [
  {
    id: "usg-data-persistence-1",
    chapter: "usg-data-persistence",
    level: 1,
    question: `Unity 数据持久化的三种方案分别适合什么场景？`,
    answer: `PlayerPrefs 适合轻量设置数据（音量/最高分/语言选择）——键值对、简单类型、容量小。JSON 文件适合游戏存档（背包/任务进度/角色状态）——支持复杂嵌套对象、可跨平台持久化、写入 persistentDataPath。ScriptableObject 适合配置数据（武器参数/角色属性/关卡配置）——设计师在 Inspector 编辑、多对象共享、数据与逻辑分离。选择原则：轻量用 PlayerPrefs，存档用 JSON，配置用 ScriptableObject。`,
    tags: ["PlayerPrefs", "JSON", "ScriptableObject", "方案选择"],
  },
  {
    id: "usg-data-persistence-2",
    chapter: "usg-data-persistence",
    level: 2,
    question: `为什么不能用 PlayerPrefs 存储游戏存档？应该怎么做？`,
    answer: `PlayerPrefs 只支持 int/float/string 三种基本类型，不支持数组、列表、嵌套对象。强行用多个 key 拆分存储会导致数据碎片化、难以维护、容易出错。正确做法：复杂存档用 JSON 文件——定义 \`[Serializable]\` 存档类，用 \`JsonUtility.ToJson(data, true)\` 序列化为 JSON 字符串，用 \`File.WriteAllText(Application.persistentDataPath + \"/save.json\", json)\` 写入跨平台可写路径。读取用 \`File.ReadAllText\` + \`JsonUtility.FromJson\`。PlayerPrefs 只存轻量设置。`,
    tags: ["PlayerPrefs", "JSON存档", "persistentDataPath"],
  },
  {
    id: "usg-data-persistence-3",
    chapter: "usg-data-persistence",
    level: 3,
    question: `ScriptableObject 运行时修改的数据为什么重启后丢失？如何解决？`,
    answer: `ScriptableObject 是资产文件，在构建后的游戏中是只读的——运行时修改的字段值存在内存中，游戏退出后不会写回 .asset 文件（构建包内资产不可写）。如果需要运行时持久化配置数据（如玩家解锁的武器），仍需配合 JSON 文件保存到 persistentDataPath。ScriptableObject 的定位是「设计师编辑的静态配置」而非「玩家运行时动态数据」。正确做法：ScriptableObject 存静态配置（武器基础参数），JSON 存动态数据（玩家解锁状态），运行时从 JSON 加载覆盖 ScriptableObject 的运行时值。`,
    tags: ["ScriptableObject", "运行时持久化", "只读资产"],
  },
  {
    id: "usg-data-persistence-4",
    chapter: "usg-data-persistence",
    level: 4,
    question: `设计一个支持版本迁移的跨平台存档系统。`,
    answer: `1)定义 \`[Serializable] class GameSave\`，包含 \`int version\` 字段和所有需保存的数据（关卡/血量/位置/背包）。2)Save 时 \`JsonUtility.ToJson(data)\` 序列化，写入 \`Application.persistentDataPath + \"/save.json\"\`。3)Load 时先读 version，用 switch 做版本迁移：v1 的字段结构升级到 v2 时补默认值、重命名字段、转换格式。4)迁移完成后再 \`JsonUtility.FromJson<GameSave>\` 反序列化。5)文件不存在返回默认存档。6)异常处理：try-catch 包裹文件读写，损坏存档回退默认。7)多存档槽：文件名带槽位号 save_0.json。version 字段是版本迁移的关键，升级时递增并写迁移逻辑。`,
    tags: ["存档系统", "版本迁移", "跨平台", "综合"],
  },
];
