import type { ReviewQuestion } from "../review-questions";

export const adpOfficialQuestions: ReviewQuestion[] = [
  {
    chapter: "adp-official-learning-map",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "2018年正式版权威学习地图",
      "正式版分母",
    ],
    id: "adp-official-learning-map-q1",
    level: 1,
    question: "“2018年正式版权威学习地图”的正式分母和版本边界是什么？",
    answer:
      "本页以PEAKS最终商品页、官方样章目录和2018年1月31日前官方代码为准；核心任务是把最终成书的3部、8章和前后置内容连成一条可验证的架构决策路径，并明确众筹草案不属于正式分母，众筹草案和现代Jetpack内容只能作为差异说明。",
  },
  {
    chapter: "adp-official-learning-map",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "2018年正式版权威学习地图",
      "三部八章",
    ],
    id: "adp-official-learning-map-q2",
    level: 1,
    question: "“2018年正式版权威学习地图”最重要的业务或教学不变量是什么？",
    answer:
      "正式分母只采用2018年1月31日发行的224页成书目录；每个设计结论都能回指项目约束、样例代码、失败反例和团队证据",
  },
  {
    chapter: "adp-official-learning-map",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "2018年正式版权威学习地图",
      "TODO样例",
    ],
    id: "adp-official-learning-map-q3",
    level: 2,
    question: "怎样为“2018年正式版权威学习地图”构造单变量反例？",
    answer:
      "固定业务规格、版本、数据和操作序列，只改变生命周期、异步顺序、共享状态或团队边界中的一个变量；重点验证：沿用众筹草案会错误增加Kotlin与问题广场两章，并把八木俊广列入最终作者，导致章节数、作者和技术边界都失真",
  },
  {
    chapter: "adp-official-learning-map",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "2018年正式版权威学习地图",
      "版本边界",
    ],
    id: "adp-official-learning-map-q4",
    level: 2,
    question: "“2018年正式版权威学习地图”为什么不能只凭类名或框架名验收？",
    answer:
      "名称不证明依赖方向和状态写权限。必须同时观察对象身份、调用/数据轨迹、生命周期释放、失败恢复以及团队变更事实。",
  },
  {
    chapter: "adp-official-learning-map",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "2018年正式版权威学习地图",
      "设计证据",
    ],
    id: "adp-official-learning-map-q5",
    level: 3,
    question:
      "如何验证“2018年正式版权威学习地图”在旋转、后台和迟到回调下仍正确？",
    answer:
      "为正常、旋转、后台、迟到成功与迟到失败分别保存实例、订阅、状态前后值、UI结果和释放轨迹，再按“正式分母只采用2018年1月31日发行的224页成书目录；每个设计结论都能回指项目约束、样例代码、失败反例和团队证据”对账。",
  },
  {
    chapter: "adp-official-learning-map",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "2018年正式版权威学习地图",
      "正式版分母",
    ],
    id: "adp-official-learning-map-q6",
    level: 3,
    question: "“2018年正式版权威学习地图”独立交接至少要包含哪些证据？",
    answer:
      "需要正式目录映射、来源和提交、责任/依赖图、状态与生命周期轨迹、失败反例、测试结果、业务或团队指标、停止与回退条件、责任人和复核人。",
  },
  {
    chapter: "adp-preface",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "はじめに（前言）",
      "サンプルコード",
    ],
    id: "adp-preface-q1",
    level: 1,
    question: "“はじめに（前言）”的正式分母和版本边界是什么？",
    answer:
      "本页以PEAKS最终商品页、官方样章目录和2018年1月31日前官方代码为准；核心任务是先固定可复现实验材料、出版协作方式和责任边界，再进入任何架构结论，众筹草案和现代Jetpack内容只能作为差异说明。",
  },
  {
    chapter: "adp-preface",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "はじめに（前言）",
      "クラウドファンディング",
    ],
    id: "adp-preface-q2",
    level: 1,
    question: "“はじめに（前言）”最重要的业务或教学不变量是什么？",
    answer:
      "读者能从官方链接取得与出版时一致的样例，知道结论适用范围，也不会把示例当成唯一标准答案",
  },
  {
    chapter: "adp-preface",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "はじめに（前言）",
      "PEAKS",
    ],
    id: "adp-preface-q3",
    level: 2,
    question: "怎样为“はじめに（前言）”构造单变量反例？",
    answer:
      "固定业务规格、版本、数据和操作序列，只改变生命周期、异步顺序、共享状态或团队边界中的一个变量；重点验证：直接在当前主分支运行样例会得到现代依赖或失效构建；忽略免责与版本说明又会把历史案例误当成今天的官方规范",
  },
  {
    chapter: "adp-preface",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "はじめに（前言）",
      "TechBooster",
    ],
    id: "adp-preface-q4",
    level: 2,
    question: "“はじめに（前言）”为什么不能只凭类名或框架名验收？",
    answer:
      "名称不证明依赖方向和状态写权限。必须同时观察对象身份、调用/数据轨迹、生命周期释放、失败恢复以及团队变更事实。",
  },
  {
    chapter: "adp-preface",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "はじめに（前言）",
      "免責事項",
    ],
    id: "adp-preface-q5",
    level: 3,
    question: "如何验证“はじめに（前言）”在旋转、后台和迟到回调下仍正确？",
    answer:
      "为正常、旋转、后台、迟到成功与迟到失败分别保存实例、订阅、状态前后值、UI结果和释放轨迹，再按“读者能从官方链接取得与出版时一致的样例，知道结论适用范围，也不会把示例当成唯一标准答案”对账。",
  },
  {
    chapter: "adp-preface",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "はじめに（前言）",
      "サンプルコード",
    ],
    id: "adp-preface-q6",
    level: 3,
    question: "“はじめに（前言）”独立交接至少要包含哪些证据？",
    answer:
      "需要正式目录映射、来源和提交、责任/依赖图、状态与生命周期轨迹、失败反例、测试结果、业务或团队指标、停止与回退条件、责任人和复核人。",
  },
  {
    chapter: "adp-01-android-app-basic-structure",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第1章 Android 应用的基本构成",
      "MVP",
    ],
    id: "adp-01-android-app-basic-structure-q1",
    level: 1,
    question: "“第1章 Android 应用的基本构成”的正式分母和版本边界是什么？",
    answer:
      "本页以PEAKS最终商品页、官方样章目录和2018年1月31日前官方代码为准；核心任务是把五屏TODO应用作为控制变量，从职责、依赖方向、生命周期与可测试性解释Android架构为何演进，众筹草案和现代Jetpack内容只能作为差异说明。",
  },
  {
    chapter: "adp-01-android-app-basic-structure",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第1章 Android 应用的基本构成",
      "MVVM",
    ],
    id: "adp-01-android-app-basic-structure-q2",
    level: 1,
    question: "“第1章 Android 应用的基本构成”最重要的业务或教学不变量是什么？",
    answer:
      "TODO的新增、编辑、删除、本地保存和远端同步语义不随架构改变；改变的只能是职责分配与协作协议",
  },
  {
    chapter: "adp-01-android-app-basic-structure",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第1章 Android 应用的基本构成",
      "Fat Activity",
    ],
    id: "adp-01-android-app-basic-structure-q3",
    level: 2,
    question: "怎样为“第1章 Android 应用的基本构成”构造单变量反例？",
    answer:
      "固定业务规格、版本、数据和操作序列，只改变生命周期、异步顺序、共享状态或团队边界中的一个变量；重点验证：只把类改名为ViewModel或Presenter而不改变依赖方向，会继续留下Fat Activity、生命周期泄漏和无法隔离测试的问题",
  },
  {
    chapter: "adp-01-android-app-basic-structure",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第1章 Android 应用的基本构成",
      "ライフサイクル",
    ],
    id: "adp-01-android-app-basic-structure-q4",
    level: 2,
    question: "“第1章 Android 应用的基本构成”为什么不能只凭类名或框架名验收？",
    answer:
      "名称不证明依赖方向和状态写权限。必须同时观察对象身份、调用/数据轨迹、生命周期释放、失败恢复以及团队变更事实。",
  },
  {
    chapter: "adp-01-android-app-basic-structure",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第1章 Android 应用的基本构成",
      "Android Architecture Components",
    ],
    id: "adp-01-android-app-basic-structure-q5",
    level: 3,
    question:
      "如何验证“第1章 Android 应用的基本构成”在旋转、后台和迟到回调下仍正确？",
    answer:
      "为正常、旋转、后台、迟到成功与迟到失败分别保存实例、订阅、状态前后值、UI结果和释放轨迹，再按“TODO的新增、编辑、删除、本地保存和远端同步语义不随架构改变；改变的只能是职责分配与协作协议”对账。",
  },
  {
    chapter: "adp-01-android-app-basic-structure",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第1章 Android 应用的基本构成",
      "MVP",
    ],
    id: "adp-01-android-app-basic-structure-q6",
    level: 3,
    question: "“第1章 Android 应用的基本构成”独立交接至少要包含哪些证据？",
    answer:
      "需要正式目录映射、来源和提交、责任/依赖图、状态与生命周期轨迹、失败反例、测试结果、业务或团队指标、停止与回退条件、责任人和复核人。",
  },
  {
    chapter: "adp-02-mvvm-application-structure",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第2章 MVVM 模式应用构成",
      "ViewModel",
    ],
    id: "adp-02-mvvm-application-structure-q1",
    level: 1,
    question: "“第2章 MVVM 模式应用构成”的正式分母和版本边界是什么？",
    answer:
      "本页以PEAKS最终商品页、官方样章目录和2018年1月31日前官方代码为准；核心任务是用2017版Android Architecture Blueprints的同一TODO规格，解释ViewModel如何暴露可观察状态而不持有View引用，众筹草案和现代Jetpack内容只能作为差异说明。",
  },
  {
    chapter: "adp-02-mvvm-application-structure",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第2章 MVVM 模式应用构成",
      "Data Binding",
    ],
    id: "adp-02-mvvm-application-structure-q2",
    level: 1,
    question: "“第2章 MVVM 模式应用构成”最重要的业务或教学不变量是什么？",
    answer:
      "ViewModel不知道具体Activity或Fragment；用户动作进入ViewModel，状态通过绑定更新View，导航与短暂消息有独立边界",
  },
  {
    chapter: "adp-02-mvvm-application-structure",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第2章 MVVM 模式应用构成",
      "Presentation Model",
    ],
    id: "adp-02-mvvm-application-structure-q3",
    level: 2,
    question: "怎样为“第2章 MVVM 模式应用构成”构造单变量反例？",
    answer:
      "固定业务规格、版本、数据和操作序列，只改变生命周期、异步顺序、共享状态或团队边界中的一个变量；重点验证：把Context、Fragment或Snackbar直接塞进ViewModel会恢复对View的隐式依赖，旋转后产生陈旧引用、重复事件或无法单测的分支",
  },
  {
    chapter: "adp-02-mvvm-application-structure",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第2章 MVVM 模式应用构成",
      "Navigator",
    ],
    id: "adp-02-mvvm-application-structure-q4",
    level: 2,
    question: "“第2章 MVVM 模式应用构成”为什么不能只凭类名或框架名验收？",
    answer:
      "名称不证明依赖方向和状态写权限。必须同时观察对象身份、调用/数据轨迹、生命周期释放、失败恢复以及团队变更事实。",
  },
  {
    chapter: "adp-02-mvvm-application-structure",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第2章 MVVM 模式应用构成",
      "Snackbar事件",
    ],
    id: "adp-02-mvvm-application-structure-q5",
    level: 3,
    question:
      "如何验证“第2章 MVVM 模式应用构成”在旋转、后台和迟到回调下仍正确？",
    answer:
      "为正常、旋转、后台、迟到成功与迟到失败分别保存实例、订阅、状态前后值、UI结果和释放轨迹，再按“ViewModel不知道具体Activity或Fragment；用户动作进入ViewModel，状态通过绑定更新View，导航与短暂消息有独立边界”对账。",
  },
  {
    chapter: "adp-02-mvvm-application-structure",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第2章 MVVM 模式应用构成",
      "ViewModel",
    ],
    id: "adp-02-mvvm-application-structure-q6",
    level: 3,
    question: "“第2章 MVVM 模式应用构成”独立交接至少要包含哪些证据？",
    answer:
      "需要正式目录映射、来源和提交、责任/依赖图、状态与生命周期轨迹、失败反例、测试结果、业务或团队指标、停止与回退条件、责任人和复核人。",
  },
  {
    chapter: "adp-03-mvp-application-structure",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第3章 MVP 模式应用构成",
      "Presenter",
    ],
    id: "adp-03-mvp-application-structure-q1",
    level: 1,
    question: "“第3章 MVP 模式应用构成”的正式分母和版本边界是什么？",
    answer:
      "本页以PEAKS最终商品页、官方样章目录和2018年1月31日前官方代码为准；核心任务是把Presenter作为与Android View隔离的交互协调者，用显式Contract验证输入、状态加载和View更新，众筹草案和现代Jetpack内容只能作为差异说明。",
  },
  {
    chapter: "adp-03-mvp-application-structure",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第3章 MVP 模式应用构成",
      "View Contract",
    ],
    id: "adp-03-mvp-application-structure-q2",
    level: 1,
    question: "“第3章 MVP 模式应用构成”最重要的业务或教学不变量是什么？",
    answer:
      "Presenter只依赖View接口和数据源接口；Activity负责装配，Fragment实现View契约，异步结果回到仍有效的View",
  },
  {
    chapter: "adp-03-mvp-application-structure",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第3章 MVP 模式应用构成",
      "Activity装配",
    ],
    id: "adp-03-mvp-application-structure-q3",
    level: 2,
    question: "怎样为“第3章 MVP 模式应用构成”构造单变量反例？",
    answer:
      "固定业务规格、版本、数据和操作序列，只改变生命周期、异步顺序、共享状态或团队边界中的一个变量；重点验证：若Presenter持有销毁后的Fragment或Contract无限膨胀，显式依赖虽然存在，生命周期泄漏、重复回调和接口噪声仍会失控",
  },
  {
    chapter: "adp-03-mvp-application-structure",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第3章 MVP 模式应用构成",
      "Fragment View",
    ],
    id: "adp-03-mvp-application-structure-q4",
    level: 2,
    question: "“第3章 MVP 模式应用构成”为什么不能只凭类名或框架名验收？",
    answer:
      "名称不证明依赖方向和状态写权限。必须同时观察对象身份、调用/数据轨迹、生命周期释放、失败恢复以及团队变更事实。",
  },
  {
    chapter: "adp-03-mvp-application-structure",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第3章 MVP 模式应用构成",
      "回调边界",
    ],
    id: "adp-03-mvp-application-structure-q5",
    level: 3,
    question:
      "如何验证“第3章 MVP 模式应用构成”在旋转、后台和迟到回调下仍正确？",
    answer:
      "为正常、旋转、后台、迟到成功与迟到失败分别保存实例、订阅、状态前后值、UI结果和释放轨迹，再按“Presenter只依赖View接口和数据源接口；Activity负责装配，Fragment实现View契约，异步结果回到仍有效的View”对账。",
  },
  {
    chapter: "adp-03-mvp-application-structure",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第3章 MVP 模式应用构成",
      "Presenter",
    ],
    id: "adp-03-mvp-application-structure-q6",
    level: 3,
    question: "“第3章 MVP 模式应用构成”独立交接至少要包含哪些证据？",
    answer:
      "需要正式目录映射、来源和提交、责任/依赖图、状态与生命周期轨迹、失败反例、测试结果、业务或团队指标、停止与回退条件、责任人和复核人。",
  },
  {
    chapter: "adp-04-incremental-development-design",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第4章 差分开发中的设计方法",
      "差分開発",
    ],
    id: "adp-04-incremental-development-design-q1",
    level: 1,
    question: "“第4章 差分开发中的设计方法”的正式分母和版本边界是什么？",
    answer:
      "本页以PEAKS最终商品页、官方样章目录和2018年1月31日前官方代码为准；核心任务是在保持既有功能正确的约束下识别多层继承、复杂封装、Fat Activity和历史兼容痕迹，并选择可回退的小步改造，众筹草案和现代Jetpack内容只能作为差异说明。",
  },
  {
    chapter: "adp-04-incremental-development-design",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第4章 差分开发中的设计方法",
      "多段继承",
    ],
    id: "adp-04-incremental-development-design-q2",
    level: 1,
    question: "“第4章 差分开发中的设计方法”最重要的业务或教学不变量是什么？",
    answer:
      "每次改造都保持原有用户行为和数据语义；改善必须降低新成员认知成本、变更范围或状态复杂度，而非只更换框架",
  },
  {
    chapter: "adp-04-incremental-development-design",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第4章 差分开发中的设计方法",
      "Fat Activity",
    ],
    id: "adp-04-incremental-development-design-q3",
    level: 2,
    question: "怎样为“第4章 差分开发中的设计方法”构造单变量反例？",
    answer:
      "固定业务规格、版本、数据和操作序列，只改变生命周期、异步顺序、共享状态或团队边界中的一个变量；重点验证：以一次性重写消除全部历史会同时扩大业务回归面和组织风险；没有表征测试与回退点的静态清除或Rx迁移也不可验证",
  },
  {
    chapter: "adp-04-incremental-development-design",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第4章 差分开发中的设计方法",
      "static撲滅",
    ],
    id: "adp-04-incremental-development-design-q4",
    level: 2,
    question: "“第4章 差分开发中的设计方法”为什么不能只凭类名或框架名验收？",
    answer:
      "名称不证明依赖方向和状态写权限。必须同时观察对象身份、调用/数据轨迹、生命周期释放、失败恢复以及团队变更事实。",
  },
  {
    chapter: "adp-04-incremental-development-design",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第4章 差分开发中的设计方法",
      "RxJava",
    ],
    id: "adp-04-incremental-development-design-q5",
    level: 3,
    question:
      "如何验证“第4章 差分开发中的设计方法”在旋转、后台和迟到回调下仍正确？",
    answer:
      "为正常、旋转、后台、迟到成功与迟到失败分别保存实例、订阅、状态前后值、UI结果和释放轨迹，再按“每次改造都保持原有用户行为和数据语义；改善必须降低新成员认知成本、变更范围或状态复杂度，而非只更换框架”对账。",
  },
  {
    chapter: "adp-04-incremental-development-design",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第4章 差分开发中的设计方法",
      "差分開発",
    ],
    id: "adp-04-incremental-development-design-q6",
    level: 3,
    question: "“第4章 差分开发中的设计方法”独立交接至少要包含哪些证据？",
    answer:
      "需要正式目录映射、来源和提交、责任/依赖图、状态与生命周期轨迹、失败反例、测试结果、业务或团队指标、停止与回退条件、责任人和复核人。",
  },
  {
    chapter: "adp-05-designer-role-in-oss",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第5章 OSS 中设计者的角色",
      "DroidKaigi 2017",
    ],
    id: "adp-05-designer-role-in-oss-q1",
    level: 1,
    question: "“第5章 OSS 中设计者的角色”的正式分母和版本边界是什么？",
    answer:
      "本页以PEAKS最终商品页、官方样章目录和2018年1月31日前官方代码为准；核心任务是从67场会议、60多名贡献者和250多个PR的协作现实，推导降低决策数量、保持可学习性和稳定合并边界的设计，众筹草案和现代Jetpack内容只能作为差异说明。",
  },
  {
    chapter: "adp-05-designer-role-in-oss",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第5章 OSS 中设计者的角色",
      "OSS贡献者",
    ],
    id: "adp-05-designer-role-in-oss-q2",
    level: 1,
    question: "“第5章 OSS 中设计者的角色”最重要的业务或教学不变量是什么？",
    answer:
      "新贡献者能沿一致包结构、数据入口和导航边界完成小改动；设计意图可从代码、Issue和评审证据恢复",
  },
  {
    chapter: "adp-05-designer-role-in-oss",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第5章 OSS 中设计者的角色",
      "Repository",
    ],
    id: "adp-05-designer-role-in-oss-q3",
    level: 2,
    question: "怎样为“第5章 OSS 中设计者的角色”构造单变量反例？",
    answer:
      "固定业务规格、版本、数据和操作序列，只改变生命周期、异步顺序、共享状态或团队边界中的一个变量；重点验证：为了展示技巧而引入过多抽象，会把OSS习作价值变成入门门槛；Base类、UseCase或Rx若没有明确问题只会隐藏控制流",
  },
  {
    chapter: "adp-05-designer-role-in-oss",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第5章 OSS 中设计者的角色",
      "Navigator",
    ],
    id: "adp-05-designer-role-in-oss-q4",
    level: 2,
    question: "“第5章 OSS 中设计者的角色”为什么不能只凭类名或框架名验收？",
    answer:
      "名称不证明依赖方向和状态写权限。必须同时观察对象身份、调用/数据轨迹、生命周期释放、失败恢复以及团队变更事实。",
  },
  {
    chapter: "adp-05-designer-role-in-oss",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第5章 OSS 中设计者的角色",
      "UseCase",
    ],
    id: "adp-05-designer-role-in-oss-q5",
    level: 3,
    question:
      "如何验证“第5章 OSS 中设计者的角色”在旋转、后台和迟到回调下仍正确？",
    answer:
      "为正常、旋转、后台、迟到成功与迟到失败分别保存实例、订阅、状态前后值、UI结果和释放轨迹，再按“新贡献者能沿一致包结构、数据入口和导航边界完成小改动；设计意图可从代码、Issue和评审证据恢复”对账。",
  },
  {
    chapter: "adp-05-designer-role-in-oss",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第5章 OSS 中设计者的角色",
      "DroidKaigi 2017",
    ],
    id: "adp-05-designer-role-in-oss-q6",
    level: 3,
    question: "“第5章 OSS 中设计者的角色”独立交接至少要包含哪些证据？",
    answer:
      "需要正式目录映射、来源和提交、责任/依赖图、状态与生命周期轨迹、失败反例、测试结果、业务或团队指标、停止与回退条件、责任人和复核人。",
  },
  {
    chapter: "adp-06-flux-architecture",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第6章 Flux 架构",
      "Action",
    ],
    id: "adp-06-flux-architecture-q1",
    level: 1,
    question: "“第6章 Flux 架构”的正式分母和版本边界是什么？",
    answer:
      "本页以PEAKS最终商品页、官方样章目录和2018年1月31日前官方代码为准；核心任务是让用户动作和外部结果都形成Action，经Dispatcher按序进入Store，由Store产生新状态再通知View，众筹草案和现代Jetpack内容只能作为差异说明。",
  },
  {
    chapter: "adp-06-flux-architecture",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第6章 Flux 架构",
      "Dispatcher",
    ],
    id: "adp-06-flux-architecture-q2",
    level: 1,
    question: "“第6章 Flux 架构”最重要的业务或教学不变量是什么？",
    answer:
      "状态只能在Store内改变；每次变化都能追溯到Action，View不绕过Action直接改Store，异步副作用不制造第二条隐式数据流",
  },
  {
    chapter: "adp-06-flux-architecture",
    tags: ["Android应用设计模式入门", "2018正式版", "第6章 Flux 架构", "Store"],
    id: "adp-06-flux-architecture-q3",
    level: 2,
    question: "怎样为“第6章 Flux 架构”构造单变量反例？",
    answer:
      "固定业务规格、版本、数据和操作序列，只改变生命周期、异步顺序、共享状态或团队边界中的一个变量；重点验证：把EventBus的任意事件都称为Flux会形成多向广播；若Store互相写入或View直接更新模型，顺序、重放和故障定位都会失效",
  },
  {
    chapter: "adp-06-flux-architecture",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第6章 Flux 架构",
      "单向数据流",
    ],
    id: "adp-06-flux-architecture-q4",
    level: 2,
    question: "“第6章 Flux 架构”为什么不能只凭类名或框架名验收？",
    answer:
      "名称不证明依赖方向和状态写权限。必须同时观察对象身份、调用/数据轨迹、生命周期释放、失败恢复以及团队变更事实。",
  },
  {
    chapter: "adp-06-flux-architecture",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第6章 Flux 架构",
      "Repository",
    ],
    id: "adp-06-flux-architecture-q5",
    level: 3,
    question: "如何验证“第6章 Flux 架构”在旋转、后台和迟到回调下仍正确？",
    answer:
      "为正常、旋转、后台、迟到成功与迟到失败分别保存实例、订阅、状态前后值、UI结果和释放轨迹，再按“状态只能在Store内改变；每次变化都能追溯到Action，View不绕过Action直接改Store，异步副作用不制造第二条隐式数据流”对账。",
  },
  {
    chapter: "adp-06-flux-architecture",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第6章 Flux 架构",
      "Action",
    ],
    id: "adp-06-flux-architecture-q6",
    level: 3,
    question: "“第6章 Flux 架构”独立交接至少要包含哪些证据？",
    answer:
      "需要正式目录映射、来源和提交、责任/依赖图、状态与生命周期轨迹、失败反例、测试结果、业务或团队指标、停止与回退条件、责任人和复核人。",
  },
  {
    chapter: "adp-07-team-and-architecture",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第7章 团队与架构",
      "分层架构",
    ],
    id: "adp-07-team-and-architecture-q1",
    level: 1,
    question: "“第7章 团队与架构”的正式分母和版本边界是什么？",
    answer:
      "本页以PEAKS最终商品页、官方样章目录和2018年1月31日前官方代码为准；核心任务是把架构当作团队协作协议：一条路径解决既有开发痛点，另一条路径在三个月内替换运营三年的应用，众筹草案和现代Jetpack内容只能作为差异说明。",
  },
  {
    chapter: "adp-07-team-and-architecture",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第7章 团队与架构",
      "依赖注入",
    ],
    id: "adp-07-team-and-architecture-q2",
    level: 1,
    question: "“第7章 团队与架构”最重要的业务或教学不变量是什么？",
    answer:
      "技术边界必须与团队边界、交付期限和功能风险对齐；Native与React Native切换时导航、会话和返回语义保持一致",
  },
  {
    chapter: "adp-07-team-and-architecture",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第7章 团队与架构",
      "React Native",
    ],
    id: "adp-07-team-and-architecture-q3",
    level: 2,
    question: "怎样为“第7章 团队与架构”构造单变量反例？",
    answer:
      "固定业务规格、版本、数据和操作序列，只改变生命周期、异步顺序、共享状态或团队边界中的一个变量；重点验证：只因跨平台流行而全量迁移会把桥接、调试和技能成本留给团队；依赖注入若不说明作用域也会制造跨生命周期对象泄漏",
  },
  {
    chapter: "adp-07-team-and-architecture",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第7章 团队与架构",
      "混合应用",
    ],
    id: "adp-07-team-and-architecture-q4",
    level: 2,
    question: "“第7章 团队与架构”为什么不能只凭类名或框架名验收？",
    answer:
      "名称不证明依赖方向和状态写权限。必须同时观察对象身份、调用/数据轨迹、生命周期释放、失败恢复以及团队变更事实。",
  },
  {
    chapter: "adp-07-team-and-architecture",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第7章 团队与架构",
      "团队认知",
    ],
    id: "adp-07-team-and-architecture-q5",
    level: 3,
    question: "如何验证“第7章 团队与架构”在旋转、后台和迟到回调下仍正确？",
    answer:
      "为正常、旋转、后台、迟到成功与迟到失败分别保存实例、订阅、状态前后值、UI结果和释放轨迹，再按“技术边界必须与团队边界、交付期限和功能风险对齐；Native与React Native切换时导航、会话和返回语义保持一致”对账。",
  },
  {
    chapter: "adp-07-team-and-architecture",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第7章 团队与架构",
      "分层架构",
    ],
    id: "adp-07-team-and-architecture-q6",
    level: 3,
    question: "“第7章 团队与架构”独立交接至少要包含哪些证据？",
    answer:
      "需要正式目录映射、来源和提交、责任/依赖图、状态与生命周期轨迹、失败反例、测试结果、业务或团队指标、停止与回退条件、责任人和复核人。",
  },
  {
    chapter: "adp-08-android-architecture-components",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第8章 Android Architecture Components",
      "Lifecycle",
    ],
    id: "adp-08-android-architecture-components-q1",
    level: 1,
    question:
      "“第8章 Android Architecture Components”的正式分母和版本边界是什么？",
    answer:
      "本页以PEAKS最终商品页、官方样章目录和2018年1月31日前官方代码为准；核心任务是用生命周期感知组件移除Activity/Fragment中的手工转发，让ViewModel跨配置变更保存页面状态，让LiveData只向活跃观察者分发，众筹草案和现代Jetpack内容只能作为差异说明。",
  },
  {
    chapter: "adp-08-android-architecture-components",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第8章 Android Architecture Components",
      "LifecycleObserver",
    ],
    id: "adp-08-android-architecture-components-q2",
    level: 1,
    question:
      "“第8章 Android Architecture Components”最重要的业务或教学不变量是什么？",
    answer:
      "观察者的活跃状态由Lifecycle决定；配置变更不重建ViewModel业务状态，最终销毁会释放作用域，LiveData只承载可观察数据而非任意事件总线",
  },
  {
    chapter: "adp-08-android-architecture-components",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第8章 Android Architecture Components",
      "ViewModel",
    ],
    id: "adp-08-android-architecture-components-q3",
    level: 2,
    question: "怎样为“第8章 Android Architecture Components”构造单变量反例？",
    answer:
      "固定业务规格、版本、数据和操作序列，只改变生命周期、异步顺序、共享状态或团队边界中的一个变量；重点验证：把本章现代化为Compose、Flow、Hilt或Navigation会破坏版本忠实度；把LiveData用于不可重放的一次性动作又会在旋转后重复消费",
  },
  {
    chapter: "adp-08-android-architecture-components",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第8章 Android Architecture Components",
      "LiveData",
    ],
    id: "adp-08-android-architecture-components-q4",
    level: 2,
    question:
      "“第8章 Android Architecture Components”为什么不能只凭类名或框架名验收？",
    answer:
      "名称不证明依赖方向和状态写权限。必须同时观察对象身份、调用/数据轨迹、生命周期释放、失败恢复以及团队变更事实。",
  },
  {
    chapter: "adp-08-android-architecture-components",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第8章 Android Architecture Components",
      "活跃观察者",
    ],
    id: "adp-08-android-architecture-components-q5",
    level: 3,
    question:
      "如何验证“第8章 Android Architecture Components”在旋转、后台和迟到回调下仍正确？",
    answer:
      "为正常、旋转、后台、迟到成功与迟到失败分别保存实例、订阅、状态前后值、UI结果和释放轨迹，再按“观察者的活跃状态由Lifecycle决定；配置变更不重建ViewModel业务状态，最终销毁会释放作用域，LiveData只承载可观察数据而非任意事件总线”对账。",
  },
  {
    chapter: "adp-08-android-architecture-components",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "第8章 Android Architecture Components",
      "Lifecycle",
    ],
    id: "adp-08-android-architecture-components-q6",
    level: 3,
    question:
      "“第8章 Android Architecture Components”独立交接至少要包含哪些证据？",
    answer:
      "需要正式目录映射、来源和提交、责任/依赖图、状态与生命周期轨迹、失败反例、测试结果、业务或团队指标、停止与回退条件、责任人和复核人。",
  },
  {
    chapter: "adp-afterword",
    tags: ["Android应用设计模式入门", "2018正式版", "おわりに（后记）", "謝辞"],
    id: "adp-afterword-q1",
    level: 1,
    question: "“おわりに（后记）”的正式分母和版本边界是什么？",
    answer:
      "本页以PEAKS最终商品页、官方样章目录和2018年1月31日前官方代码为准；核心任务是确认这本多作者实践集的知识来自具体团队、项目和审阅协作，并保留代码、文字、商标与第三方材料的权利边界，众筹草案和现代Jetpack内容只能作为差异说明。",
  },
  {
    chapter: "adp-afterword",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "おわりに（后记）",
      "権利表記",
    ],
    id: "adp-afterword-q2",
    level: 1,
    question: "“おわりに（后记）”最重要的业务或教学不变量是什么？",
    answer:
      "任何复用都能说明来源、改写范围、许可证和版本；贡献者的经验被归因，课程不暗示替代或复制原书",
  },
  {
    chapter: "adp-afterword",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "おわりに（后记）",
      "多作者协作",
    ],
    id: "adp-afterword-q3",
    level: 2,
    question: "怎样为“おわりに（后记）”构造单变量反例？",
    answer:
      "固定业务规格、版本、数据和操作序列，只改变生命周期、异步顺序、共享状态或团队边界中的一个变量；重点验证：去掉致谢和权利信息会让案例看似无来源的通用真理，也可能把Apache代码、项目商标和作者文字错误地视为同一许可",
  },
  {
    chapter: "adp-afterword",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "おわりに（后记）",
      "许可证",
    ],
    id: "adp-afterword-q4",
    level: 2,
    question: "“おわりに（后记）”为什么不能只凭类名或框架名验收？",
    answer:
      "名称不证明依赖方向和状态写权限。必须同时观察对象身份、调用/数据轨迹、生命周期释放、失败恢复以及团队变更事实。",
  },
  {
    chapter: "adp-afterword",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "おわりに（后记）",
      "改编边界",
    ],
    id: "adp-afterword-q5",
    level: 3,
    question: "如何验证“おわりに（后记）”在旋转、后台和迟到回调下仍正确？",
    answer:
      "为正常、旋转、后台、迟到成功与迟到失败分别保存实例、订阅、状态前后值、UI结果和释放轨迹，再按“任何复用都能说明来源、改写范围、许可证和版本；贡献者的经验被归因，课程不暗示替代或复制原书”对账。",
  },
  {
    chapter: "adp-afterword",
    tags: ["Android应用设计模式入门", "2018正式版", "おわりに（后记）", "謝辞"],
    id: "adp-afterword-q6",
    level: 3,
    question: "“おわりに（后记）”独立交接至少要包含哪些证据？",
    answer:
      "需要正式目录映射、来源和提交、责任/依赖图、状态与生命周期轨迹、失败反例、测试结果、业务或团队指标、停止与回退条件、责任人和复核人。",
  },
  {
    chapter: "adp-index",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "索引（概念检索矩阵）",
      "职责检索",
    ],
    id: "adp-index-q1",
    level: 1,
    question: "“索引（概念检索矩阵）”的正式分母和版本边界是什么？",
    answer:
      "本页以PEAKS最终商品页、官方样章目录和2018年1月31日前官方代码为准；核心任务是把索引从名词列表变成问题到章节、模式、反例和证据的双向检索矩阵，众筹草案和现代Jetpack内容只能作为差异说明。",
  },
  {
    chapter: "adp-index",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "索引（概念检索矩阵）",
      "数据流检索",
    ],
    id: "adp-index-q2",
    level: 1,
    question: "“索引（概念检索矩阵）”最重要的业务或教学不变量是什么？",
    answer:
      "每个核心词都能定位首次定义、实践章节、对照模式、典型失败和验收证据；同名概念不会跨版本偷换含义",
  },
  {
    chapter: "adp-index",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "索引（概念检索矩阵）",
      "生命周期检索",
    ],
    id: "adp-index-q3",
    level: 2,
    question: "怎样为“索引（概念检索矩阵）”构造单变量反例？",
    answer:
      "固定业务规格、版本、数据和操作序列，只改变生命周期、异步顺序、共享状态或团队边界中的一个变量；重点验证：只按字母列名词会把MVP、MVVM、Flux和Architecture Components割裂，读者无法从实际问题反查决策依据",
  },
  {
    chapter: "adp-index",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "索引（概念检索矩阵）",
      "团队检索",
    ],
    id: "adp-index-q4",
    level: 2,
    question: "“索引（概念检索矩阵）”为什么不能只凭类名或框架名验收？",
    answer:
      "名称不证明依赖方向和状态写权限。必须同时观察对象身份、调用/数据轨迹、生命周期释放、失败恢复以及团队变更事实。",
  },
  {
    chapter: "adp-index",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "索引（概念检索矩阵）",
      "版本检索",
    ],
    id: "adp-index-q5",
    level: 3,
    question: "如何验证“索引（概念检索矩阵）”在旋转、后台和迟到回调下仍正确？",
    answer:
      "为正常、旋转、后台、迟到成功与迟到失败分别保存实例、订阅、状态前后值、UI结果和释放轨迹，再按“每个核心词都能定位首次定义、实践章节、对照模式、典型失败和验收证据；同名概念不会跨版本偷换含义”对账。",
  },
  {
    chapter: "adp-index",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "索引（概念检索矩阵）",
      "职责检索",
    ],
    id: "adp-index-q6",
    level: 3,
    question: "“索引（概念检索矩阵）”独立交接至少要包含哪些证据？",
    answer:
      "需要正式目录映射、来源和提交、责任/依赖图、状态与生命周期轨迹、失败反例、测试结果、业务或团队指标、停止与回退条件、责任人和复核人。",
  },
  {
    chapter: "adp-author-profiles",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "著者紹介（作者与案例责任）",
      "日高正博",
    ],
    id: "adp-author-profiles-q1",
    level: 1,
    question: "“著者紹介（作者与案例责任）”的正式分母和版本边界是什么？",
    answer:
      "本页以PEAKS最终商品页、官方样章目录和2018年1月31日前官方代码为准；核心任务是用最终商品页和样章作者页建立作者、章节、项目案例和可验证来源之间的关系，众筹草案和现代Jetpack内容只能作为差异说明。",
  },
  {
    chapter: "adp-author-profiles",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "著者紹介（作者与案例责任）",
      "小西裕介",
    ],
    id: "adp-author-profiles-q2",
    level: 1,
    question: "“著者紹介（作者与案例责任）”最重要的业务或教学不变量是什么？",
    answer:
      "最终成书作者固定为日高正博、小西裕介、藤原聖、吉岡毅、今井智章；章节观点按实际署名归因",
  },
  {
    chapter: "adp-author-profiles",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "著者紹介（作者与案例责任）",
      "藤原聖",
    ],
    id: "adp-author-profiles-q3",
    level: 2,
    question: "怎样为“著者紹介（作者与案例责任）”构造单变量反例？",
    answer:
      "固定业务规格、版本、数据和操作序列，只改变生命周期、异步顺序、共享状态或团队边界中的一个变量；重点验证：复制众筹页会错误列入八木俊広并错配章节；把所有案例统一归于TechBooster也会抹去Mercari、DroidKaigi与CyberAgent的实践语境",
  },
  {
    chapter: "adp-author-profiles",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "著者紹介（作者与案例责任）",
      "吉岡毅",
    ],
    id: "adp-author-profiles-q4",
    level: 2,
    question: "“著者紹介（作者与案例责任）”为什么不能只凭类名或框架名验收？",
    answer:
      "名称不证明依赖方向和状态写权限。必须同时观察对象身份、调用/数据轨迹、生命周期释放、失败恢复以及团队变更事实。",
  },
  {
    chapter: "adp-author-profiles",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "著者紹介（作者与案例责任）",
      "今井智章",
    ],
    id: "adp-author-profiles-q5",
    level: 3,
    question:
      "如何验证“著者紹介（作者与案例责任）”在旋转、后台和迟到回调下仍正确？",
    answer:
      "为正常、旋转、后台、迟到成功与迟到失败分别保存实例、订阅、状态前后值、UI结果和释放轨迹，再按“最终成书作者固定为日高正博、小西裕介、藤原聖、吉岡毅、今井智章；章节观点按实际署名归因”对账。",
  },
  {
    chapter: "adp-author-profiles",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "著者紹介（作者与案例责任）",
      "日高正博",
    ],
    id: "adp-author-profiles-q6",
    level: 3,
    question: "“著者紹介（作者与案例责任）”独立交接至少要包含哪些证据？",
    answer:
      "需要正式目录映射、来源和提交、责任/依赖图、状态与生命周期轨迹、失败反例、测试结果、业务或团队指标、停止与回退条件、责任人和复核人。",
  },
  {
    chapter: "adp-official-final-review",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "2018年正式版总复习",
      "控制变量",
    ],
    id: "adp-official-final-review-q1",
    level: 1,
    question: "“2018年正式版总复习”的正式分母和版本边界是什么？",
    answer:
      "本页以PEAKS最终商品页、官方样章目录和2018年1月31日前官方代码为准；核心任务是从同一TODO规格出发，在MVP、MVVM、Flux和早期Architecture Components之间做约束驱动选择，再用真实团队案例校验演进成本，众筹草案和现代Jetpack内容只能作为差异说明。",
  },
  {
    chapter: "adp-official-final-review",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "2018年正式版总复习",
      "依赖方向",
    ],
    id: "adp-official-final-review-q2",
    level: 1,
    question: "“2018年正式版总复习”最重要的业务或教学不变量是什么？",
    answer:
      "决策必须说明问题、约束、候选、依赖方向、状态所有者、生命周期、失败反例、团队成本、验证结果和回退条件",
  },
  {
    chapter: "adp-official-final-review",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "2018年正式版总复习",
      "状态所有权",
    ],
    id: "adp-official-final-review-q3",
    level: 2,
    question: "怎样为“2018年正式版总复习”构造单变量反例？",
    answer:
      "固定业务规格、版本、数据和操作序列，只改变生命周期、异步顺序、共享状态或团队边界中的一个变量；重点验证：用流行度或框架名称代替决策会同时忽略平台生命周期、既有代码、贡献者结构和版本边界，最终只能得到不可证伪的架构宣言",
  },
  {
    chapter: "adp-official-final-review",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "2018年正式版总复习",
      "团队约束",
    ],
    id: "adp-official-final-review-q4",
    level: 2,
    question: "“2018年正式版总复习”为什么不能只凭类名或框架名验收？",
    answer:
      "名称不证明依赖方向和状态写权限。必须同时观察对象身份、调用/数据轨迹、生命周期释放、失败恢复以及团队变更事实。",
  },
  {
    chapter: "adp-official-final-review",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "2018年正式版总复习",
      "证据闭环",
    ],
    id: "adp-official-final-review-q5",
    level: 3,
    question: "如何验证“2018年正式版总复习”在旋转、后台和迟到回调下仍正确？",
    answer:
      "为正常、旋转、后台、迟到成功与迟到失败分别保存实例、订阅、状态前后值、UI结果和释放轨迹，再按“决策必须说明问题、约束、候选、依赖方向、状态所有者、生命周期、失败反例、团队成本、验证结果和回退条件”对账。",
  },
  {
    chapter: "adp-official-final-review",
    tags: [
      "Android应用设计模式入门",
      "2018正式版",
      "2018年正式版总复习",
      "控制变量",
    ],
    id: "adp-official-final-review-q6",
    level: 3,
    question: "“2018年正式版总复习”独立交接至少要包含哪些证据？",
    answer:
      "需要正式目录映射、来源和提交、责任/依赖图、状态与生命周期轨迹、失败反例、测试结果、业务或团队指标、停止与回退条件、责任人和复核人。",
  },
];
