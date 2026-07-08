import type { ReviewQuestion } from "./types";

export const ummSceneStreamingQuestions: ReviewQuestion[] = [
  {
    id: "umm-scene-streaming-1",
    chapter: "umm-scene-streaming",
    level: "B",
    question: "什么是场景流式加载？为什么 MMO 不能一次性加载整个世界？",
    answer:
      "场景流式加载是指玩家移动时动态加载附近的地图块、卸载远离的块。MMO 世界可能达数十平方公里，一次性加载所有地形、建筑、植被的内存开销远超设备上限（移动端可能只有 1-2GB 可用内存）。流式加载让任意时刻只有玩家周围九宫格（约 9 个分块）在内存中，用有限的内存支撑无限大的世界。",
    tags: ["场景加载", "流式加载", "内存管理"],
  },
  {
    id: "umm-scene-streaming-2",
    chapter: "umm-scene-streaming",
    level: "C",
    question: "Unity 中 SceneManager.LoadSceneAsync 的 Additive 模式如何用于流式加载？",
    answer:
      "Additive 模式将新场景叠加到当前场景之上，不销毁已有场景。流式加载流程：① 把大世界切成 N 个子场景（每个对应一个网格块）；② 玩家进入新网格时 LoadSceneAsync(blockName, LoadSceneMode.Additive) 异步加载；③ 玩家离开旧网格时 UnloadSceneAsync 卸载。加载在后台线程执行，通过 allowSceneActivation 控制激活时机，避免卡帧。",
    tags: ["SceneManager", "Additive", "异步加载"],
  },
  {
    id: "umm-scene-streaming-3",
    chapter: "umm-scene-streaming",
    level: "B",
    question: "SubScene 和普通 Additive 场景有什么区别？",
    answer:
      "普通 Additive 场景的物理、光照在所有叠加场景间共享，可能导致跨场景的光照泄漏或物理碰撞混乱。SubScene（Unity 2020.1+ 引入）允许每个子场景有独立的物理场景和光照设置，加载/卸载时自动隔离。在 MMO 大世界中，SubScene 可以让相邻网格块的物理系统独立运作，避免远处地形碰撞体干扰本地逻辑，同时支持按需烘焙光照。",
    tags: ["SubScene", "物理隔离", "光照"],
  },
  {
    id: "umm-scene-streaming-4",
    chapter: "umm-scene-streaming",
    level: "A",
    question: "Addressables 在场景流式加载中扮演什么角色？",
    answer:
      "Addressables 是 Unity 的资源管理系统，在流式加载中负责：① 按需加载——只有玩家靠近的网格块的资源被加载，远处的自动卸载；② 依赖管理——场景块引用的材质、贴图、预制体按依赖链自动加载，卸载时自动释放引用计数归零的资源；③ 远程更新——资源放在 CDN，客户端按需下载，无需整包更新；④ 内存控制——通过引用计数精确管理资源生命周期，避免内存泄漏。",
    tags: ["Addressables", "资源管理", "依赖"],
  },
];
