import type { ReviewQuestion } from "./types";

export const uctSceneManagementQuestions: ReviewQuestion[] = [
  {
    id: "uct-scene-management-1",
    chapter: "uct-scene-management",
    level: 1,
    question: `SceneManager.LoadScene 和 LoadSceneAsync 的区别是什么？`,
    answer: `LoadScene 是同步加载，加载完成前主线程阻塞，画面卡顿。LoadSceneAsync 是异步加载，加载在后台进行，主线程继续渲染，不卡顿。异步加载返回 AsyncOperation 对象，可获取进度和控制激活时机。项目应该用异步加载。`,
    tags: ["SceneManager", "异步加载"],
  },
  {
    id: "uct-scene-management-2",
    chapter: "uct-scene-management",
    level: 2,
    question: `DontDestroyOnLoad 的作用是什么？有什么注意事项？`,
    answer: `DontDestroyOnLoad 标记 GameObject 在场景切换时不销毁，用于全局管理器。注意事项：1）必须在 Awake 中调用；2）要防止重复创建——用单例模式判断 Instance 是否已存在；3）不要对大量对象使用，会增加内存；4）被标记的对象移到特殊 DontDestroyOnLoad 场景中。`,
    tags: ["DontDestroyOnLoad", "单例"],
  },
  {
    id: "uct-scene-management-3",
    chapter: "uct-scene-management",
    level: 3,
    question: `如何实现大世界场景的流式加载？`,
    answer: `把大地图切成 Grid 格子，每格一个场景。方案：1）用触发器或距离判断玩家位置；2）加载玩家周围 N 格场景（LoadSceneAsync+Additive）；3）卸载超出距离的格子（UnloadSceneAsync）；4）用 Dictionary 记录已加载格子避免重复加载。核心难点是加载时机和边界无缝衔接。`,
    tags: ["流式加载", "大世界", "Additive"],
  },
  {
    id: "uct-scene-management-4",
    chapter: "uct-scene-management",
    level: 4,
    question: `设计一个完整的多场景架构方案，包括启动、主菜单、战斗、UI 场景的协作。`,
    answer: `架构：Boot 场景（GameManager+DontDestroyOnLoad）→加载 Main 场景（主菜单）→点开始→Unload Main+Load Game 场景（战斗）→Additive Load UI 场景（HUD）。GameManager 跨场景存活管理全局状态。场景切换用异步加载+进度条。战斗结束→Unload Game+UI→Load Main。每个场景职责单一，Additive 叠加组合。`,
    tags: ["多场景架构", "综合"],
  },
];
