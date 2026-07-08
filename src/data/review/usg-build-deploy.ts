import type { ReviewQuestion } from "./types";

/** 构建与发布 复习题 */
export const usgBuildDeployQuestions: ReviewQuestion[] = [
  {
    id: "usg-build-deploy-1",
    chapter: "usg-build-deploy",
    level: 1,
    question: "Unity 构建管线的四个步骤是什么？",
    answer: "1)场景配置——在 Build Settings 中勾选 Scenes In Build，只有勾选的场景才打包，顺序决定加载序号。2)平台选择——切换目标平台（Windows/Android/iOS/WebGL）。3)Player Settings——配置包名、图标、版本号、脚本后端（IL2CPP）、画质、剥离等级。4)Build——生成可执行包（.exe/.apk/.ipa/网页文件）。发布前还需过检查清单确保质量。",
    tags: ["构建管线", "Build Settings", "发布流程"],
  },
  {
    id: "usg-build-deploy-2",
    chapter: "usg-build-deploy",
    level: 2,
    question: "Mono 和 IL2CPP 脚本后端有什么区别？发布时应该选哪个？",
    answer: "Mono 是 JIT（即时编译），构建快但运行性能较低，且容易被反编译。IL2CPP 是 AOT（提前编译），将 C# IL 编译为 C++ 再编译为原生代码，运行更快、更难反编译、支持代码剥离（减小包体），但编译时间长。发布时应选 IL2CPP——性能更好、包体更小、更安全。Mono 仅在开发期快速迭代时使用。注意：IL2CPP 不支持运行时代码生成（某些反射可能失效），需测试反射代码。iOS 强制使用 IL2CPP（Apple 不允许 JIT）。",
    tags: ["IL2CPP", "Mono", "脚本后端", "发布"],
  },
  {
    id: "usg-build-deploy-3",
    chapter: "usg-build-deploy",
    level: 3,
    question: "发布前需要检查哪些关键项？Development Build 未关闭有什么后果？",
    answer: "检查清单：1)Development Build 关闭、Strip Engine Code 开启；2)脚本后端设 IL2CPP、版本号递增、包名正确；3)纹理压缩匹配平台（ASTC/ETC2/DXT）、音频编码匹配、图标启动屏配置；4)Android 配 Keystore 签名、iOS 配 Provisioning Profile 和 Bundle ID；5)目标设备真机测试 + Profiler 验证发布包性能。Development Build 未关闭的后果：包含调试符号和 Profiler 连接支持，包体大、性能低，可能暴露调试信息，玩家体验差甚至被商店拒审。",
    tags: ["发布检查清单", "Development Build", "Strip Engine Code"],
  },
  {
    id: "usg-build-deploy-4",
    chapter: "usg-build-deploy",
    level: 4,
    question: "如何用命令行实现 CI/CD 自动化构建 Unity 游戏到多平台？",
    answer: "1)编写 Editor 脚本 `BuildScript`，用 `BuildPipeline.BuildPlayer(scenes, path, target, options)` 构建。2)为每个平台写方法：BuildAndroid() 输出 .apk，BuildIOS() 输出 Xcode 工程，BuildWebGL() 输出网页文件。3)scenes 数组列出需要打包的场景路径。4)options 设 `BuildOptions.None` 确保 Development Build 关闭。5)CI 服务器用命令行调用：`Unity -batchmode -nographics -projectPath . -executeMethod BuildScript.BuildAndroid -quit`。6)构建前用 `PlayerSettings` API 设置包名/版本/Keystore 等。7)构建后上传到商店或 CDN。batchmode 无界面运行适合 CI，-executeMethod 指定入口方法，-quit 构建完自动退出。",
    tags: ["CI/CD", "命令行构建", "BuildPipeline", "自动化"],
  },
];
