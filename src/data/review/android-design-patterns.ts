/** 复习题库 · 团队协作中的 Android 应用设计模式入门。 */

import type { ReviewQuestion } from "./types";

export const androidDesignPatternsQuestions: ReviewQuestion[] = [
  {
    id: "adp-1-1",
    chapter: "adp-android-app-basic-structure",
    level: 1,
    question: "Android 应用的基本构成 的核心协作问题是什么？",
    answer:
      "Android 应用设计的第一步，是把 Fat Activity 解剖成能被团队讨论的职责边界。",
    tags: ["Android设计模式", "Android 组件"],
  },
  {
    id: "adp-1-2",
    chapter: "adp-android-app-basic-structure",
    level: 2,
    question: "本章 Stepper 的 4 步故事是什么？",
    answer:
      "TODO 详情页塞进 Activity → 标出 UI/状态/数据/导航 → 抽出 Repository 与 Navigator → review 检查依赖方向。关键不是记步骤名，而是说清谁负责输入、判断、状态、输出或失败处理。",
    tags: ["Stepper", "职责边界"],
  },
  {
    id: "adp-1-3",
    chapter: "adp-android-app-basic-structure",
    level: 3,
    question: "什么时候不该照搬 Android 应用的基本构成 的设计？",
    answer:
      "把目录分层当成架构，结果 Activity 仍然什么都知道。 先确认变化点和团队协作成本，再决定是否引入模式或抽象。",
    tags: ["误区", "团队协作"],
  },
  {
    id: "adp-2-1",
    chapter: "adp-mvp-application-structure",
    level: 1,
    question: "MVP 模式应用构成 的核心协作问题是什么？",
    answer:
      "MVP 让 Activity 退成被动显示器，把判断和编排放到可测试的 Presenter。",
    tags: ["Android设计模式", "MVP"],
  },
  {
    id: "adp-2-2",
    chapter: "adp-mvp-application-structure",
    level: 2,
    question: "本章 Stepper 的 4 步故事是什么？",
    answer:
      "用户点击保存 → View 把事件转给 Presenter → Presenter 校验并调用 Repository → View 显示成功或错误。关键不是记步骤名，而是说清谁负责输入、判断、状态、输出或失败处理。",
    tags: ["Stepper", "职责边界"],
  },
  {
    id: "adp-2-3",
    chapter: "adp-mvp-application-structure",
    level: 3,
    question: "什么时候不该照搬 MVP 模式应用构成 的设计？",
    answer:
      "Presenter 只是换名字的 Activity，继续持有 Android UI 细节。 先确认变化点和团队协作成本，再决定是否引入模式或抽象。",
    tags: ["误区", "团队协作"],
  },
  {
    id: "adp-3-1",
    chapter: "adp-mvvm-application-structure",
    level: 1,
    question: "MVVM 模式应用构成 的核心协作问题是什么？",
    answer: "MVVM 用可观察状态替代手动回调，让 UI 随状态渲染而不是被命令驱动。",
    tags: ["Android设计模式", "MVVM"],
  },
  {
    id: "adp-3-2",
    chapter: "adp-mvvm-application-structure",
    level: 2,
    question: "本章 Stepper 的 4 步故事是什么？",
    answer:
      "用户输入标题 → ViewModel 更新 UiState → 状态流发出错误或成功 → View 根据状态自动渲染。关键不是记步骤名，而是说清谁负责输入、判断、状态、输出或失败处理。",
    tags: ["Stepper", "职责边界"],
  },
  {
    id: "adp-3-3",
    chapter: "adp-mvvm-application-structure",
    level: 3,
    question: "什么时候不该照搬 MVVM 模式应用构成 的设计？",
    answer:
      "ViewModel 拿 Context 或 Fragment，导致生命周期和测试边界重新纠缠。 先确认变化点和团队协作成本，再决定是否引入模式或抽象。",
    tags: ["误区", "团队协作"],
  },
  {
    id: "adp-4-1",
    chapter: "adp-differential-development-design",
    level: 1,
    question: "差分开发中的设计方法 的核心协作问题是什么？",
    answer: "差分开发要先保护现有行为，再用适配层和小 PR 逐步替换内部结构。",
    tags: ["Android设计模式", "差分开发"],
  },
  {
    id: "adp-4-2",
    chapter: "adp-differential-development-design",
    level: 2,
    question: "本章 Stepper 的 4 步故事是什么？",
    answer:
      "线上 bug 暴露旧边界 → 先加回归测试 → 包一层接口或 Facade → 小切片替换并删除旧分支。关键不是记步骤名，而是说清谁负责输入、判断、状态、输出或失败处理。",
    tags: ["Stepper", "职责边界"],
  },
  {
    id: "adp-4-3",
    chapter: "adp-differential-development-design",
    level: 3,
    question: "什么时候不该照搬 差分开发中的设计方法 的设计？",
    answer:
      "新架构必须全量替换旧架构，导致 PR 巨大且无法 review。 先确认变化点和团队协作成本，再决定是否引入模式或抽象。",
    tags: ["误区", "团队协作"],
  },
  {
    id: "adp-5-1",
    chapter: "adp-designer-role-in-oss",
    level: 1,
    question: "OSS 中设计者的角色 的核心协作问题是什么？",
    answer:
      "OSS 里的设计者不是只画图，而是让陌生贡献者也能找到入口、遵守边界、通过 review。",
    tags: ["Android设计模式", "OSS"],
  },
  {
    id: "adp-5-2",
    chapter: "adp-designer-role-in-oss",
    level: 2,
    question: "本章 Stepper 的 4 步故事是什么？",
    answer:
      "新人看到 issue → 文档指向入口模块 → 示例和命名约定约束实现 → review 用设计原则反馈。关键不是记步骤名，而是说清谁负责输入、判断、状态、输出或失败处理。",
    tags: ["Stepper", "职责边界"],
  },
  {
    id: "adp-5-3",
    chapter: "adp-designer-role-in-oss",
    level: 3,
    question: "什么时候不该照搬 OSS 中设计者的角色 的设计？",
    answer:
      "规则越多越专业，结果新人根本不知道从哪里开始。 先确认变化点和团队协作成本，再决定是否引入模式或抽象。",
    tags: ["误区", "团队协作"],
  },
  {
    id: "adp-6-1",
    chapter: "adp-flux-architecture",
    level: 1,
    question: "Flux 架构 的核心协作问题是什么？",
    answer:
      "Flux 把 Action、Reducer、Store、View 排成单向路线，防止状态被多处偷偷改写。",
    tags: ["Android设计模式", "Flux"],
  },
  {
    id: "adp-6-2",
    chapter: "adp-flux-architecture",
    level: 2,
    question: "本章 Stepper 的 4 步故事是什么？",
    answer:
      "用户收藏生成 Action → Reducer 计算新 State → Store 发布状态 → UI 根据状态重绘。关键不是记步骤名，而是说清谁负责输入、判断、状态、输出或失败处理。",
    tags: ["Stepper", "职责边界"],
  },
  {
    id: "adp-6-3",
    chapter: "adp-flux-architecture",
    level: 3,
    question: "什么时候不该照搬 Flux 架构 的设计？",
    answer:
      "Flux 被当成事件总线，所有人都能到处发和改，单向流被破坏。 先确认变化点和团队协作成本，再决定是否引入模式或抽象。",
    tags: ["误区", "团队协作"],
  },
  {
    id: "adp-7-1",
    chapter: "adp-team-and-architecture",
    level: 1,
    question: "团队与架构 的核心协作问题是什么？",
    answer:
      "架构不只服务运行时，也服务人：新成员如何找到文件，PR 如何被 review，测试如何保护边界。",
    tags: ["Android设计模式", "Team Topology"],
  },
  {
    id: "adp-7-2",
    chapter: "adp-team-and-architecture",
    level: 2,
    question: "本章 Stepper 的 4 步故事是什么？",
    answer:
      "新成员接到转发功能 → 从 Route 找到入口 → Interactor 改业务规则 → Presenter 映射状态并由测试保护。关键不是记步骤名，而是说清谁负责输入、判断、状态、输出或失败处理。",
    tags: ["Stepper", "职责边界"],
  },
  {
    id: "adp-7-3",
    chapter: "adp-team-and-architecture",
    level: 3,
    question: "什么时候不该照搬 团队与架构 的设计？",
    answer:
      "VIPER 文件多就是坏，却忽略它可能降低多人协作冲突。 先确认变化点和团队协作成本，再决定是否引入模式或抽象。",
    tags: ["误区", "团队协作"],
  },
  {
    id: "adp-8-1",
    chapter: "adp-android-architecture-components",
    level: 1,
    question: "Android Architecture Components 的核心协作问题是什么？",
    answer: "AAC 不是架构答案本身，而是让生命周期敏感的状态有稳定位置。",
    tags: ["Android设计模式", "LifecycleOwner"],
  },
  {
    id: "adp-8-2",
    chapter: "adp-android-architecture-components",
    level: 2,
    question: "本章 Stepper 的 4 步故事是什么？",
    answer:
      "打开页面并订阅数据 → 旋转屏幕后 View 销毁重建 → ViewModel 保留状态 → Observer 重新订阅并恢复 UI。关键不是记步骤名，而是说清谁负责输入、判断、状态、输出或失败处理。",
    tags: ["Stepper", "职责边界"],
  },
  {
    id: "adp-8-3",
    chapter: "adp-android-architecture-components",
    level: 3,
    question: "什么时候不该照搬 Android Architecture Components 的设计？",
    answer:
      "AAC 等于架构，导致 LiveData 随便跨层传，边界反而更乱。 先确认变化点和团队协作成本，再决定是否引入模式或抽象。",
    tags: ["误区", "团队协作"],
  },
  {
    id: "adp-9-1",
    chapter: "adp-kotlin-impact-on-design",
    level: 1,
    question: "Kotlin 对设计的影响 的核心协作问题是什么？",
    answer: "Kotlin 的价值不是少写几行，而是把不该发生的状态尽量变成编译错误。",
    tags: ["Android设计模式", "Null Safety"],
  },
  {
    id: "adp-9-2",
    chapter: "adp-kotlin-impact-on-design",
    level: 2,
    question: "本章 Stepper 的 4 步故事是什么？",
    answer:
      "散落的 null/error/loading 变量 → 收束为 sealed UiState → 用扩展函数封装团队习惯 → View 只渲染穷尽状态。关键不是记步骤名，而是说清谁负责输入、判断、状态、输出或失败处理。",
    tags: ["Stepper", "职责边界"],
  },
  {
    id: "adp-9-3",
    chapter: "adp-kotlin-impact-on-design",
    level: 3,
    question: "什么时候不该照搬 Kotlin 对设计的影响 的设计？",
    answer:
      "把 Kotlin 当 Java 简写，nullable 到处传，扩展函数到处藏副作用。 先确认变化点和团队协作成本，再决定是否引入模式或抽象。",
    tags: ["误区", "团队协作"],
  },
  {
    id: "adp-10-1",
    chapter: "adp-design-question-square",
    level: 1,
    question: "设计问答广场 的核心协作问题是什么？",
    answer: "设计问答的重点是提取约束、比较代价、记录反证条件。",
    tags: ["Android设计模式", "Decision Matrix"],
  },
  {
    id: "adp-10-2",
    chapter: "adp-design-question-square",
    level: 2,
    question: "本章 Stepper 的 4 步故事是什么？",
    answer:
      "读者提出真实问题 → 提取团队约束 → 排除不适合方案 → 写下决策和反证条件。关键不是记步骤名，而是说清谁负责输入、判断、状态、输出或失败处理。",
    tags: ["Stepper", "职责边界"],
  },
  {
    id: "adp-10-3",
    chapter: "adp-design-question-square",
    level: 3,
    question: "什么时候不该照搬 设计问答广场 的设计？",
    answer:
      "只看技术优雅，不看团队规模、迁移成本和维护能力。 先确认变化点和团队协作成本，再决定是否引入模式或抽象。",
    tags: ["误区", "团队协作"],
  },
];
