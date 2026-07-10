import type { ReviewQuestion } from "./types";

export const acaBuildDeployQuestions: ReviewQuestion[] = [
  {
    id: "aca-bd-1",
    chapter: "aca-build-deploy",
    level: 1,
    question: `isRunAlone 的实现原理和两种模式的区别？`,
    answer:
      `isRunAlone是gradle.properties中的布尔开关。实现原理：在组件build.gradle.kts中读取isRunAlone值，动态切换Gradle插件——true用apply(plugin=\"com.android.application\")（独立App），false用apply(plugin=\"com.android.library\")（库）。两种模式区别：①独立模式（true）——组件作为application独立运行，需要applicationId（如com.example.module_home），需要自己的AndroidManifest声明Application和LAUNCHER启动Activity，用于debug调试时单组件秒级编译运行 ②集成模式（false）——组件作为library被壳工程依赖，不需要applicationId，AndroidManifest不声明启动Activity，用于release发布时壳工程整合所有组件。通过sourceSets区分不同模式的Manifest和代码。`,
    tags: ["isRunAlone", "独立模式", "集成模式", "Gradle插件"],
  },
  {
    id: "aca-bd-2",
    chapter: "aca-build-deploy",
    level: 2,
    question: `buildTypes 和 productFlavors 如何组合？生成哪些变体？`,
    answer:
      `buildTypes定义构建类型（如debug和release），控制是否混淆（isMinifyEnabled）、是否调试、BuildConfig字段。productFlavors定义多渠道（如dev/staging/prod），每个渠道可有不同的BASE_URL、应用ID后缀等。组合生成变体矩阵：dev-debug、dev-release、staging-debug、staging-release、prod-debug、prod-release共6个变体（2 buildTypes × 3 flavors）。debug变体不混淆可调试，release变体混淆签名。dev用测试服务器URL（https://dev-api.example.com），staging用预发URL，prod用生产URL。构建命令：./gradlew :app:assembleDevRelease指定构建特定变体，./gradlew :app:assembleRelease构建所有渠道的release包。`,
    tags: ["buildTypes", "productFlavors", "变体", "多渠道"],
  },
  {
    id: "aca-bd-3",
    chapter: "aca-build-deploy",
    level: 3,
    question: `组件独立运行时如何解决对其他组件的依赖？`,
    answer:
      `独立运行时组件不能依赖其他业务组件（它们不在编译路径），解决方案：①接口下沉+Mock实现——common层定义的接口在独立运行时提供Mock实现（返回假数据），保证编译通过。如IUserService在独立模式返回MockUserService(getUserName()=\"测试用户\") ②路由桩——为跳转到其他组件的路径提供占位Activity，如跳转/order/detail时显示\"订单组件未集成\"提示 ③debug sourceSet——在src/debug/下放独立运行所需的Mock类、桩Activity和独立AndroidManifest，src/main/放集成模式代码 ④BuildConfig判断——用BuildConfig.IS_RUN_ALONE在运行时区分模式。核心思路：独立运行时用Mock/桩替代其他组件，保证编译通过和基本运行；集成运行时由真实组件提供实现。`,
    tags: ["独立运行", "Mock", "Stub", "依赖解决", "debug sourceSet"],
  },
  {
    id: "aca-bd-4",
    chapter: "aca-build-deploy",
    level: 2,
    question: `如何优化组件化项目的编译速度？`,
    answer:
      `①独立模式调试——isRunAlone=true只编译单个组件，秒级启动。./gradlew :module-home:assembleDebug ②按需编译——只编译改动的组件而非全量 ③增量编译——开启Gradle增量编译和配置缓存 ④并行编译——org.gradle.parallel=true，多module并行编译 ⑤依赖隔离——common-core不频繁改动，编译结果可缓存复用 ⑥避免过度抽象——每多一层module就多一次编译开销，公共层不要拆太细 ⑦Gradle配置优化——org.gradle.caching=true、org.gradle.jvmargs调大堆内存。从单体8分钟编译降到单组件2分钟是组件化编译加速的核心价值。关键是：减少编译范围（单组件）+ 并行编译 + 缓存复用。`,
    tags: ["编译优化", "并行编译", "增量编译", "缓存"],
  },
];
