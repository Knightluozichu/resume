import type { ReviewQuestion } from "./types";

/** MonoBehaviour 基础 复习题 */
export const uscMonoBasicsQuestions: ReviewQuestion[] = [
  {
    id: "usc-mono-basics-1",
    chapter: "usc-mono-basics",
    level: 1,
    question: `Awake 和 Start 的区别是什么？分别在什么时候调用？`,
    answer: `Awake 在对象创建时调用（实例化后立即），无论脚本是否启用。Start 在对象启用后、第一帧 Update 之前调用。区别：Awake 用于初始化自身状态，Start 用于获取其他组件引用（因为其他对象的 Awake 已执行完）。如果脚本初始禁用，Awake 仍会调用，Start 不会——直到启用时才调用 Start。`,
    tags: ["Awake", "Start", "生命周期"],
  },
  {
    id: "usc-mono-basics-2",
    chapter: "usc-mono-basics",
    level: 2,
    question: `Update、FixedUpdate、LateUpdate 分别用于什么场景？`,
    answer: `Update 每帧调用，用于处理输入和游戏逻辑（帧率波动时执行频率变化）。FixedUpdate 按固定时间步调用（默认 0.02s），用于物理计算（Rigidbody 操作），保证物理模拟稳定。LateUpdate 在所有 Update 之后调用，用于跟随相机（确保相机在角色移动后才更新位置）和后处理逻辑。`,
    tags: ["Update", "FixedUpdate", "LateUpdate"],
  },
  {
    id: "usc-mono-basics-3",
    chapter: "usc-mono-basics",
    level: 3,
    question: `为什么推荐用 [SerializeField] private 替代 public 字段？`,
    answer: `1)封装性：private 字段不能被其他脚本直接访问，防止外部意外修改内部状态。2)Inspector 可编辑：[SerializeField] 让 private 字段在 Inspector 中显示，保留编辑能力。3)API 清晰：public 意味着「对外接口」，字段不应该是接口。4)重构友好：private 字段重命名不影响其他脚本。原则：数据用 [SerializeField] private，对外暴露用 public 属性（get/set）。`,
    tags: ["SerializeField", "封装", "最佳实践"],
  },
  {
    id: "usc-mono-basics-4",
    chapter: "usc-mono-basics",
    level: 4,
    question: `一个对象池系统需要在生成时初始化、回收时重置，如何设计生命周期管理？`,
    answer: `1)生成时：Instantiate 创建对象，Awake 初始化自身状态（hp/maxAmmo 等），OnEnable 激活对象并重置运行时数据（位置/速度/效果）；2)回收时：OnDisable 禁用对象（SetActive(false)）而非 Destroy，清理临时状态（停止协程/重置动画），但不销毁对象；3)再次取出：OnEnable 再次触发，重置数据后投入使用。关键：不要在 OnDisable 中 Destroy，否则对象池失去意义。用 Awake 做一次性初始化，OnEnable/OnDisable 做每次使用/回收的重置。池管理器维护空闲队列和活跃队列。`,
    tags: ["对象池", "生命周期", "综合"],
  },
];
