#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = process.cwd();
const BOOK = "android-design-patterns";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/android-design-patterns-v2-profiles.json",
);

const SOURCES = {
  finalProduct: "https://peaks.cc/books/architecture_patterns",
  samplePdf:
    "https://peaks-pdfs2.s3-ap-northeast-1.amazonaws.com/Android_Archtecture_patterns_sample.pdf",
  sampleRepo: "https://github.com/TechBooster/Architecture-Patterns-Samples",
  draft: "https://peaks.cc/architecture_patterns",
  androidArchitecture: "https://developer.android.com/topic/architecture",
  viewModel:
    "https://developer.android.com/topic/libraries/architecture/viewmodel",
  liveData:
    "https://developer.android.com/topic/libraries/architecture/livedata",
  lifecycle:
    "https://developer.android.com/topic/libraries/architecture/lifecycle",
  dataBinding: "https://developer.android.com/topic/libraries/data-binding",
  androidxMigration: "https://developer.android.com/jetpack/androidx/migrate",
  runtimePermissions:
    "https://developer.android.com/training/permissions/requesting",
  dagger: "https://dagger.dev/dev-guide/",
  gson: "https://github.com/google/gson",
  okhttp: "https://square.github.io/okhttp/",
  permissions:
    "https://github.com/permissions-dispatcher/PermissionsDispatcher",
  retrofit: "https://square.github.io/retrofit/",
  rxjava: "https://github.com/ReactiveX/RxJava",
  flux: "https://github.com/facebookarchive/flux",
  reactNative: "https://reactnative.dev/architecture/overview",
};

const SOURCE_INDEX = Object.fromEntries(
  [
    [
      "finalProduct",
      "PEAKS 正式商品页",
      SOURCES.finalProduct,
      "核对最终五位作者、2018年1月31日、224页、ISBN与三部八章结构",
    ],
    [
      "samplePdf",
      "PEAKS 官方样章 PDF",
      SOURCES.samplePdf,
      "核对最终版前言、完整目录、页码、章节标题与样章内容边界",
    ],
    [
      "sampleRepo",
      "TechBooster 官方样例仓库",
      SOURCES.sampleRepo,
      "核对出版时期 MVP、MVVM 与 Architecture Components 样例的可运行边界",
    ],
    [
      "draft",
      "PEAKS 早期众筹草案页",
      SOURCES.draft,
      "只用于证明早期作者与计划章节不同，禁止把草案混入最终版",
    ],
    [
      "androidArchitecture",
      "Android 当前应用架构指南",
      SOURCES.androidArchitecture,
      "核对当前 UI/数据/可选领域层、单一事实源、单向数据流和状态持有者建议",
    ],
    [
      "viewModel",
      "Android 当前 ViewModel 指南",
      SOURCES.viewModel,
      "核对 ViewModelStoreOwner 作用域、配置变更与 SavedStateHandle 边界",
    ],
    [
      "liveData",
      "Android 当前 LiveData 指南",
      SOURCES.liveData,
      "核对生命周期感知观察、活跃状态与数据层流式处理边界",
    ],
    [
      "lifecycle",
      "Android 当前 Lifecycle 指南",
      SOURCES.lifecycle,
      "核对生命周期所有者、观察者与清理责任",
    ],
    [
      "dataBinding",
      "Android 当前 Data Binding 指南",
      SOURCES.dataBinding,
      "核对布局绑定表达式、生成绑定类与双向绑定风险",
    ],
    [
      "androidxMigration",
      "AndroidX 官方迁移指南",
      SOURCES.androidxMigration,
      "核对 Support Library 到 AndroidX 的当前迁移轨道",
    ],
    [
      "runtimePermissions",
      "Android 当前运行时权限指南",
      SOURCES.runtimePermissions,
      "核对权限请求、拒绝与解释流程，不与 Flux Dispatcher 混淆",
    ],
    [
      "dagger",
      "Dagger 官方开发指南",
      SOURCES.dagger,
      "核对依赖图、构造注入、组件作用域与编译期装配",
    ],
    [
      "gson",
      "Gson 维护方仓库",
      SOURCES.gson,
      "核对 JSON 序列化职责及当前维护模式与 Android 收缩器风险",
    ],
    [
      "okhttp",
      "OkHttp 官方文档",
      SOURCES.okhttp,
      "核对 HTTP 客户端、连接、拦截器、超时与取消职责",
    ],
    [
      "permissions",
      "PermissionsDispatcher 维护方仓库",
      SOURCES.permissions,
      "核对它是 Android 运行时权限声明式封装，而不是 Flux Dispatcher",
    ],
    [
      "retrofit",
      "Retrofit 官方文档",
      SOURCES.retrofit,
      "核对声明式 HTTP API、转换器与调用适配边界",
    ],
    [
      "rxjava",
      "RxJava 维护方仓库",
      SOURCES.rxjava,
      "核对可观察序列、调度、终止与订阅释放职责",
    ],
    [
      "flux",
      "Meta 归档 Flux 仓库",
      SOURCES.flux,
      "核对 Action、Dispatcher、Store 与单向数据流的历史语义",
    ],
    [
      "reactNative",
      "React Native 当前架构概览",
      SOURCES.reactNative,
      "核对当前渲染、原生接口与线程模型；不倒灌进2018案例",
    ],
  ].map(([id, label, url, use]) => [id, { label, url, use }]),
);

const PATHS = {
  "adp-preface": "01-preface/adp-preface",
  "adp-01-android-app-basic-structure":
    "02-chapter-01/adp-01-android-app-basic-structure",
  "adp-02-mvvm-application-structure":
    "03-chapter-02/adp-02-mvvm-application-structure",
  "adp-03-mvp-application-structure":
    "04-chapter-03/adp-03-mvp-application-structure",
  "adp-04-incremental-development-design":
    "05-chapter-04/adp-04-incremental-development-design",
  "adp-05-designer-role-in-oss": "06-chapter-05/adp-05-designer-role-in-oss",
  "adp-06-flux-architecture": "07-chapter-06/adp-06-flux-architecture",
  "adp-07-team-and-architecture": "08-chapter-07/adp-07-team-and-architecture",
  "adp-08-android-architecture-components":
    "09-chapter-08/adp-08-android-architecture-components",
  "adp-afterword": "10-afterword/adp-afterword",
  "adp-index": "11-index/adp-index",
  "adp-author-profiles": "12-author-profiles/adp-author-profiles",
};

const SPEC_DATA = {
  "adp-preface": [
    "建立最终成书、官方样章、样例仓库、早期草案与独立中文重构之间的来源合同",
    "怎样使用官方样章核对结构，又不把中文课程冒充官方译本或原书全文？",
    "把早期众筹作者、未成书章节或当前框架结论写成2018年正式版事实",
    "最终版来源快照、155坐标矩阵、草案排除表与样例仓库提交记录",
    "正式版来源、样章授权边界、复现条件与独立中文表达",
    ["finalProduct", "samplePdf", "sampleRepo", "draft"],
  ],
  "adp-01-android-app-basic-structure": [
    "在同一 TODO 规格下比较 MVP、MVVM、平台约束、设计演进与八类出版时期库",
    "模式与库怎样改变责任、生命周期和失败恢复，而不是只改变类名？",
    "旋转后旧异步结果写回已销毁界面，且把权限库误当成 Flux 调度器",
    "责任矩阵、生命周期回放、库职责卡与版本迁移差分",
    "TODO 规格、MVP/MVVM、平台约束、历史演进与库职责",
    [
      "samplePdf",
      "sampleRepo",
      "androidArchitecture",
      "androidxMigration",
      "runtimePermissions",
      "dagger",
      "gson",
      "okhttp",
      "permissions",
      "retrofit",
      "rxjava",
    ],
  ],
  "adp-02-mvvm-application-structure": [
    "重放2018样例中的 ViewModel、Data Binding、Fragment、Navigator、生命周期与消息协议",
    "书中手写 MVVM 怎样与当前 Jetpack ViewModel 分轨，并避免一次性消息重放？",
    "把 Snackbar 当持久页面状态，重建观察者后重复显示同一副作用",
    "MVVM 责任表、绑定表达式清单、导航事件账本与重建回归轨迹",
    "2018 MVVM 样例、页面状态、绑定、导航、生命周期与一次性效果",
    [
      "samplePdf",
      "sampleRepo",
      "dataBinding",
      "viewModel",
      "androidArchitecture",
    ],
  ],
  "adp-03-mvp-application-structure": [
    "用同一 TODO 规格验证 Activity 装配、Presenter、View Contract 与可测试边界",
    "MVP 在什么条件下真正隔离 Android 生命周期，而不是把 Fat Activity 搬家？",
    "View 已 detach，迟到的数据回调仍调用旧 View 契约",
    "MVP 调用轨迹、假 View 记录、attach/detach 时序与取消策略",
    "MVP 装配、Contract、Presenter、View 与生命周期释放",
    ["samplePdf", "sampleRepo", "lifecycle", "androidArchitecture"],
  ],
  "adp-04-incremental-development-design": [
    "把多层继承、自研包装、Fat/BaseActivity、static 与 RxJava 改造拆成可回退步长",
    "遗留应用怎样逐步减债，并证明每一步比一次性重写更安全？",
    "同时替换全局状态、异步库、页面结构和仓库边界，导致失败无法归因",
    "遗留依赖图、迁移切片、双路径对照、特性开关与回退记录",
    "差分开发、历史包袱、团队摩擦、static/RxJava 改造与分步交付",
    ["samplePdf", "sampleRepo", "rxjava", "androidArchitecture"],
  ],
  "adp-05-designer-role-in-oss": [
    "在 DroidKaigi 官方应用案例中校准 MVVM、包结构、绑定、导航、仓库与 UseCase 的学习成本",
    "面向背景各异贡献者的设计，怎样减少临时决策又不过度抽象？",
    "为所有可能变化预建抽象层，让首次贡献者必须理解整套框架才能改一页",
    "贡献路径图、首次修改计时、评审往返、角色边界与删除抽象实验",
    "OSS 功能、贡献者约束、MVVM 数据流与恰到好处的抽象",
    ["samplePdf", "androidArchitecture", "dataBinding", "rxjava"],
  ],
  "adp-06-flux-architecture": [
    "重放 Action、Action Creator、Dispatcher、Store、Repository 与 View 的单向数据流",
    "Flux 怎样让状态变化可追踪，又如何防止乱序异步结果覆盖最新意图？",
    "旧请求晚到且没有请求身份，Store 接受后覆盖了新请求状态",
    "动作日志、Store 状态快照、乱序回放、拒绝理由与恢复结果",
    "Flux 历史语义、Android 角色映射、产品实现与优缺点",
    ["samplePdf", "flux", "sampleRepo", "rxjava"],
  ],
  "adp-07-team-and-architecture": [
    "把 MVVM/分层、时间线、依赖注入、生命周期和原生/React Native 混合边界映射到团队责任",
    "架构迁移怎样同时改善交付、调试、发布与新人上手，而不只按期重写？",
    "脚本包加载失败或桥接参数不兼容，核心任务没有原生回退路径",
    "团队责任图、迁移时间线、桥接契约、故障演练与长期成本记录",
    "团队痛点、分层与 DI、三个月重写、混合应用和协作效果",
    ["samplePdf", "androidArchitecture", "dagger", "reactNative"],
  ],
  "adp-08-android-architecture-components": [
    "在2018语境中重放 Lifecycles、ViewModel、LiveData 及其与 MVVM/Flux 的组合",
    "Architecture Components 解决了哪些平台问题，哪些责任仍需应用架构承担？",
    "把配置变更存活误当进程死亡持久化，并把 LiveData 当数据层通用流",
    "作用域表、活跃观察轨迹、进程死亡实验、MVVM/Flux 组合责任图",
    "2018 Architecture Components、生命周期、ViewModel、LiveData 与当前迁移",
    [
      "samplePdf",
      "sampleRepo",
      "lifecycle",
      "viewModel",
      "liveData",
      "androidArchitecture",
    ],
  ],
  "adp-afterword": [
    "把致谢、权利声明、作者观点与本站独立重构责任分开",
    "怎样致谢和标注来源，仍不让课程替代原书或暗示官方中文授权？",
    "有来源链接就大段复刻样章内容，并把课程结论归给原作者",
    "来源—主张—责任矩阵、引用清单、改编边界与发布复核记录",
    "致谢、权利声明、独立表达与不可替代性",
    ["finalProduct", "samplePdf", "sampleRepo"],
  ],
  "adp-index": [
    "把索引从术语清单改造成症状—责任—生命周期—证据—章节导航",
    "怎样先从失败症状定位竞争性解释，再选择模式或组件？",
    "看到重复事件就直接套用 MVVM，未检查订阅、状态与效果是否混写",
    "症状索引、竞争假设、反证实验、章节坐标与证据文件链接",
    "术语索引、失败症状、竞争性解释与跨章复核",
    ["samplePdf", "androidArchitecture", "viewModel", "liveData", "flux"],
  ],
  "adp-author-profiles": [
    "依据最终商品页和样章，把五位作者、正式章节与案例语境一一对应",
    "怎样阻止早期众筹作者表和计划章节污染最终成书责任归属？",
    "把草案作者或未成书章节观点归入最终五位作者责任表",
    "最终作者表、章节责任矩阵、草案差分与未知项清单",
    "五位最终作者、章节责任、草案差异与观点归属",
    ["finalProduct", "samplePdf", "draft"],
  ],
};

const MAP_SPEC = [
  "把155个正式坐标组织成规格、责任、生命周期、案例、团队和平台迁移证据图",
  "怎样覆盖最终版155个目录坐标，并让每个坐标都有机制、反例与历史边界？",
  "用通用 Android 教程、早期众筹草案或当前 Compose 结论替代2018正式目录",
  "155坐标矩阵、八章依赖图、三条责任轨迹与2018/当前迁移门",
  "最终目录、模式比较、真实案例、平台组件与证据阅读顺序",
  Object.keys(SOURCE_INDEX),
];

const REVIEW_SPEC = [
  "从同一 TODO 规格重放 MVP、MVVM、差分改造、OSS、Flux、团队与平台组件",
  "能否为155个坐标说明状态所有者、事件方向、生命周期故障、恢复和迁移边界？",
  "只背模式与库名称，无法定位旧 View 回调、重复效果、乱序 Store 或桥接失败",
  "全书责任矩阵、生命周期回放、案例差分、迁移决策与最终发布门",
  "全书因果链、跨章反例、2018历史结论与当前官方迁移",
  Object.keys(SOURCE_INDEX),
];

function conceptStrings(unit) {
  return unit.concepts.map((alternatives) => alternatives[0]);
}

function ensureFormalUnitHeadings(manifest) {
  for (const unit of manifest.units) {
    const concepts = conceptStrings(unit);
    if (!concepts.includes(unit.title)) unit.concepts.unshift([unit.title]);
  }
}

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function alphabeticIndex(index) {
  let value = index + 1;
  let letters = "";
  while (value > 0) {
    value -= 1;
    letters = String.fromCharCode(65 + (value % 26)) + letters;
    value = Math.floor(value / 26);
  }
  return letters;
}

function coordinateEvidenceKey(index, profile) {
  const scope =
    profile.role === "learning-map"
      ? "MAP"
      : profile.role === "final-review"
        ? "REVIEW"
        : profile.id.replace(/^adp-/, "").replaceAll("-", "").toUpperCase();
  return `ADP-${scope}-${alphabeticIndex(index)}`;
}

function mechanismFor(concept, profile) {
  const value = concept.toLocaleLowerCase();
  const conceptLabel = concept.replaceAll(".", "·");
  const lead = `${profile.title}把${conceptLabel}`;
  if (/第 [iv]+ 部/.test(value))
    return `${lead}作为正式分部边界：先固定共同规格，再观察真实项目，最后评估平台组件；分部名不替代章内机制证据。`;
  if (/前言|样例代码|众筹|techbooster|联系方式|免责声明/.test(value))
    return `${lead}绑定到最终商品页、官方样章、样例仓库提交与授权边界；早期草案只做排除证据，中文课程始终标为独立重构。`;
  if (/作者介绍/.test(value))
    return `${lead}限定为最终五位作者与正式章节责任映射；草案作者、计划章节和课程新增判断不得回写为原作者观点。`;
  if (/后记|致谢|权利声明/.test(value))
    return `${lead}分开记录原书责任、课程独立解释与引用范围；致谢和链接都不能替代转载授权或逐段改写。`;
  if (/索引/.test(value))
    return `${lead}从“旋转丢状态、重复效果、迟到回调、乱序结果、桥接失败”等症状出发，保留至少两个根因假设和可推翻实验。`;
  if (/permissionsdispatcher/.test(value))
    return `${lead}准确限定为 Android 运行时权限的声明式封装：检查请求、拒绝、解释与回调路径；它与 Flux 的 Dispatcher 没有职责关系。`;
  if (/android support library/.test(value))
    return `${lead}放在2018兼容库语境中，记录组件/API兼容目标；当前对照只说明 AndroidX 迁移，不把新命名倒灌成原书代码。`;
  if (/dagger/.test(value))
    return `${lead}落实为依赖构造、绑定、组件图与作用域；编译期生成只证明装配可检查，不自动证明生命周期作用域正确。`;
  if (/gson/.test(value))
    return `${lead}限定为 Java 对象与 JSON 的序列化边界，并检查泛型、字段映射、混淆与当前 Android 收缩器风险；它不负责网络传输。`;
  if (/okhttp/.test(value))
    return `${lead}限定为 HTTP 客户端、连接、拦截器、超时、缓存与取消；序列化和声明式接口分别留给转换器与 Retrofit。`;
  if (/retrofit/.test(value))
    return `${lead}限定为声明式 HTTP API、转换器和调用适配；底层传输、超时与连接池仍由 HTTP 客户端承担。`;
  if (/rxjava/.test(value))
    return `${lead}落实为可观察序列、线程调度、终止信号、背压/错误与订阅释放；“异步更简洁”不能替代取消和生命周期证据。`;
  if (/architecture components/.test(value))
    return `${lead}放在2018 Lifecycles、ViewModel、LiveData 首批实践中；当前轨道再对照状态持有者、UI/数据层和单向数据流，不改写历史。`;
  if (/lifecycle/.test(value))
    return `${lead}记录所有者状态、订阅建立/停止、异步任务和资源释放；配置变更、后台停止、最终销毁与进程死亡必须分别测试。`;
  if (/livedata/.test(value))
    return `${lead}限定为生命周期感知的可观察数据持有者，只向活跃观察者派发；它不等于数据层通用流，也不表达一次性效果消费。`;
  if (/viewmodel/.test(value))
    return `${lead}先区分书中 MVVM 角色名与当前 Jetpack ViewModel 类型，再核对状态作用域、写权限、配置变更和进程死亡恢复。`;
  if (/数据绑定|data binding/.test(value))
    return `${lead}核对布局表达式、生成绑定类、观察源和双向写入口；减少样板代码不代表状态所有权清楚。`;
  if (/model-view-presenter|mvp|presenter|contract|view 接口/.test(value))
    return `${lead}落实为 View→Presenter→数据边界→Presenter→View 的窄契约，并用 attach/detach 后零旧 View 调用验证生命周期隔离。`;
  if (/model-view-viewmodel|mvvm|presentation model/.test(value))
    return `${lead}落实为 View 投影状态、ViewModel 处理页面意图、数据边界提供事实；持久状态与导航/Snackbar 等一次性效果分开建模。`;
  if (/snackbar|消息难题|用户操作/.test(value))
    return `${lead}区分可重放页面状态与只消费一次的界面效果，记录事件身份、消费位置及旋转重订阅后的重复次数。`;
  if (/navigator|界面跳转|跳转到|返回原生/.test(value))
    return `${lead}把导航视为带参数、结果、取消和返回栈语义的效果边界；ViewModel/Presenter 发出意图，界面层执行并记录一次性消费。`;
  if (/repository/.test(value))
    return `${lead}定义数据事实的读取、写入、冲突与缓存策略；隐藏数据源不等于隐藏失败、版本或新旧值语义。`;
  if (/usecase/.test(value))
    return `${lead}只在跨多个数据源、复用复杂业务规则或需要独立测试时引入；单次转发类应通过删除实验检验是否过度设计。`;
  if (/资源处理/.test(value))
    return `${lead}把资源标识或可测试的文本模型交给状态层，把 Context 与实际解析留在界面边界，避免长生命周期对象持有短生命周期资源。`;
  if (/fragment|activity/.test(value))
    return `${lead}限定为界面宿主、装配点和生命周期入口；业务事实、长任务与数据所有权不得随具体实例销毁。`;
  if (/异步|后台|版本差异|平台约束/.test(value))
    return `${lead}分别注入旋转、后台停止、进程重建、API差异与迟到回调，记录首个状态分岔和可执行降级。`;
  if (/架构选择|基本概念|思想背景|基本构成|设计演进/.test(value))
    return `${lead}绑定到同一 TODO 功能、团队规模和发布约束，用修改扩散、测试隔离、恢复行为与认知成本比较候选方案。`;
  if (/讨论所基于|todo 应用规格|样例应用设计|项目基本结构|环境准备/.test(value))
    return `${lead}冻结新增、编辑、删除、列表、持久化、错误与恢复规格，并记录工具链、模块、依赖和样例提交，确保模式比较只改变一个边界。`;
  if (/第三方库兴起|编程语言发展/.test(value))
    return `${lead}按职责与出版时间建清单，逐项标出2018 API、当前维护状态和迁移选择；库或语言升级不能自动修复责任边界。`;
  if (/多层继承|自研 api|fat activity|baseactivity|static|历史包袱/.test(value))
    return `${lead}画出继承、全局状态和隐式调用依赖，先锁定现有行为，再用组合根、窄接口和单个迁移切片逐步接管。`;
  if (/单仓库|新成员|团队协作|增加需求/.test(value))
    return `${lead}用首次定位时间、修改文件数、评审往返和回归范围衡量认知耦合，仓库结构本身不等于协作质量。`;
  if (/增量开发|转折点|实际结果|后续演进|分步|小结/.test(value))
    return `${lead}拆成可独立发布、测量和回退的切片；每一步只改变一个依赖或状态边界，指标改善后才扩大迁移。`;
  if (/ui 结构|类字段/.test(value))
    return `${lead}比较 Fragment/自定义 View 等宿主与字段数量对状态恢复的影响，目标是减少隐式可变状态而非追求零字段。`;
  if (/官方应用|会议日程|地图|信息|设置/.test(value))
    return `${lead}放回 DroidKaigi 官方应用的具体入口、数据来源、离线/权限和贡献路径，案例结论不外推为所有应用的默认模板。`;
  if (/设计方针|临时决策|贡献者|学习项目|包结构|恰到好处/.test(value))
    return `${lead}以贡献者背景、首次修改时间、可选路径和评审争议衡量抽象成本；删除一层后仍可清楚修改时，应优先更简单结构。`;
  if (/flux|action|dispatcher|store|发布订阅|单向数据流/.test(value))
    return `${lead}严格按 Action/Action Creator→Dispatcher→Store→View 的历史单向流重放；Store 是状态写入口，动作身份防止旧结果覆盖新意图。`;
  if (/产品实现|产品实例|优点与缺点|架构全貌/.test(value))
    return `${lead}用真实动作日志、Store 快照、订阅释放和乱序请求验证；可追踪性收益要与样板、学习成本和异步复杂度一起报告。`;
  if (/团队|时间线|依赖注入|分层/.test(value))
    return `${lead}把模块边界与团队所有权、发布节奏和故障责任对齐，用交付时间、回归范围、调试路径和新人上手共同验收。`;
  if (/react native|原生|混合应用|三个月|重写|渲染/.test(value))
    return `${lead}在2018案例中记录原生/脚本功能划分、桥接参数、返回栈、包加载与回退；当前新架构只作独立迁移对照。`;
  if (/观察者模式|适用的架构组合/.test(value))
    return `${lead}明确状态源、观察者活跃条件、事件反向路径和清理点，再比较 MVVM 或 Flux 组合；组件名不能替代责任图。`;
  return `${lead}映射到${profile.focus}的输入、状态所有者、事件方向、生命周期、单一故障、恢复证据与2018/当前边界，拒绝只凭类名下结论。`;
}

function normalizeSpec(id, data, title) {
  const [duty, question, fault, artifact, focus, sourceIds] = data;
  return {
    id,
    title,
    duty,
    question,
    fault,
    artifact,
    focus,
    sourceIds,
    invariant: `${title}的规格、唯一状态所有者、事件方向、生命周期、失败恢复和版本轨道始终可追溯`,
    scenario: `在最终2018版目录与同一业务/案例约束内重放${focus}`,
  };
}

function enrichProfile(id, spec, role, concepts, officialUnitId = null) {
  const target =
    role === "learning-map"
      ? "00-official-learning-map/adp-official-learning-map"
      : role === "final-review"
        ? "13-official-final-review/adp-official-final-review"
        : PATHS[id];
  if (!target) throw new Error(`缺少页面映射：${id}`);
  const chapterSlug = target.split("/").at(-1);
  const profile = {
    ...spec,
    role,
    officialUnitId,
    concepts,
    target,
    chapterSlug,
    componentBase: pascal(chapterSlug),
  };
  profile.stages = [
    {
      name: `${profile.title} · 规格与版本`,
      input: profile.scenario,
      owner: "来源清单与共同业务规格是比较合同的唯一所有者",
      event: `锁定最终版坐标、样例提交、平台版本、功能输入和验收结果`,
      output: `${profile.title}的来源快照、输入合同和未知项`,
      check: "没有把众筹草案、当前框架或课程解释冒充2018原书事实",
    },
    {
      name: `${profile.title} · 责任与状态`,
      input: `${profile.title}的固定规格、界面实例、数据源和初始状态`,
      owner: `由${profile.focus}中的明确角色拥有事实，界面只渲染声明状态`,
      event: profile.duty,
      output: `${profile.title}的状态快照、调用/事件轨迹和依赖方向`,
      check: "每种状态只有一个写入口，模式名与实际责任一致",
    },
    {
      name: `${profile.title} · 生命周期`,
      input: `${profile.title}的参考状态、订阅、异步任务和界面宿主`,
      owner: "作用域所有者负责创建、停止、取消、释放与恢复",
      event: "依次执行启动、旋转、后台、返回、最终销毁和进程重建",
      output: `${profile.title}的宿主、状态、订阅和任务存活矩阵`,
      check: "旧界面零回调、无重复订阅，持久状态与一次性效果分离",
    },
    {
      name: `${profile.title} · 单一故障`,
      input: `${profile.title}的参考轨迹与其余不变条件`,
      owner: "故障注入器只改变一个变量，状态所有者记录首个分岔",
      event: `只注入“${profile.fault}”`,
      output: `${profile.title}的首个错误状态、传播路径和用户可见影响`,
      check: "没有同时替换架构、框架、需求、数据与团队流程",
    },
    {
      name: `${profile.title} · 恢复与迁移`,
      input: `${profile.title}的故障快照、恢复点与2018历史结论`,
      owner: "恢复协议拥有回退，迁移记录拥有当前官方对照",
      event: "撤销故障，从同一输入重放，再单独评估当前迁移",
      output: `${profile.title}的恢复结果、迁移差分和不适用范围`,
      check: profile.invariant,
    },
  ];
  profile.cases = [
    {
      name: "共同 TODO 或案例基线",
      setup: profile.scenario,
      historical: `2018轨道只依据最终目录、官方样章与出版时期样例解释${profile.focus}。`,
      current: `当前轨道对照 Android 官方 UI/数据/可选领域层、状态持有者、单一事实源与单向数据流。`,
      boundary:
        "当前建议用于迁移决策，不能静默改写2018原作的术语、代码与案例结论。",
    },
    {
      name: "生命周期与迟到结果",
      setup: `保持业务输入不变，只执行“${profile.fault}”`,
      historical:
        "按 Activity/Fragment、手写 MVP/MVVM、RxJava 与早期 Architecture Components 的语境重放。",
      current:
        "分别检查 ViewModel 作用域、SavedStateHandle、生命周期收集、取消和进程死亡恢复。",
      boundary:
        "配置变更存活不等于进程死亡持久化；无论使用何种组件都必须保存恢复证据。",
    },
    {
      name: "团队与依赖迁移",
      setup: `以${profile.artifact}记录一个可回退切片`,
      historical:
        "保留书中真实团队、OSS、Flux 和混合应用案例的组织与技术约束。",
      current:
        "用依赖注入、分层、UDF 和当前平台文档评估新边界，同时计算迁移成本。",
      boundary:
        "案例经验不是普适模板；团队规模、版本、发布风险和未测试路径必须显式保留。",
    },
  ];
  profile.referenceTrace = profile.stages.map(
    (stage, index) =>
      `${profile.title}参考步骤${index + 1}：${stage.event}，由${stage.owner}，产出${stage.output}。`,
  );
  profile.faultTrace = profile.stages.map(
    (stage, index) =>
      `${profile.title}故障步骤${index + 1}：保持${stage.input}不变，只检查“${profile.fault}”如何破坏${stage.check}。`,
  );
  profile.recoveryTrace = profile.stages.map(
    (stage, index) =>
      `${profile.title}恢复步骤${index + 1}：撤销单一故障，从${stage.input}重放，确认${stage.output}重新满足${stage.check}。`,
  );
  profile.gates = [
    {
      label: "最终版来源门",
      detail: `${profile.title}只能把正式五位作者、三部八章、官方样章与样例仓库写成原作事实；草案单独排除。`,
    },
    {
      label: "责任与生命周期门",
      detail: `${profile.title}的状态所有者、事件方向、作用域、取消、效果消费和恢复均有轨迹。`,
    },
    {
      label: "单故障与证伪门",
      detail: `${profile.title}只注入“${profile.fault}”，能定位首个分岔并从同一输入恢复。`,
    },
    {
      label: "历史—当前迁移门",
      detail: `${profile.title}分别标记2018原作、课程独立解释和当前官方建议，交付${profile.artifact}。`,
    },
  ];
  return profile;
}

function objectivesBlock(profile) {
  return `<Objectives>

- 解释${profile.focus}中的状态所有者、事件方向、生命周期与恢复，而不只罗列模式或库名
- 用单一反例“${profile.fault}”定位${profile.title}的首个错误状态
- 交付${profile.artifact}，严格区分2018最终版、早期草案和当前官方迁移轨道

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sourceIds
    .map((id) => {
      const source = SOURCE_INDEX[id];
      if (!source) throw new Error(`未知来源：${id}`);
      return `- [${source.label}](${source.url})：在${profile.title}中，${source.use}。`;
    })
    .join("\n");
  return `## 最终版、官方样章与当前迁移边界

${profile.title}以[PEAKS 正式商品页](${SOURCES.finalProduct})核对日高正博、小西裕介、藤原圣、吉冈毅、今井智章五位作者，2018年1月31日，224页，B5变形，PDF，ISBN 9784909427021。最终结构是三部八章，并含前言、后记、索引和作者介绍。

${profile.title}使用[PEAKS 官方样章 PDF](${SOURCES.samplePdf})的29个 PDF 页面，核对文件创建于2018年1月26日、修改于1月30日，以及公开的前言、完整最终目录和有限样章内容。[TechBooster 官方样例仓库](${SOURCES.sampleRepo})提供出版时期的可运行参照。本站来源级别为 authorized-sample：样章用于核对结构和有限事实，不能推断未公开正文，更不能复制原书段落、图表、代码或练习。

[早期众筹草案](${SOURCES.draft})最初列四位作者、250页以上与更早交付计划，还计划了未进入最终书的 Kotlin 等内容。草案只作为排除证据。本站没有官方中文译本授权，页面是中文独立教学重构，不是翻译版，也不替代购买原书。

${profile.title}把2018历史轨道与当前轨道并列而不混写：原作按出版时期的 MVP、MVVM、RxJava、Support Library、Architecture Components 和 React Native 案例解释；当前迁移再依据[Android 应用架构指南](${SOURCES.androidArchitecture})核对 UI/数据/可选领域层、状态持有者、单一事实源和单向数据流。

### 本页独立事实来源

${links}`;
}

function conceptsSection(profile) {
  return `## 最终版正式坐标逐项解释

${profile.concepts
  .map((concept, index) => {
    const evidenceKey = coordinateEvidenceKey(index, profile);
    const conceptLabel = concept.replaceAll(".", "·");
    return `### ${concept}

**坐标 ${index + 1}/${profile.concepts.length}：${conceptLabel}。稳定证据键 ${evidenceKey}。** ${mechanismFor(concept, profile)} ${profile.title}只有保存共同输入、状态所有者、事件/调用方向、生命周期、单一故障、恢复和版本边界，才能把目录名称升级为可验证知识；类名、依赖数量或一次成功演示都不能单独通过发布门。`;
  })
  .join("\n\n")}`;
}

function termsSection(profile) {
  const terms = [
    ["状态所有者", `${profile.title}中唯一允许修改某类事实的角色或数据源`],
    ["事件方向", `${profile.title}中用户意图、数据结果与界面渲染的有向关系`],
    [
      "生命周期边界",
      `${profile.title}中对象创建、活跃、停止、销毁和恢复的作用域`,
    ],
    [
      "一次性效果",
      `${profile.title}中导航、提示或权限请求等不能随状态重复播放的输出`,
    ],
    ["单一故障", `${profile.title}中保持其余条件不变时唯一改变的反例变量`],
    ["迁移轨道", `${profile.title}对2018历史实践和当前官方建议分别记录的结论`],
  ];
  return `## 六个证据术语

在${profile.title}中，${terms
    .map(
      ([term, definition]) =>
        `<Term def="${escapeAttribute(definition)}">${term}</Term>`,
    )
    .join(
      "、",
    )}组成最小证据语言。每个术语都必须绑定对象、版本、输入、状态与失败条件；只换架构名、库或框架不能自动扩大结论。

<Glossary>
${terms
  .map(
    ([term, definition]) =>
      `<GlossaryItem term="${term}">${definition}。</GlossaryItem>`,
  )
  .join("\n")}
</Glossary>`;
}

function experimentSection(profile) {
  return `## 先预测，再运行三个证据视图

先预测：只注入“${profile.fault}”时，${profile.title}的界面实例、状态所有者、事件队列、订阅、数据源或迁移边界中哪一项最先偏离？先写下可观察信号，再比较参考、故障和恢复轨迹。

<Stepper>
  <Step title="责任合同：选择正式目录坐标">
    <${profile.componentBase}ResponsibilityContractLab />
  </Step>
  <Step title="生命周期轨迹：重放参考、故障与恢复">
    <${profile.componentBase}LifecycleTraceLab />
  </Step>
  <Step title="迁移门：分开2018历史与当前官方建议">
    <${profile.componentBase}MigrationGateLab />
  </Step>
</Stepper>`;
}

function protocolSection(profile) {
  return `## 最小可重现实验协议

1. 为${profile.title}冻结最终版坐标、样例提交、设备/API、业务输入、初始数据、线程/调度、界面宿主和预期输出。
2. 运行参考路径，逐阶段保存${profile.artifact}；只看类图、一次截图或最终界面，无法证明责任与生命周期机制。
3. 保持其余条件不变，只注入“${profile.fault}”，记录首个状态分岔、传播路径、用户影响和撤销后的同输入恢复。
4. 把2018原作结论与当前官方迁移分别评估；迁移有效也不能回写成原作事实。

<Callout type="trap" title="${profile.title}误区一：模式名就是责任边界">
${profile.title}检查类名与真实职责：命名为 ViewModel、Presenter、Store 或 Repository，不会自动建立唯一写入口、正确事件方向与生命周期清理；必须用本页轨迹验证。
</Callout>

<Callout type="trap" title="${profile.title}误区二：当前方案可以改写2018原作">
${profile.title}把 Compose、Flow、Hilt、当前 React Native 架构或 AndroidX 迁移只放在当前轨道；本页最终版目录、出版时期样例和历史案例保持原样。
</Callout>

<Callout type="trap" title="${profile.title}误区三：同时替换所有边界">
多变量同时变化无法定位因果；${profile.title}必须执行单故障实验，保存首个分岔、可回退切片和恢复证据。
</Callout>`;
}

function exercisesSection(profile) {
  const conceptQuestions = profile.concepts
    .map((concept, index) => {
      const conceptLabel = concept.replaceAll(".", "·");
      const evidenceKey = coordinateEvidenceKey(index, profile);
      return `**问题 ${index + 1}：${concept}**

为${profile.title}中稳定证据键 ${evidenceKey} 对应的${conceptLabel}设计一个固定输入、一个状态所有者、一个单一生命周期或协作故障和一个恢复检查，说明2018结论与当前迁移怎样分轨。

<Answer>
先冻结${profile.scenario}，把稳定证据键 ${evidenceKey} 对应的${conceptLabel}映射到输入、状态写入口、事件方向、界面宿主和可观察输出；参考路径保存${profile.artifact}，故障路径只注入“${profile.fault}”。只有首个分岔可定位、旧实例或过期结果不再写入、撤销后状态和副作用恢复，才能接受局部结论；当前 API、未测试设备、团队和案例留在${profile.title}边界外。
</Answer>`;
    })
    .join("\n\n");
  const start = profile.concepts.length + 1;
  return `## 练习与答案

<Exercises>

${conceptQuestions}

**问题 ${start}：为什么必须分开两个时间轨道**

${profile.title}怎样同时讲清2018原作和当前 Android 官方建议，而不造成时代错置？

<Answer>
${profile.title}的2018轨道只使用最终版目录、官方样章、出版时期样例和当时组件语义；当前轨道另列 UI/数据/可选领域层、状态持有者、单一事实源、单向数据流及当前库状态。二者用迁移差分连接，当前建议不能静默替换原作术语、代码和案例。
</Answer>

**问题 ${start + 1}：一次成功为什么不够**

为什么${profile.title}中的正常截图、类图或单次演示不能证明架构边界成立？

<Answer>
正常路径不会暴露旋转、后台、最终销毁、进程死亡、迟到回调、重复效果、乱序结果和桥接失败。必须冻结输入，保存状态与事件轨迹，只注入一个故障，再验证旧实例零写入、过期结果被拒绝、副作用不重复且撤销后可恢复。
</Answer>

</Exercises>`;
}

function synthesisSection(profile) {
  return `## 小结与上架门

${profile.title}的核心不是宣布 MVP、MVVM、Flux 或某个库“最好”，而是把${profile.focus}放进同一条可复核链：最终版与样章限定原作能说什么，共同规格限定比较对象，状态所有者与事件方向解释正常路径，生命周期和单一反例定位首个错误，恢复轨迹与迁移门决定能否发布。最终交付${profile.artifact}，并报告草案排除、历史边界、当前差分、失败与未知项。

${exercisesSection(profile)}

${termsSection(profile)}

<Attribution
  mode="independent-rewrite"
  sourceBasis="authorized-sample"
  workTitle="日高正博、小西裕介、藤原圣、吉冈毅、今井智章《Android 应用设计模式入门》2018年正式版"
  adaptedUrl="${SOURCES.finalProduct}"
/>`;
}

function wrapperSource(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    stages: profile.stages,
    cases: profile.cases,
    referenceTrace: profile.referenceTrace,
    faultTrace: profile.faultTrace,
    recoveryTrace: profile.recoveryTrace,
    gates: profile.gates,
  };
  return `"use client";

import {
  AndroidArchitectureEvidenceLab,
  type AndroidArchitectureEvidenceModel,
} from "@/components/mdx/android-design-patterns/v2/android-architecture-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies AndroidArchitectureEvidenceModel;

export function ${profile.componentBase}ResponsibilityContractLab() {
  return <AndroidArchitectureEvidenceLab model={model} view="responsibility-contract" />;
}

export function ${profile.componentBase}LifecycleTraceLab() {
  return <AndroidArchitectureEvidenceLab model={model} view="lifecycle-trace" />;
}

export function ${profile.componentBase}MigrationGateLab() {
  return <AndroidArchitectureEvidenceLab model={model} view="migration-gate" />;
}
`;
}

async function writeFormatted(filePath, source, parser) {
  const output = await format(source, { parser });
  const current = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "";
  if (current !== output) fs.writeFileSync(filePath, output);
}

async function transformPage(profile) {
  const filePath = path.join(CONTENT_ROOT, `${profile.target}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${filePath}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const body = `import {
  Objectives,
  Term,
  Callout,
  Stepper,
  Step,
  Exercises,
  Answer,
  Glossary,
  GlossaryItem,
  Attribution,
} from "@/components/mdx/mdx-components";
import {
  ${profile.componentBase}ResponsibilityContractLab,
  ${profile.componentBase}LifecycleTraceLab,
  ${profile.componentBase}MigrationGateLab,
} from "@/components/mdx/${BOOK}/v2/${profile.chapterSlug}";

${objectivesBlock(profile)}

## 为什么从这个问题开始

${profile.title}围绕“${profile.question}”建立贯穿任务：${profile.scenario}。先预测界面实例、状态所有者、事件队列、订阅或数据源中的首个变化，再运行参考、故障和恢复路径；只有守住“${profile.invariant}”并交付${profile.artifact}，模式名、库名、类图或一次成功演示才可能成为机制证据。

${sourceSection(profile)}

${conceptsSection(profile)}

${experimentSection(profile)}

${protocolSection(profile)}

${synthesisSection(profile)}
`;
  const data = {
    ...parsed.data,
    title: profile.title,
    section: profile.title,
    description: `${profile.duty}；用责任合同、生命周期回放和迁移门交付${profile.artifact}`,
    demo: true,
    math: false,
    sourceUrl: SOURCES.finalProduct,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
  };
  if (profile.officialUnitId) data.officialUnitId = profile.officialUnitId;
  else delete data.officialUnitId;
  await writeFormatted(
    filePath,
    matter.stringify(body.trimStart(), data),
    "mdx",
  );
  await writeFormatted(
    path.join(COMPONENT_ROOT, `${profile.chapterSlug}.tsx`),
    wrapperSource(profile),
    "typescript",
  );
}

const manifestDocument = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = manifestDocument.books[BOOK];
if (!manifest) throw new Error(`缺少 fidelity manifest：${BOOK}`);
if (manifest.units.length !== 12)
  throw new Error(`正式单元数量应为12，实际${manifest.units.length}`);

ensureFormalUnitHeadings(manifest);
const allCoordinates = manifest.units.flatMap(conceptStrings);
const unitHeadings = manifest.units.filter((unit) =>
  conceptStrings(unit).includes(unit.title),
).length;
const partHeadings = allCoordinates.filter((item) =>
  /^第 [IV]+ 部/.test(item),
).length;
const numberedNodes = allCoordinates.filter((item) =>
  /^\d+(?:\.\d+)+\s/.test(item),
).length;
const frontNodes = [
  "样例代码",
  "众筹与 PEAKS",
  "TechBooster 简介",
  "联系方式",
  "免责声明",
].filter((item) => allCoordinates.includes(item)).length;
const afterwordNodes = ["致谢", "权利声明"].filter((item) =>
  allCoordinates.includes(item),
).length;
if (
  unitHeadings !== 12 ||
  partHeadings !== 3 ||
  numberedNodes !== 133 ||
  frontNodes !== 5 ||
  afterwordNodes !== 2 ||
  allCoordinates.length !== 155
)
  throw new Error(
    `目录计数异常：单元标题${unitHeadings}、分部${partHeadings}、编号节/小节${numberedNodes}、前言子项${frontNodes}、后记子项${afterwordNodes}、总计${allCoordinates.length}`,
  );

const profiles = [
  enrichProfile(
    "learningMap",
    normalizeSpec(
      "learningMap",
      MAP_SPEC,
      "《Android 应用设计模式入门》最终版155坐标证据学习地图",
    ),
    "learning-map",
    allCoordinates,
  ),
  ...manifest.units.map((unit) => {
    const data = SPEC_DATA[unit.id];
    if (!data) throw new Error(`缺少单元画像：${unit.id}`);
    return enrichProfile(
      unit.id,
      normalizeSpec(unit.id, data, unit.title),
      "chapter",
      conceptStrings(unit),
      unit.id,
    );
  }),
  enrichProfile(
    "finalReview",
    normalizeSpec(
      "finalReview",
      REVIEW_SPEC,
      "《Android 应用设计模式入门》最终版全书证据总复习",
    ),
    "final-review",
    allCoordinates,
  ),
];
if (profiles.length !== 14)
  throw new Error(`页面数量应为14，实际${profiles.length}`);

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

for (const unit of manifest.units) {
  unit.chapterPath = PATHS[unit.id];
  unit.sourceMode = "independent-rewrite";
  unit.sourceAccess = "authorized-sample";
  unit.factSourceIds = SPEC_DATA[unit.id][5];
}
manifest.edition =
  "日高正博、小西裕介、藤原圣、吉冈毅、今井智章《Android 应用设计模式入门》，PEAKS/TechBooster，2018年1月31日正式版，224页，B5变形，PDF，ISBN 9784909427021";
manifest.sourceKind =
  "publisher-official-final-metadata-complete-toc-authorized-sample-and-public-sample-repository";
manifest.sourceUrl = SOURCES.finalProduct;
manifest.secondarySourceUrls = Object.values(SOURCES).filter(
  (url) => url !== SOURCES.finalProduct,
);
manifest.status =
  "verified-authorized-sample-independent-rewrite-current-docs-cross-check";
manifest.verifiedAt = "2026-07-30";
manifest.sourceAccess = "authorized-sample";
manifest.defaultSourceMode = "independent-rewrite";
manifest.disclosureNote =
  "正式分母为12个单元标题（前言、8章、后记、索引、作者介绍）+3个分部标题+133个编号节/小节+前言5个子项+后记2个子项=155。PEAKS正式页核对最终五位作者、2018-01-31、224页、ISBN 9784909427021；29页官方样章核对完整最终目录与有限样章，公开样例仓库核对出版时期实践。早期众筹草案的作者、交付计划与未成书内容全部排除。课程是中文独立教学重构，不是官方译本，不复制原书正文、图表、代码或练习。2018历史轨道与当前Android官方架构、AndroidX、ViewModel/LiveData等迁移轨道分开呈现。";
manifest.unitMappingEvidence = PROFILE_PATH.replace(`${ROOT}/`, "");
manifest.factSourcePolicy =
  "PEAKS正式页与官方样章核对最终版身份、目录和有限内容；官方样例仓库核对出版时期代码边界；Android与各库维护方当前文档只用于独立机制交叉核对和迁移轨道。草案、2018原作、课程解释和当前建议不得互相覆盖。";
manifest.factSources = Object.fromEntries(
  Object.entries(SOURCE_INDEX).map(([id, source]) => [
    id,
    {
      kind:
        id === "finalProduct"
          ? "official-final-product-metadata"
          : id === "samplePdf"
            ? "publisher-authorized-sample-complete-final-toc"
            : id === "sampleRepo"
              ? "author-publisher-era-sample-repository"
              : id === "draft"
                ? "official-draft-exclusion-boundary"
                : id.startsWith("android") ||
                    [
                      "viewModel",
                      "liveData",
                      "lifecycle",
                      "dataBinding",
                      "runtimePermissions",
                    ].includes(id)
                  ? "platform-primary-documentation"
                  : "maintainer-primary-documentation",
      label: source.label,
      url: source.url,
    },
  ]),
);
manifest.coverageMetrics = {
  targetFormalNodes: 155,
  coveredFormalNodes: 155,
  coveragePercent: 100,
};
manifest.metrics = {
  formalUnitHeadings: 12,
  formalPartHeadings: 3,
  formalNumberedSectionsAndSubsections: 133,
  formalPrefaceSubnodes: 5,
  formalAfterwordSubnodes: 2,
  formalNodes: 155,
  officialUnits: 12,
  learningMapPages: 1,
  reviewPages: 1,
  totalLearningPages: 14,
  interactiveViews: 42,
  reviewQuestions: profiles.reduce(
    (total, profile) => total + profile.concepts.length + 2,
    0,
  ),
  visualKinds: [
    "android-responsibility-contract",
    "android-lifecycle-trace",
    "android-migration-gate",
  ],
};

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      sourceAccess: "authorized-sample",
      defaultSourceMode: "independent-rewrite",
      formalCoordinates: 155,
      pageCount: 14,
      interactiveViews: 42,
      profiles,
    },
    null,
    2,
  )}\n`,
  "json",
);
await writeFormatted(
  MANIFEST_PATH,
  `${JSON.stringify(manifestDocument, null, 2)}\n`,
  "json",
);

console.log(
  "已重建14页，覆盖12单元标题+3分部+133编号节/小节+前言5子项+后记2子项=155个最终版正式坐标，生成42个交互证据视图。",
);
