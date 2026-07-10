import type { ReviewQuestion } from "./types";

/** C# 语法基础与 Unity 脚本 复习题 */
export const usgCsharpBasicsQuestions: ReviewQuestion[] = [
  {
    id: "usg-csharp-basics-1",
    chapter: "usg-csharp-basics",
    level: 1,
    question: `C# 中值类型和引用类型的区别是什么？`,
    answer: `值类型（int/float/struct/Vector3）直接存储数据，赋值时拷贝数据副本——修改副本不影响原值。引用类型（class/string/数组）存储引用（地址），赋值时拷贝引用——两个变量指向同一个对象，修改任一都影响对方。`,
    tags: ["值类型", "引用类型", "C#基础"],
  },
  {
    id: "usg-csharp-basics-2",
    chapter: "usg-csharp-basics",
    level: 2,
    question: `为什么推荐用 [SerializeField] private 而非 public 暴露字段到 Inspector？`,
    answer: `public 字段虽然 Inspector 可编辑，但破坏封装——其他脚本可直接读写，字段改名后所有引用都要改，且无法加入校验逻辑。\`[SerializeField] private\` 让字段在 Inspector 可编辑（满足配置需求），但代码内是私有的（外部不能直接访问），兼顾可配置性与封装性。需要外部访问时用属性（property）封装，可在 getter/setter 加校验。`,
    tags: ["SerializeField", "封装", "最佳实践"],
  },
  {
    id: "usg-csharp-basics-3",
    chapter: "usg-csharp-basics",
    level: 3,
    question: `为什么不能用 new 实例化 MonoBehaviour？应该怎么做？`,
    answer: `MonoBehaviour 只能通过 \`AddComponent\` 或 Inspector 挂载创建，不能用 \`new\`。Unity 内部需要管理组件的生命周期和序列化，\`new\` 出来的对象脱离引擎管理，生命周期回调（Awake/Start/Update）不会触发，序列化字段也不会正确初始化。正确做法：\`gameObject.AddComponent<PlayerController>()\`，或在 Inspector 直接把脚本拖到 GameObject 上。`,
    tags: ["MonoBehaviour", "实例化", "生命周期"],
  },
  {
    id: "usg-csharp-basics-4",
    chapter: "usg-csharp-basics",
    level: 4,
    question: `设计一个 Unity 武器系统，如何用 C# 类继承和 ScriptableObject 配合实现可扩展的武器配置？`,
    answer: `1)定义 ScriptableObject \`WeaponConfig\` 存配置（名称/伤害/射速/预制体），用 \`[CreateAssetMenu]\` 创建 .asset 文件，设计师在 Inspector 编辑。2)定义 MonoBehaviour \`Weapon\` 基类引用 \`WeaponConfig\`，提供 virtual \`Fire()\` 方法。3)派生 \`RangedWeapon : Weapon\`（远程射击）和 \`MeleeWeapon : Weapon\`（近战挥砍），override \`Fire()\` 实现各自逻辑。4)运行时多个 Weapon 组件引用不同 config 实现不同武器，改配置不改代码。这样数据（ScriptableObject）与逻辑（类继承）分离，新增武器只需创建 .asset 文件，符合开闭原则。`,
    tags: ["ScriptableObject", "继承", "架构设计"],
  },
];
