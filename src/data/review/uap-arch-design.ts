import type { ReviewQuestion } from "./types";

export const uapArchDesignQuestions: ReviewQuestion[] = [
  {
    id: "uap-arch-design-1",
    chapter: "uap-arch-design",
    level: 1,
    question: "Unity 项目典型分层的四层是什么？依赖方向是什么？",
    answer: "表现层（MonoBehaviour/View）、逻辑层（Controller/Service）、领域层（Domain/Model）、基础设施层（Data/Network/Pool）。依赖方向单向向下：上层依赖下层，下层不知道上层存在。反向通信走事件/回调，禁止反向直接调用。",
    tags: ["分层架构", "依赖方向"],
  },
  {
    id: "uap-arch-design-2",
    chapter: "uap-arch-design",
    level: 2,
    question: "为什么 MonoBehaviour 不应该承担业务逻辑？它应该只做什么？",
    answer: "MonoBehaviour 强耦合引擎生命周期（Awake/Update/序列化字段），把逻辑写进去会导致：无法脱离场景测试、无法被 DI 容器管理、Inspector 序列化字段污染状态。它应该只做表现——把 Controller 算好的数据渲染到屏幕、把用户输入转发给 Controller。逻辑下沉到纯 C# 类，可测试、可替换。",
    tags: ["MonoBehaviour", "职责分离"],
  },
  {
    id: "uap-arch-design-3",
    chapter: "uap-arch-design",
    level: 3,
    question: "分层架构中 Service 层需要通知 View 层更新，但不允许反向依赖，怎么做？",
    answer: "用事件/观察者模式解耦。Service 暴露事件（如 `event Action<int> OnHpChanged`），View 订阅该事件。Service 触发事件时不知道谁在听，View 响应事件时不知道谁发的。依赖方向仍是 View→Service（View 订阅 Service 的事件），但数据流是 Service→View，不违反分层。也可用 EventBus 做更彻底的解耦。",
    tags: ["事件驱动", "观察者", "分层解耦"],
  },
  {
    id: "uap-arch-design-4",
    chapter: "uap-arch-design",
    level: 4,
    question: "如何把一个面条式依赖的 Player 脚本重构为分层+DI 架构？给出步骤。",
    answer: "1）划层：把 Player 拆为 PlayerView（MonoBehaviour，只渲染和转发输入）、PlayerController（纯逻辑，处理交互）、PlayerModel（持数据）；2）抽接口：跨层调用点抽 interface（IEnemyService、IUIService），上层依赖 interface；3）接容器：引入 VContainer/Zenject，在 LifetimeScope 注册绑定关系，用构造注入替换所有 new 和 FindObjectOfType；4）事件解耦：反向通知走事件（Service 暴露 event，View 订阅）。完成后 PlayerView 可替换、PlayerController 可单元测试、依赖可 mock。",
    tags: ["重构", "依赖注入", "综合"],
  },
];
