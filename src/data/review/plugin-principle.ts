import type { ReviewQuestion } from "./types";
export const pluginPrincipleQuestions: ReviewQuestion[] = [
  { id: "pp-1", chapter: "plugin-principle", level: 1, question: "插件化要解决的三大核心问题是什么？", answer: "① 组件生命周期：插件 Activity 没在宿主 Manifest 注册→占坑绕过 AMS。② 类加载：插件 APK 的 dex→DexClassLoader 加载。③ 资源加载：插件 APK 的 Resources→独立 AssetManager。", tags: ["三座大山"] },
  { id: "pp-2", chapter: "plugin-principle", level: 1, question: "占坑 Activity 的完整流程是什么？", answer: "Hook Instrumentation.execStartActivity→Intent改成StubActivity→AMS校验通过→Hook Instrumentation.newActivity→换回真正PluginActivity→PluginActivity加载插件Resources→显示。", tags: ["占坑"] },
  { id: "pp-3", chapter: "plugin-principle", level: 2, question: "为什么插件化需要同时 Hook AMS 和 Instrumentation？", answer: "需要 Hook Instrumentation 两次：execStartActivity 骗 AMS(说是 StubActivity)，newActivity 换回真正 Activity。只 Hook 一个无法完成完整的'骗-换'流程。", tags: ["双Hook"] },
  { id: "pp-4", chapter: "plugin-principle", level: 2, question: "插件的 Activity 启动后为什么界面空白（没有 layout）？", answer: "插件 Activity 拿到了宿主 Resources→插件 R.layout.xxx 的资源 ID 在宿主资源表里映射的可能是别的 layout。必须给插件创建独立的 Resources(用插件APK路径构建AssetManager)。", tags: ["资源"] },
  { id: "pp-5", chapter: "plugin-principle", level: 3, question: "插件 Activity 绕过了 AMS 的生命周期调度——它怎么知道什么时候该 onPause/onResume？", answer: "通过宿主的 Application.ActivityLifecycleCallbacks 监听全局生命周期变化→同步到插件 Activity→模拟 AMS 的调度行为。", tags: ["生命周期"] },
];
