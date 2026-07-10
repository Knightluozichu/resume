import type { ReviewQuestion } from "./types";

/** Unity 3D 脚本编程与游戏开发 学习地图 复习题 */
export const usgLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "usg-learning-map-1",
    chapter: "usg-learning-map",
    level: 1,
    question: `Unity 3D 脚本编程与游戏开发全书分为哪五大板块？`,
    answer: `五大板块：基础入门（C# 语法与 Unity API）、游戏逻辑（组件模式与游戏循环）、进阶机制（协程、事件、数据持久化）、项目实战（性能优化与构建发布）、总复习。呈递进关系，每一层建立在前一层之上。`,
    tags: ["学习地图", "全书结构"],
  },
  {
    id: "usg-learning-map-2",
    chapter: "usg-learning-map",
    level: 2,
    question: `为什么 Unity 脚本必须继承 MonoBehaviour？普通 C# 类不行吗？`,
    answer: `因为 Unity 的组件系统基于 MonoBehaviour——只有继承它才能挂载到 GameObject 上，参与生命周期回调（Awake/Start/Update）、序列化系统（Inspector 显示字段）和事件系统。普通 C# 类无法被 Unity 识别为组件。如果不需要挂载到 GameObject，可以用普通 C# 类做纯逻辑或 ScriptableObject 做数据容器。`,
    tags: ["MonoBehaviour", "组件系统"],
  },
  {
    id: "usg-learning-map-3",
    chapter: "usg-learning-map",
    level: 3,
    question: `全书五大板块之间是什么依赖关系？请用一条主线串联。`,
    answer: `主线是「从语言到产品」：基础入门提供语言基础（C#）和工具（Unity API），没有它们写不出脚本；游戏逻辑提供架构骨架（组件模式）和运转机制（游戏循环），没有它们代码混乱且游戏不动；进阶机制提供高级工具（协程/事件/持久化），没有它们游戏缺乏深度；项目实战提供工程能力（优化/发布），没有它们游戏无法交付。每一层依赖前一层。`,
    tags: ["学习地图", "架构设计"],
  },
  {
    id: "usg-learning-map-4",
    chapter: "usg-learning-map",
    level: 4,
    question: `在一个中型 Unity 游戏项目中，你会如何组织脚本架构？`,
    answer: `分层 + 组件架构：1)数据层——ScriptableObject 存配置数据（武器/角色参数），JSON 存游戏存档，PlayerPrefs 存设置；2)逻辑层——MonoBehaviour 组件实现游戏逻辑（PlayerMovement/EnemyAI），每个职责单一；3)通信层——用 C# event 事件系统解耦组件，避免循环依赖；4)管理器层——单例 GameManager 管理全局状态；5)优化层——对象池复用对象、缓存 GetComponent 引用、热路径零 GC 分配。核心原则：组合优于继承、组件职责单一、用事件解耦、数据与逻辑分离。`,
    tags: ["架构设计", "综合"],
  },
];
