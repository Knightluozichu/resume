import type { ReviewQuestion } from "./types";

/** Unity 组件系统 复习题 */
export const uscComponentSystemQuestions: ReviewQuestion[] = [
  {
    id: "usc-component-system-1",
    chapter: "usc-component-system",
    level: 1,
    question: "Unity 组件系统的核心思想是什么？",
    answer: "组合优于继承。GameObject 是空容器，挂载不同 Component 实现不同功能。一个玩家对象 = Transform + Rigidbody + Collider + PlayerMovement + Health + Inventory。功能通过组合组件实现，而非深层继承链。新增功能只需添加组件，修改功能只需替换组件，不影响其他部分。",
    tags: ["组件系统", "组合"],
  },
  {
    id: "usc-component-system-2",
    chapter: "usc-component-system",
    level: 2,
    question: "GetComponent 的性能特点是什么？如何优化？",
    answer: "GetComponent 每次调用都遍历组件列表查找，有一定开销。优化方法：1)在 Awake/Start 中缓存引用——private Rigidbody _rb; void Awake() { _rb = GetComponent&lt;Rigidbody&gt;(); }；2)避免在 Update 中每帧 GetComponent；3)批量获取用 GetComponents&lt;T&gt;() 一次取全部；4)跨对象用 SerializeField 直接拖拽引用，避免运行时查找。缓存引用是基本规范。",
    tags: ["GetComponent", "性能", "缓存"],
  },
  {
    id: "usc-component-system-3",
    chapter: "usc-component-system",
    level: 3,
    question: "组件之间如何通信？有哪几种方式？",
    answer: "三种方式：1)GetComponent——同对象组件直接获取引用调用方法，耦合度高但简单直接；2)FindObject 系列——跨对象查找，FindObjectOfType 性能差应避免在 Update 中使用，可用 SerializeField 拖拽或单例模式替代；3)事件系统——UnityEvent 或 C# event，发布者不关心谁监听，监听者不关心谁发布，解耦最佳。推荐：同对象用 GetComponent 缓存引用，跨对象用事件系统解耦。",
    tags: ["组件通信", "事件", "解耦"],
  },
  {
    id: "usc-component-system-4",
    chapter: "usc-component-system",
    level: 4,
    question: "设计一个角色系统，角色需要移动、战斗、背包、技能、对话功能，如何拆分组件？",
    answer: "按职责拆分：1)CharacterMovement——处理输入到移动（Rigidbody/CharacterController），只管移动；2)CharacterCombat——处理攻击/受击/伤害计算，通过事件通知 Health；3)Health——管理血量/死亡/复活，通过事件通知 UI 和 Combat；4)Inventory——管理物品/装备，独立于战斗；5)SkillSystem——管理技能冷却/释放，通过事件通知 Combat 执行伤害；6)DialogueTrigger——对话触发器，独立于其他系统。通信：Combat→Health 用事件（OnDamaged），Health→UI 用 UnityEvent，Skill→Combat 用方法调用（缓存引用）。关键：每个组件只管一件事，通过事件协作，不互相直接依赖具体实现。",
    tags: ["组件设计", "架构", "综合"],
  },
];
