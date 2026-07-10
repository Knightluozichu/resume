import type { ReviewQuestion } from "./types";

/** Unity 脚本生命周期 复习题 */
export const uscLifecycleQuestions: ReviewQuestion[] = [
  {
    id: "usc-lifecycle-1",
    chapter: "usc-lifecycle",
    level: 1,
    question: `Unity 脚本生命周期的执行顺序是什么？`,
    answer: `初始化：Awake→OnEnable→Start。每帧循环：FixedUpdate→物理碰撞事件→Update→协程→LateUpdate→渲染回调。销毁：OnDisable→OnDestroy。Awake/Start/OnDestroy 只调用一次，OnEnable/OnDisable 可多次触发（每次启用/禁用）。`,
    tags: ["生命周期", "执行顺序"],
  },
  {
    id: "usc-lifecycle-2",
    chapter: "usc-lifecycle",
    level: 2,
    question: `OnEnable 和 OnDisable 的触发时机是什么？适合做什么操作？`,
    answer: `OnEnable 在对象启用（SetActive(true)或enabled=true）时触发，Awake 之后、Start 之前。OnDisable 在对象禁用时触发。适合操作：OnEnable 中订阅事件、启动协程、初始化运行时状态；OnDisable 中取消事件订阅、停止协程、清理临时资源。关键：每次启用/禁用都会触发，适合对象池场景的「重置」逻辑。`,
    tags: ["OnEnable", "OnDisable", "事件订阅"],
  },
  {
    id: "usc-lifecycle-3",
    chapter: "usc-lifecycle",
    level: 3,
    question: `为什么事件订阅要在 OnEnable 而非 Awake 中？为什么取消要在 OnDisable 而非 OnDestroy？`,
    answer: `Awake 只调用一次，如果对象被禁用再启用，事件订阅不会重新建立——导致禁用期间事件丢失。OnEnable 每次启用都触发，确保订阅始终有效。同理，OnDestroy 只在销毁时调用，如果对象只是暂时禁用，事件订阅仍然存在——导致禁用后仍然响应事件。OnDisable 每次禁用都触发，及时取消订阅。成对使用：OnEnable 订阅，OnDisable 取消，保证订阅生命周期与对象启用状态一致。`,
    tags: ["事件订阅", "OnEnable", "OnDisable"],
  },
  {
    id: "usc-lifecycle-4",
    chapter: "usc-lifecycle",
    level: 4,
    question: `设计一个需要频繁启用/禁用的子弹对象（对象池），如何管理其生命周期？`,
    answer: `1)Awake：一次性初始化——缓存 Rigidbody/Collider 引用，设置最大生命值等静态数据；2)OnEnable：每次从池中取出时重置——位置归零、速度归零、重置伤害值、订阅事件、启动弹道协程；3)OnDisable：每次回收时清理——停止所有协程（StopAllCoroutines）、取消事件订阅、重置物理状态（velocity=zero）；4)OnDestroy：池销毁时调用——释放资源引用。关键：不要在 OnDisable 中 Destroy（否则池失效），不要在 Awake 中依赖其他场景对象（场景可能未完全加载）。`,
    tags: ["对象池", "生命周期", "综合"],
  },
];
