import type { ReviewQuestion } from "./types";

/** Unity 脚本设计全书复习 复习题 */
export const uscFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "usc-final-review-1",
    chapter: "usc-final-review",
    level: 1,
    question: `回顾全书，Unity 脚本生命周期的执行顺序是什么？`,
    answer: `初始化：Awake→OnEnable→Start。每帧循环：FixedUpdate→物理碰撞事件→Update→协程→LateUpdate→渲染。销毁：OnDisable→OnDestroy。Awake/Start/OnDestroy 只调用一次，OnEnable/OnDisable 每次启用/禁用都触发。Awake 初始化自身，Start 获取引用，Update 处理输入，FixedUpdate 处理物理，LateUpdate 处理相机跟随。`,
    tags: ["全书复习", "生命周期"],
  },
  {
    id: "usc-final-review-2",
    chapter: "usc-final-review",
    level: 2,
    question: `组件系统的核心原则是什么？GetComponent 如何优化使用？`,
    answer: `核心原则：组合优于继承——GameObject 挂载不同 Component 组合实现功能，而非深层继承链。GetComponent 优化：在 Awake/Start 中缓存引用（private Rigidbody _rb; void Awake() { _rb = GetComponent&lt;Rigidbody&gt;(); }），不在 Update 中每帧调用。跨对象用 SerializeField 拖拽引用或事件系统解耦，避免 FindObjectOfType。`,
    tags: ["组件系统", "全书复习"],
  },
  {
    id: "usc-final-review-3",
    chapter: "usc-final-review",
    level: 3,
    question: `协程、对象池、ScriptableObject 分别解决什么问题？`,
    answer: `协程解决跨帧异步执行问题——yield 指令暂停跨帧恢复，适合延迟操作和时序逻辑（技能释放序列），无需回调嵌套。对象池解决频繁创建销毁的 GC 问题——预创建复用，适合子弹/粒子等高频对象，避免运行时卡顿。ScriptableObject 解决数据共享和数据与逻辑分离问题——配置数据存为 .asset 资产，多个引用共享，Inspector 可编辑，改一处全部生效。`,
    tags: ["协程", "对象池", "ScriptableObject"],
  },
  {
    id: "usc-final-review-4",
    chapter: "usc-final-review",
    level: 4,
    question: `综合全书知识，设计一个中型游戏的脚本架构方案。`,
    answer: `1)架构分层：数据层（ScriptableObject 存配置，纯C#类存运行时数据）、逻辑层（MonoBehaviour 组件实现游戏逻辑，职责单一）、管理器层（单例 GameManager/AudioManager 管理全局，EventManager 用 SO 事件通道解耦）、表现层（分离视觉和逻辑）；2)核心机制：输入用新输入系统（InputAction 事件驱动），物理用 FixedUpdate+Rigidbody，异步用协程（技能序列/延迟操作），大量对象用对象池；3)设计模式：AI 用状态机（巡逻/追击/攻击），通信用观察者（C# event/UnityEvent），全局管理用单例（仅限真正的全局管理器）；4)原则：SOLID（单一职责/开闭原则/依赖倒置），组合优于继承，接口优于具体类型，事件优于直接调用。`,
    tags: ["综合", "架构设计", "全书复习"],
  },
];
