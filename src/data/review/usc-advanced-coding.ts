import type { ReviewQuestion } from "./types";

/** Unity 高级编程 复习题 */
export const uscAdvancedCodingQuestions: ReviewQuestion[] = [
  {
    id: "usc-advanced-coding-1",
    chapter: "usc-advanced-coding",
    level: 1,
    question: `Unity 中常用的四大设计模式是什么？`,
    answer: `单例模式（全局唯一访问点，如 GameManager.Instance）、对象池模式（复用对象避免频繁 Instantiate/Destroy，如子弹池）、状态机模式（管理对象行为状态切换，如敌人 AI 的巡逻/追击/攻击）、观察者模式（事件驱动解耦通信，如 OnDeath 事件通知 UI 和音效）。`,
    tags: ["设计模式", "四大模式"],
  },
  {
    id: "usc-advanced-coding-2",
    chapter: "usc-advanced-coding",
    level: 2,
    question: `对象池模式如何实现？有什么优势？`,
    answer: `实现：预创建一批对象放入空闲队列，需要时从队列取出并 SetActive(true)，用完 SetActive(false) 放回队列，不 Destroy。优势：1)避免频繁 Instantiate/Destroy 的 GC 开销；2)避免运行时创建对象的卡顿；3)内存占用稳定。适合子弹/粒子/敌人等频繁创建销毁的对象。注意：取出时需重置状态（位置/速度/血量），用 OnEnable/OnDisable 管理重置。`,
    tags: ["对象池", "实现"],
  },
  {
    id: "usc-advanced-coding-3",
    chapter: "usc-advanced-coding",
    level: 3,
    question: `单例模式的优缺点是什么？在 Unity 中如何正确实现？`,
    answer: `优点：全局唯一访问点，方便跨模块通信（GameManager.Instance.LoadScene）。缺点：1)紧耦合——所有依赖单例的代码都硬编码引用；2)难以测试——单例全局状态难以 mock；3)生命周期管理复杂——场景切换时需要区分持久化单例(DontDestroyOnLoad)和场景单例。正确实现：public static GameManager Instance { get; private set; } void Awake() { if (Instance != null) Destroy(gameObject); else { Instance = this; DontDestroyOnLoad(gameObject); } }。原则：单例只用真正的全局管理器（GameManager/AudioManager），不为图方便滥用。`,
    tags: ["单例", "优缺点", "实现"],
  },
  {
    id: "usc-advanced-coding-4",
    chapter: "usc-advanced-coding",
    level: 4,
    question: `用状态机模式设计一个敌人 AI，包含巡逻、追击、攻击、逃跑四个状态？`,
    answer: `1)定义状态接口：interface IEnemyState { void Enter(Enemy enemy); void Update(Enemy enemy); void Exit(Enemy enemy); }；2)实现状态类：PatrolState（巡逻到巡逻点）、ChaseState（追击玩家）、AttackState（在攻击范围内攻击）、FleeState（血量低于30%逃跑）；3)状态转换条件：Patrol→Chase（发现玩家）、Chase→Attack（进入攻击范围）、Attack→Chase（玩家离开范围）、AnyState→Flee（血量<30%）、Flee→Patrol（脱离危险）；4)Enemy 类持有当前状态，Update 调用 currentState.Update(this)，切换时调用 Exit→Enter。优势：每个状态逻辑独立，新增状态不改其他状态，条件清晰。复杂 AI 可用层次状态机（HSM）嵌套子状态。`,
    tags: ["状态机", "AI", "综合"],
  },
];
