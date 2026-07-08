import type { ReviewQuestion } from "./types";

/** 组件模式与游戏对象 复习题 */
export const usgComponentPatternQuestions: ReviewQuestion[] = [
  {
    id: "usg-component-pattern-1",
    chapter: "usg-component-pattern",
    level: 1,
    question: "GameObject 和 Component 的关系是什么？",
    answer: "GameObject 是空容器，本身无功能，只承载 Component。Component 是挂载在 GameObject 上的功能模块，每个组件负责单一职责（Transform 管变换、Rigidbody 管物理、Collider 管碰撞、自定义脚本管逻辑）。一个游戏对象的功能由其挂载的所有组件组合而成——需要什么功能就挂什么组件，不需要就拆掉。",
    tags: ["GameObject", "Component", "组件模式"],
  },
  {
    id: "usg-component-pattern-2",
    chapter: "usg-component-pattern",
    level: 2,
    question: "为什么 Unity 采用组件模式而非传统继承？「组合优于继承」是什么意思？",
    answer: "组件模式比继承灵活：1)可拆装——不需要的功能直接拆掉组件，不影响其他功能；2)可复用——同一个 AI 组件可挂到不同敌人上，无需继承；3)避免继承爆炸——「会飞的鱼」传统继承需多重继承或深层继承树，组件模式只需挂 Fish + Fly 两个组件。「组合优于继承」指用组件组合（has-a）代替深层继承树（is-a），灵活可拆装，运行时可动态 AddComponent/RemoveComponent 改变行为。",
    tags: ["组合优于继承", "设计原则", "组件模式"],
  },
  {
    id: "usg-component-pattern-3",
    chapter: "usg-component-pattern",
    level: 3,
    question: "如何将一个 500 行的 God Class PlayerController 拆分为多个组件？",
    answer: "按职责拆分：1)识别功能领域——移动、战斗、血量、背包、UI 等；2)每个领域一个 MonoBehaviour 组件（PlayerMovement/PlayerCombat/PlayerHealth/PlayerInventory），职责单一；3)跨组件通信用 GetComponent（同对象内强依赖）或事件系统（跨对象松耦合）；4)避免循环依赖——通信方向单向，或用事件解耦；5)共享数据用 ScriptableObject 或独立的 PlayerData 组件。拆分后每个组件可独立测试、复用、维护，符合单一职责原则。",
    tags: ["God Class", "拆分", "单一职责"],
  },
  {
    id: "usg-component-pattern-4",
    chapter: "usg-component-pattern",
    level: 4,
    question: "组件间出现循环依赖（A 依赖 B 且 B 依赖 A）怎么解决？",
    answer: "用事件系统解耦：1)PlayerHealth 不直接引用 PlayerMovement，而是声明 `public event Action OnDamaged` 事件；2)PlayerMovement 在 OnEnable 中订阅 `playerHealth.OnDamaged += HandleSlowDown`，OnDisable 中取消；3)PlayerHealth 受伤时 `OnDamaged?.Invoke()` 通知，不需要知道订阅者是谁。这样发布者（PlayerHealth）和订阅者（PlayerMovement）单向依赖——PlayerMovement 知道 PlayerHealth，但 PlayerHealth 不知道 PlayerMovement。事件系统打破循环依赖，是组件解耦的核心手段。",
    tags: ["循环依赖", "事件系统", "解耦"],
  },
];
