import type { ReviewQuestion } from "./types";

/** 全书总复习 复习题 */
export const usgFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "usg-final-review-1",
    chapter: "usg-final-review",
    level: 1,
    question: "全书八大核心能力是什么？",
    answer: "1)能写 MonoBehaviour 并挂载调试；2)会用 GetComponent 组件通信；3)区分 Update/FixedUpdate/LateUpdate；4)会用协程做延迟与异步加载；5)会用事件系统解耦组件；6)能选对持久化方案存取数据；7)会用对象池/批处理优化性能；8)能完成多平台构建发布。这八项覆盖了从 C# 语法到独立完成 Unity 游戏脚本开发与发布全流程。",
    tags: ["核心能力", "总复习", "自检"],
  },
  {
    id: "usg-final-review-2",
    chapter: "usg-final-review",
    level: 2,
    question: "为什么事件订阅放 OnEnable/OnDisable 而非 Awake/OnDestroy？这与游戏循环有什么关系？",
    answer: "OnEnable/OnDisable 每次启用/禁用都触发，Awake/OnDestroy 只调一次。游戏循环中对象可能被 SetActive 反复开关（如对象池），如果订阅在 Awake 中，禁用再启用后订阅不会重建——事件丢失；取消在 OnDestroy 中则禁用时订阅仍在——响应不该响应的事件。OnEnable 订阅 + OnDisable 取消保证订阅生命周期与对象启用状态一致，这是游戏循环生命周期管理的直接应用。",
    tags: ["事件订阅", "生命周期", "游戏循环"],
  },
  {
    id: "usg-final-review-3",
    chapter: "usg-final-review",
    level: 3,
    question: "如何用「为什么」链条串联全书知识？举例说明。",
    answer: "用因果链串联：为什么继承 MonoBehaviour？→ 因为要挂载到 GameObject → 为什么用组件？→ 组合优于继承 → 组件怎么通信？→ GetComponent 和事件 → 事件订阅放哪？→ OnEnable/OnDisable → 为什么？→ 生命周期一致性 → 移动为什么乘 deltaTime？→ 帧率无关 → 物理为什么放 FixedUpdate？→ 固定步长稳定 → 协程为什么不是多线程？→ 主线程 yield → 存档为什么用 JSON？→ 支持复杂结构 → 优化为什么先测后优？→ 80/20 原则。用「为什么」串联比死记硬背牢固十倍，形成因果网络。",
    tags: ["知识串联", "因果链", "学习方法"],
  },
  {
    id: "usg-final-review-4",
    chapter: "usg-final-review",
    level: 4,
    question: "学完全书后，如何独立完成一个 Unity 游戏的脚本开发与发布？请给出完整步骤。",
    answer: "1)规划架构——用组件模式拆分（Player/Enemy/UI/Manager），职责单一。2)实现基础——写 MonoBehaviour 脚本，用四大 API 做交互，Update 处理输入，FixedUpdate 处理物理，乘 deltaTime。3)加异步与通信——协程做延迟序列（生成/爆炸），事件系统解耦组件（击杀通知计分），OnEnable/OnDisable 管订阅。4)做存档——JSON 存进度到 persistentDataPath，ScriptableObject 存配置，PlayerPrefs 存设置。5)优化——对象池复用、缓存 GetComponent、热路径零 GC、Profiler 定位瓶颈、批处理/LOD 减 Draw Call。6)发布——Build Settings 选平台，Player Settings 配 IL2CPP/签名/图标，过检查清单，真机测试，构建上架。",
    tags: ["综合", "游戏开发全流程", "项目实战"],
  },
];
