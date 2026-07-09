import type { ReviewQuestion } from "./types";

export const acaComponentIntroQuestions: ReviewQuestion[] = [
  {
    id: "aca-ci-1",
    chapter: "aca-component-intro",
    level: 1,
    question: "单体架构的六大痛点分别是什么？其根因是什么？",
    answer:
      "六大痛点：①编译慢——全量编译数分钟，改一行代码触发整个项目重编译 ②耦合高——模块间直接import，如OrderActivity直接引用HomeActivity ③团队冲突——多人改同一个module，频繁Git合并冲突 ④无法独立测试——测试一个功能要启动整个App ⑤无法独立部署——无法单独发布某个功能 ⑥复用困难——首页代码无法直接复用到另一个App。根因是「没有边界」——所有代码在同一编译单元（module）内，编译器无法阻止不合理的依赖，团队无法划分独立的开发单元。组件化通过多module物理隔离解决了边界问题——跨module依赖必须通过public接口，编译器强制约束。",
    tags: ["单体架构", "六大痛点", "根因分析", "边界"],
  },
  {
    id: "aca-ci-2",
    chapter: "aca-component-intro",
    level: 2,
    question: "组件化、模块化、插件化三者有什么区别和联系？",
    answer:
      "三者递进关系：模块化→组件化→插件化。①模块化——单一module内按功能分包，通过包名约束代码组织。无法阻止跨包依赖，编译仍需全量。适合小项目。②组件化——多module独立编译，组件间通过路由交互无直接依赖。debug可独立运行（isRunAlone=true），release编译期集成。适合中大型项目。③插件化——在组件化基础上将组件编译为独立APK/DEX，运行期动态加载和卸载。可热更新，但技术复杂度高涉及ClassLoader和Hook。适合超大型项目。区别维度：编译期（单module分包/多module独立编译/多module+动态加载）、运行期（全在主App/全在主App/按需加载）、独立运行（否/是debug/是）、独立部署（否/否/是）。多数项目做到组件化即可。",
    tags: ["组件化", "模块化", "插件化", "对比"],
  },
  {
    id: "aca-ci-3",
    chapter: "aca-component-intro",
    level: 2,
    question: "组件化的五个核心价值是什么？分别如何实现？",
    answer:
      "①编译加速——单组件Gradle编译秒级，./gradlew :module-home:assembleDebug只编译首页组件，从8min降到2min ②解耦——路由框架（ARouter）消除页面直接依赖，接口下沉消除数据直接依赖，组件间无直接import ③并行开发——团队按组件分工，A团队负责module-home，B团队负责module-order，互不干扰，接口定义在common层 ④独立测试——isRunAlone=true时组件作为独立App运行，可单独调试和单测 ⑤组件复用——组件作为aar发布到maven仓库，登录组件可复用到多个App。核心：编译加速75%、Git冲突减少90%、组件复用降低重复开发成本。",
    tags: ["核心价值", "编译加速", "解耦", "并行开发", "复用"],
  },
  {
    id: "aca-ci-4",
    chapter: "aca-component-intro",
    level: 3,
    question: "为什么说「没有边界」是单体架构的根因？组件化如何建立边界？",
    answer:
      "单体架构中所有代码在同一编译单元（module）内，编译器无法阻止不合理的依赖（如OrderActivity直接import HomeActivity）。没有物理边界导致：①任意代码可互相调用，耦合不可避免 ②无法划分独立的开发单元，团队冲突 ③编译必须全量，无法只编译改动部分 ④无法只测试某个功能 ⑤无法单独复用某个模块。组件化通过多module物理隔离建立边界——①每个业务组件是独立的Gradle module，跨module依赖必须通过public接口，编译器强制约束 ②组件间禁止直接依赖（module-home不能implementation module-order），必须通过路由和接口下沉交互 ③isRunAlone开关控制独立运行，debug时可单独编译调试。物理边界+编译器约束=真正的解耦。",
    tags: ["根因", "边界", "物理隔离", "编译器约束"],
  },
];
