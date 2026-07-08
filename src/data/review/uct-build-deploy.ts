import type { ReviewQuestion } from "./types";

export const uctBuildDeployQuestions: ReviewQuestion[] = [
  {
    id: "uct-build-deploy-1",
    chapter: "uct-build-deploy",
    level: 1,
    question: "Unity 构建前必须配置的 PlayerSettings 有哪些？",
    answer: "Company Name/Product Name（包名）、Default Icon、色彩空间（Linear）、脚本后端（IL2CPP）、目标 API 版本。每个平台有额外必配项，如 Android 的 Keystore、iOS 的 Bundle ID。",
    tags: ["PlayerSettings", "构建配置"],
  },
  {
    id: "uct-build-deploy-2",
    chapter: "uct-build-deploy",
    level: 2,
    question: "IL2CPP 和 Mono 的核心区别是什么？移动端为什么必须用 IL2CPP？",
    answer: "Mono 是 JIT 即时编译跨平台但性能中等且易逆向。IL2CPP 是 AOT 编译 C# 转 C++ 转原生码，性能高难逆向。iOS 不允许 JIT，App Store 禁止运行时生成代码，所以必须用 IL2CPP。Android 也推荐 IL2CPP。",
    tags: ["IL2CPP", "Mono", "移动端"],
  },
  {
    id: "uct-build-deploy-3",
    chapter: "uct-build-deploy",
    level: 3,
    question: "Managed Stripping Level 设置太高有什么风险？怎么解决？",
    answer: "Stripping 裁剪未使用代码减包体，High/Very High 可能误删反射调用的代码。如果用了反射（JSON 序列化、依赖注入）可能运行时崩溃。解决：用 link.xml 手动保留需要的类，或用 [Preserve] 特性标注不被裁剪。",
    tags: ["Stripping", "反射", "link.xml"],
  },
  {
    id: "uct-build-deploy-4",
    chapter: "uct-build-deploy",
    level: 4,
    question: "如何实现 Unity 项目的自动化构建？完整方案是什么？",
    answer: "用 BuildPipeline.BuildPlayer API 写构建脚本，设置 PlayerSettings 和场景列表，调用 BuildPipeline 执行构建。命令行用 -batchmode -nographics -executeMethod BuildScript.BuildAndroid 实现无界面构建。集成到 CI/CD：Jenkins/GitHub Actions 拉代码到安装 Unity到执行构建脚本到签名到上传商店。关键是构建脚本可复现、不依赖编辑器界面。",
    tags: ["自动化构建", "CI/CD", "BuildPipeline", "综合"],
  },
];
