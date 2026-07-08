import type { ReviewQuestion } from "./types";

/** ScriptableObject 复习题 */
export const uscScriptableObjectsQuestions: ReviewQuestion[] = [
  {
    id: "usc-scriptable-objects-1",
    chapter: "usc-scriptable-objects",
    level: 1,
    question: "ScriptableObject 是什么？它和 MonoBehaviour 有什么区别？",
    answer: "ScriptableObject 是 Unity 的数据容器资产，存储在 .asset 文件中，可在 Inspector 编辑。区别：1)ScriptableObject 不挂载到 GameObject，是独立资产；2)多个 MonoBehaviour 引用同一 SO 时数据共享（内存只一份），MonoBehaviour 每实例独立数据；3)SO 适合配置数据（武器参数/角色属性），MonoBehaviour 适合运行时行为（移动/战斗）。",
    tags: ["ScriptableObject", "数据"],
  },
  {
    id: "usc-scriptable-objects-2",
    chapter: "usc-scriptable-objects",
    level: 2,
    question: "如何创建和使用 ScriptableObject？",
    answer: "1)定义：[CreateAssetMenu(menuName="Items/Weapon")] public class WeaponData : ScriptableObject { public string name; public int damage; public Sprite icon; }；2)创建：右键 Project → Create → Items → Weapon 生成 .asset 文件；3)使用：public class Weapon : MonoBehaviour { [SerializeField] WeaponData data; void Attack() { Debug.Log(data.damage); } }。SO 通过 SerializeField 引用，Inspector 拖拽绑定。",
    tags: ["创建", "使用", "ScriptableObject"],
  },
  {
    id: "usc-scriptable-objects-3",
    chapter: "usc-scriptable-objects",
    level: 3,
    question: "ScriptableObject 在编辑器模式和构建后的行为有什么区别？",
    answer: "编辑器模式：运行时修改 SO 的字段值会持久化到 .asset 文件——下次运行仍是修改后的值（可能导致测试时意外修改配置）。构建后（打包游戏）：SO 的字段值在内存中修改不会持久化——每次启动游戏从 .asset 加载原始值。因此：1)不要依赖运行时修改 SO 的持久化（打包后不生效）；2)编辑器中测试时注意 SO 被意外修改；3)运行时需要修改的数据应该复制一份到普通 C# 对象，不直接改 SO。",
    tags: ["编辑器", "构建", "持久化"],
  },
  {
    id: "usc-scriptable-objects-4",
    chapter: "usc-scriptable-objects",
    level: 4,
    question: "用 ScriptableObject 设计一个事件系统（Event Channel），实现模块间解耦通信？",
    answer: "1)定义事件资产：[CreateAssetMenu] public class GameEvent : ScriptableObject { UnityEvent&lt;object&gt; onRaised; public void Raise(object data=null) { onRaised?.Invoke(data); } }；2)发布者：[SerializeField] GameEvent onPlayerDied; 调用 onPlayerDied.Raise();；3)监听者：[SerializeField] GameEvent onPlayerDied; void OnEnable() { onPlayerDied.onRaised.AddListener(HandleDeath); } void OnDisable() { onPlayerDied.onRaised.RemoveListener(HandleDeath); }；4)在 Project 中创建 .asset 文件（如 PlayerDeathEvent），发布者和监听者都引用同一资产。优势：完全解耦——发布者和监听者互不知道对方，通过 SO 资产间接通信。场景切换不丢失引用（SO 是资产不在场景中）。",
    tags: ["事件系统", "解耦", "综合"],
  },
];
