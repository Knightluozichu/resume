import type { ReviewQuestion } from "./types";

/** Unity 脚本设计学习地图 复习题 */
export const uscLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "usc-learning-map-1",
    chapter: "usc-learning-map",
    level: 1,
    question: "Unity 脚本设计全书分为哪四大板块？",
    answer: "四大板块：脚本基础（学习地图与 MonoBehaviour）、组件系统（组件架构、生命周期、输入系统）、核心机制（物理系统、协程、ScriptableObject）、进阶编程（高级技巧、设计模式、全书复习）。",
    tags: ["学习地图", "全书结构"],
  },
  {
    id: "usc-learning-map-2",
    chapter: "usc-learning-map",
    level: 2,
    question: "Unity 脚本开发中 MonoBehaviour 的角色是什么？",
    answer: "MonoBehaviour 是所有 Unity 脚本的基类，提供生命周期方法（Awake/Start/Update 等）、协程支持、序列化字段（SerializeField）和 Inspector 集成。它将 C# 类变为 Unity 组件，可以挂载到 GameObject 上，参与场景的生命周期和事件系统。",
    tags: ["MonoBehaviour", "基础"],
  },
  {
    id: "usc-learning-map-3",
    chapter: "usc-learning-map",
    level: 3,
    question: "为什么 Unity 脚本不能继承普通 C# 类，而必须继承 MonoBehaviour？",
    answer: "Unity 的组件系统基于 MonoBehaviour——只有继承 MonoBehaviour 的类才能挂载到 GameObject 上，参与 Unity 的生命周期回调（Awake/Start/Update）、序列化系统（Inspector 显示字段）和事件系统（OnCollisionEnter 等）。普通 C# 类无法被 Unity 识别为组件。如果不需要挂载到 GameObject，可以用普通 C# 类或 ScriptableObject 做数据容器。",
    tags: ["MonoBehaviour", "组件系统"],
  },
  {
    id: "usc-learning-map-4",
    chapter: "usc-learning-map",
    level: 4,
    question: "在一个中型游戏项目中，你会如何组织脚本架构？",
    answer: "分层架构：1)数据层——ScriptableObject 存储配置数据（武器参数/角色属性），纯 C# 类做运行时数据模型；2)逻辑层——MonoBehaviour 组件实现游戏逻辑（PlayerController/EnemyAI），每个组件职责单一；3)管理器层——单例 GameManager 管理全局状态，EventManager 做事件解耦；4)表现层——分离视觉表现和逻辑（MVC/MVP），逻辑不直接操作视觉。核心原则：组件职责单一、用事件解耦、数据与逻辑分离、避免 God Class。",
    tags: ["架构设计", "综合"],
  },
];
