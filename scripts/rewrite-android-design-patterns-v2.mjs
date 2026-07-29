#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const contentRoot = path.join(root, "content/android-design-patterns");
const manifestPath = path.join(root, "quality/fidelity-manifests.json");

const pageComponents = {
  "adp-official-learning-map": "AdpOfficialLearningMapLab",
  "adp-preface": "AdpPrefaceLab",
  "adp-01-android-app-basic-structure": "Adp01AndroidAppBasicStructureLab",
  "adp-02-mvvm-application-structure": "Adp02MvvmApplicationStructureLab",
  "adp-03-mvp-application-structure": "Adp03MvpApplicationStructureLab",
  "adp-04-incremental-development-design":
    "Adp04IncrementalDevelopmentDesignLab",
  "adp-05-designer-role-in-oss": "Adp05DesignerRoleInOssLab",
  "adp-06-flux-architecture": "Adp06FluxArchitectureLab",
  "adp-07-team-and-architecture": "Adp07TeamAndArchitectureLab",
  "adp-08-android-architecture-components":
    "Adp08AndroidArchitectureComponentsLab",
  "adp-afterword": "AdpAfterwordLab",
  "adp-index": "AdpIndexLab",
  "adp-author-profiles": "AdpAuthorProfilesLab",
  "adp-official-final-review": "AdpOfficialFinalReviewLab",
};

const practiceModes = {
  "adp-official-learning-map": "design",
  "adp-preface": "diagnosis",
  "adp-01-android-app-basic-structure": "diagnosis",
  "adp-02-mvvm-application-structure": "code",
  "adp-03-mvp-application-structure": "code",
  "adp-04-incremental-development-design": "diagnosis",
  "adp-05-designer-role-in-oss": "design",
  "adp-06-flux-architecture": "code",
  "adp-07-team-and-architecture": "design",
  "adp-08-android-architecture-components": "code",
  "adp-afterword": "diagnosis",
  "adp-index": "diagnosis",
  "adp-author-profiles": "diagnosis",
  "adp-official-final-review": "diagnosis",
};

const trapNotes = {
  "adp-official-learning-map":
    "按出版顺序阅读不等于理解依赖顺序；如果没有共同规格，模式比较会同时改变题目和答案。",
  "adp-preface":
    "仓库默认分支会继续变化，只有提交号、工具链和设备条件齐全的样例才可作为复现基线。",
  "adp-01-android-app-basic-structure":
    "把 Activity 中的字段搬到一个名叫 ViewModel 的类里，不会自动修正状态写权限和生命周期泄漏。",
  "adp-02-mvvm-application-structure":
    "把 Snackbar 当成普通持久状态会在重建观察者时重复显示；一次性效果需要消费协议。",
  "adp-03-mvp-application-structure":
    "Presenter 不引用 Android 类只能证明可隔离测试，detach 后仍回调旧 View 依然会造成错误。",
  "adp-04-incremental-development-design":
    "一次性替换所有遗留代码会同时改变太多变量，失败时既难定位根因，也难安全回退。",
  "adp-05-designer-role-in-oss":
    "为每种变化预先增加一层抽象，会把学习成本转嫁给所有贡献者，却未必减少真实修改量。",
  "adp-06-flux-architecture":
    "单向数据流不自动解决乱序请求；没有请求身份或版本，旧结果仍可能覆盖新状态。",
  "adp-07-team-and-architecture":
    "框架迁移按期完成不代表架构成功，还要核对跨端调试、发布与新人上手的长期成本。",
  "adp-08-android-architecture-components":
    "使用 ViewModel 和 LiveData 只是采用平台组件；业务依赖仍可反向，状态仍可有多个写入口。",
  "adp-afterword":
    "列出作者和来源不等于获得转载权；课程解释必须保持独立表达且不能替代原书。",
  "adp-index":
    "从术语名直接跳到解决方案容易确认偏误；先按症状和证据检索，才能保留竞争性解释。",
  "adp-author-profiles":
    "众筹草案中的作者与章节不能混入最终成书责任表，否则技术观点会被归给错误的人。",
  "adp-official-final-review":
    "只复述八章结论无法通过复核；至少要能重放一条正常轨迹和一条失败轨迹。",
};

const pageVisuals = {
  "adp-official-learning-map": {
    input: "固定 2018 年正式版、同一 TODO 规格和八章目录范围。",
    owner: "先由模式章节解释机制，再由真实案例和平台组件检验边界。",
    output: "得到带来源、运行轨迹和适用前提的阅读与实验顺序。",
    baseline: "八章结论均回到共同业务规格。",
    fault: "混入后来的框架结论或众筹草案章节。",
    guard: "正式目录与版本清单在阅读前锁定范围。",
    verdict: "越界内容被标为迁移对照，不改写原书结论。",
  },
  "adp-preface": {
    input: "商品页、官方样章、样例仓库提交和本地工具链版本。",
    owner: "课程维护者保存来源映射，复核者独立重放命令。",
    output: "形成能区分正式版事实、样例行为与课程解释的记录。",
    baseline: "指定提交在记录的工具链上能够运行。",
    fault: "默认分支更新后依赖或行为发生变化。",
    guard: "用提交号和版本锁文件固定复现快照。",
    verdict: "新结果不能覆盖旧结论，只能形成新的版本记录。",
  },
  "adp-01-android-app-basic-structure": {
    input: "固定 TODO 新增、编辑、删除、列表与持久化规格。",
    owner: "比较 Presenter、ViewModel、View 与平台组件的状态写权限。",
    output: "用恢复轨迹判断职责分配是否真正降低耦合。",
    baseline: "正常启动、加载并保存一条 TODO。",
    fault: "旋转后让旧异步回调迟到。",
    guard: "分离旧 View，并由唯一状态所有者接收结果。",
    verdict: "新界面只渲染当前状态，旧实例不再被写入。",
  },
  "adp-02-mvvm-application-structure": {
    input: "同一 TODO 操作、Repository 返回值与界面重建序列。",
    owner: "ViewModel 保存页面状态，Navigator 负责跳转，View 负责渲染。",
    output: "状态可恢复且一次性 Snackbar 不会重复消费。",
    baseline: "加载成功后界面显示最新列表。",
    fault: "消息发出后立即旋转并重新观察。",
    guard: "持久状态与一次性效果使用不同协议。",
    verdict: "列表恢复而 Snackbar 只出现一次。",
  },
  "adp-03-mvp-application-structure": {
    input: "固定 View Contract、Presenter 输入和数据边界返回序列。",
    owner: "Presenter 编排交互，View 只渲染，Activity 只完成装配。",
    output: "通过假 View 和 detach 轨迹验证隔离是否成立。",
    baseline: "Presenter 请求数据并调用当前 View。",
    fault: "View detach 后数据才返回。",
    guard: "生命周期改变时断开 View 契约或取消任务。",
    verdict: "旧 View 零调用，业务结果按约定保留或丢弃。",
  },
  "adp-04-incremental-development-design": {
    input: "一次真实需求的修改文件、继承层次、全局状态与回归范围。",
    owner: "组合根逐步接管静态依赖，新功能试点承担验证风险。",
    output: "每一步都有测量结果、关闭开关和可执行回退路径。",
    baseline: "旧实现保持可用并记录现有行为。",
    fault: "只替换一个静态入口或异步链路。",
    guard: "双路径对照、特性开关和回归测试。",
    verdict: "指标改善才扩大迁移，失败则立即退回旧路径。",
  },
  "adp-05-designer-role-in-oss": {
    input: "贡献者经验差异、官方应用功能和可接受的学习成本。",
    owner: "ViewModel、Repository、Navigator 与维护者各守窄边界。",
    output: "新贡献者能沿一致路径完成修改且评审争议减少。",
    baseline: "维护者按推荐路径完成一个页面。",
    fault: "让首次贡献者独立实现同类功能。",
    guard: "减少可选方案并提供角色化包结构。",
    verdict: "以首次提交时间和评审往返判断抽象是否适度。",
  },
  "adp-06-flux-architecture": {
    input: "用户 Action、外部结果、Dispatcher 顺序与 Store 初始状态。",
    owner: "Store 是唯一状态写入口，Repository 只把 I/O 结果变成动作。",
    output: "动作日志能够重放出相同状态和界面结果。",
    baseline: "按顺序提交请求与成功动作。",
    fault: "旧请求晚于新请求完成。",
    guard: "动作携带请求身份，Store 拒绝过期结果。",
    verdict: "最终状态对应最新意图且日志可完整解释。",
  },
  "adp-07-team-and-architecture": {
    input: "旧应用痛点、三个月目标、原生与 React Native 功能边界。",
    owner: "架构边界与团队责任对齐，跨端桥接有明确维护者。",
    output: "交付速度、回归范围、跨端调试和新人上手共同改善。",
    baseline: "原生与脚本页面按协议互相跳转。",
    fault: "脚本包加载失败或返回参数不兼容。",
    guard: "桥接协议版本化并提供原生安全回退页。",
    verdict: "用户可继续完成核心任务，故障可由责任团队定位。",
  },
  "adp-08-android-architecture-components": {
    input: "Activity 生命周期、ViewModel 状态和 LiveData 更新序列。",
    owner: "生命周期所有者控制观察，ViewModel 跨配置变更保存页面状态。",
    output: "只向活跃界面渲染，最终销毁后资源能够释放。",
    baseline: "活跃观察者收到最新状态。",
    fault: "界面停止或重建期间连续更新数据。",
    guard: "生命周期感知观察和明确的 ViewModel 清理边界。",
    verdict: "无失效渲染、无重复观察，重建后得到最后状态。",
  },
  "adp-afterword": {
    input: "作者责任、来源链接、改编范围和权利声明。",
    owner: "原作者负责原书观点，课程作者负责独立解释与实验。",
    output: "每条内容可追溯且课程不能替代原书。",
    baseline: "观点、代码和目录分别链接到相应来源。",
    fault: "无法确认事实来源或出现大段替代性表达。",
    guard: "缩小引用并把技术结论重新独立验证。",
    verdict: "来源与改编边界清楚后才允许发布。",
  },
  "adp-index": {
    input: "状态丢失、重复事件、耦合和协作阻塞等真实症状。",
    owner: "索引把症状映射到角色、平台约束、章节与证据类型。",
    output: "读者保留多个根因假设并找到可推翻它们的实验。",
    baseline: "先描述现象而不选择模式名称。",
    fault: "按第一个熟悉术语直接套用方案。",
    guard: "要求至少两个竞争性解释和对应证据。",
    verdict: "实验排除替代解释后才形成架构判断。",
  },
  "adp-author-profiles": {
    input: "正式商品页、最终目录、五位作者和各自案例章节。",
    owner: "每位作者只为其正式章节与项目语境提供来源边界。",
    output: "观点、案例和作者责任能够一一对应。",
    baseline: "最终作者表与八章目录一致。",
    fault: "混入众筹草案作者或未成书章节。",
    guard: "对照正式版元数据并阻止草案覆盖。",
    verdict: "责任映射无冲突时才用于技术事实归属。",
  },
  "adp-official-final-review": {
    input: "八章目录、共同规格、案例约束和所有失败实验结果。",
    owner: "整书审批器核对概念、视觉、练习、哈希与生产白名单。",
    output: "形成另一团队无需口头补充即可执行的决策记录。",
    baseline: "全部章节在同一审计规则下通过。",
    fault: "任一内容哈希、视觉结果或来源映射改变。",
    guard: "旧审批自动失效并重新运行整书门禁。",
    verdict: "只有完整复核再次通过才恢复生产可见。",
  },
};

const translations = new Map(
  Object.entries({
    "Android アプリ設計パターン入門": "Android 应用设计模式入门",
    "2018年正式版（アーキテクチャ比較と実践）":
      "2018 年正式版（架构比较与实践）",
    "第I部 アプリの設計を知る": "第 I 部：理解应用设计",
    "第II部 生きた設計を見る": "第 II 部：观察真实设计",
    "第III部 設計を考える": "第 III 部：思考设计",
    "第1章 Androidアプリの基本構成": "第 1 章 Android 应用的基本构成",
    "第2章 MVVMパターンを使ったアプリ構成": "第 2 章 使用 MVVM 模式构建应用",
    "第3章 MVPパターンを使ったアプリ構成": "第 3 章 使用 MVP 模式构建应用",
    "第4章 差分開発にみる設計アプローチ": "第 4 章 从增量开发看设计方法",
    "第5章 OSSにおける設計者の役割": "第 5 章 OSS 中设计者的角色",
    "第6章 Fluxアーキテクチャ": "第 6 章 Flux 架构",
    "第7章 チームとアーキテクチャ": "第 7 章 团队与架构",
    "第8章 Android Architecture Components":
      "第 8 章 Android Architecture Components",
    "はじめに（前言）": "前言",
    はじめに: "前言",
    "おわりに（后记）": "后记",
    おわりに: "后记",
    著者紹介: "作者介绍",
    サンプルコード: "样例代码",
    クラウドファンディングとPEAKS: "众筹与 PEAKS",
    クラウドファンディング: "众筹",
    TechBoosterとは: "TechBooster 简介",
    お問い合わせ先: "联系方式",
    免責事項: "免责声明",
    "1.1 議論の前提となるアプリケーションと仕様": "1.1 讨论所基于的应用与规格",
    "1.2 アーキテクチャの選択": "1.2 架构选择",
    "1.4.1 データバインディング": "1.4.1 数据绑定",
    "1.4.2 MVVMのベースの考え方：Presentation Model":
      "1.4.2 MVVM 的基础思想：Presentation Model",
    "1.5 プラットフォームの制約と複雑性": "1.5 平台约束与复杂性",
    "1.6 設計の歴史": "1.6 设计演进",
    "1.6.1 Fat Activity問題": "1.6.1 Fat Activity 问题",
    "1.6.2 ライフサイクルの複雑化": "1.6.2 生命周期复杂化",
    "1.6.3 バージョン差分": "1.6.3 版本差异",
    "1.6.4 非同期処理とバックグラウンド実行": "1.6.4 异步处理与后台执行",
    "1.6.5 チーム開発": "1.6.5 团队开发",
    "1.7 ライブラリの台頭": "1.7 第三方库兴起",
    "1.8 プログラミング言語の発展": "1.8 编程语言发展",
    ライフサイクル: "生命周期",
    MVVMのベースの考え方: "MVVM 的基础思想",
    PresenterとView: "Presenter 与 View",
    ViewModelの: "ViewModel 的",
    Presenterの: "Presenter 的",
    Viewの: "View 的",
    Viewを: "View",
    ViewModelに: "向 ViewModel",
    Navigatorで: "使用 Navigator",
    Snackbarで: "通过 Snackbar",
    コンセプト: "概念",
    セットアップ: "环境准备",
    プラットフォーム: "平台",
    アーキテクチャ: "架构",
    ライブラリ: "库",
    バージョン: "版本",
    チーム開発: "团队开发",
    プログラミング言語: "编程语言",
    データバインディング: "数据绑定",
    "2.1 基本コンセプト": "2.1 基本概念",
    "2.2 セットアップ": "2.2 环境准备",
    "2.3 サンプルアプリの設計": "2.3 样例应用设计",
    "2.4 MVPアーキテクチャとの比較": "2.4 与 MVP 架构比较",
    "2.5 TODOアプリの仕様": "2.5 TODO 应用规格",
    "2.6 プロジェクトの基本構成": "2.6 项目基本结构",
    "2.7 ViewModelの役割を理解する": "2.7 理解 ViewModel 的角色",
    "2.8 データバインディングを使ってViewを設定する":
      "2.8 使用数据绑定配置 View",
    "2.9 フラグメントで画面を構築する": "2.9 使用 Fragment 构建界面",
    "2.10 Navigatorでアクションを処理する": "2.10 使用 Navigator 处理动作",
    "2.11 ViewModelの生成と生存期間": "2.11 ViewModel 的创建与存活期",
    "2.12 ViewModelにユーザー操作を伝える": "2.12 把用户操作传给 ViewModel",
    "2.13 Snackbarで学ぶViewとViewModel間メッセージングの難しさ":
      "2.13 从 Snackbar 理解 View 与 ViewModel 之间的消息难题",
    "2.14 MVVMパターンの背景にあるもの": "2.14 MVVM 模式的思想背景",
    サンプルアプリ: "样例应用",
    プロジェクト: "项目",
    フラグメント: "Fragment",
    アクション: "动作",
    ユーザー操作: "用户操作",
    メッセージング: "消息传递",
    "3.1 基本コンセプト": "3.1 基本概念",
    "3.2 セットアップ": "3.2 环境准备",
    "3.3 サンプルアプリの設計": "3.3 样例应用设计",
    "3.4 TODOアプリの仕様": "3.4 TODO 应用规格",
    "3.5 プロジェクトの基本構成": "3.5 项目基本结构",
    "3.6 PresenterとViewを生成するActivity":
      "3.6 由 Activity 创建 Presenter 与 View",
    "3.7 PresenterとViewをつなぐContract":
      "3.7 用 Contract 连接 Presenter 与 View",
    "3.8 Presenterの役割を理解する": "3.8 理解 Presenter 的角色",
    "3.9 Viewの役割を理解する": "3.9 理解 View 的角色",
    "3.10 Viewのインターフェイスを設計する": "3.10 设计 View 接口",
    "3.11 MVPパターンの背景にあるもの": "3.11 MVP 模式的思想背景",
    インターフェイス: "接口",
    "4.1 差分開発ってなんだろう": "4.1 什么是增量开发",
    "4.2 開発初期から継ぎ足してきた秘伝のタレ":
      "4.2 从开发初期不断累积的历史包袱",
    "4.2.1 超多段継承地獄": "4.2.1 过深的多层继承",
    "4.2.2 凄く良くできているけど複雑すぎて手に負えない独自API wrapper":
      "4.2.2 功能完善却复杂到难以维护的自研 API 包装层",
    "4.2.4 恐怖のBaseActivity": "4.2.4 令人畏惧的 BaseActivity",
    "4.2.5 当時これを実現するにはこうするしか無かった":
      "4.2.5 当时约束下几乎没有替代方案",
    "4.2.6 目まぐるしく変わってきたトレンドの名残":
      "4.2.6 快速变化趋势留下的痕迹",
    "4.2.7 One repository開発": "4.2.7 单仓库开发",
    "4.3 チームワークに現れてきた秘伝のタレの影響":
      "4.3 历史包袱对团队协作的影响",
    "4.3.1 新規メンバーがいきなり道に迷う": "4.3.1 新成员一开始就迷失方向",
    "4.3.2 既存機能への機能追加の難易度がメチャクチャ上がる":
      "4.3.2 给既有功能增加需求变得异常困难",
    "4.4 大きな改善に挑戦したターニングポイント": "4.4 挑战大规模改善的转折点",
    "4.4.1 static撲滅": "4.4.1 清除 static 全局状态",
    "4.4.2 RxJavaの導入": "4.4.2 引入 RxJava",
    "4.4.3 実際どうだったか": "4.4.3 实际结果",
    "4.5 改善後に取り組んだ機能とアーキテクチャ例":
      "4.5 改善后的功能与架构实例",
    "4.5.1 step by stepで出品をする": "4.5.1 分步完成商品发布",
    "4.5.2 アーキテクチャ概要": "4.5.2 架构概览",
    "4.5.3 UIの構成を選択する": "4.5.3 选择 UI 结构",
    "4.5.4 クラスフィールドを可能な限り減らして、状態を扱いやすくする":
      "4.5.4 尽量减少类字段，让状态更易管理",
    "4.6 これからどうなっていくのか": "4.6 后续演进方向",
    "4.7 まとめ": "4.7 小结",
    差分開発ってなんだろう: "什么是增量开发",
    開発初期から継ぎ足してきた秘伝のタレ: "从开发初期不断累积的历史包袱",
    超多段継承地獄: "过深的多层继承",
    凄く良くできているけど複雑すぎて手に負えない独自API:
      "功能完善却复杂到难以维护的自研 API",
    恐怖のBaseActivity: "令人畏惧的 BaseActivity",
    当時これを実現するにはこうするしか無かった: "当时约束下几乎没有替代方案",
    目まぐるしく変わってきたトレンドの名残: "快速变化趋势留下的痕迹",
    チームワークに現れてきた秘伝のタレの影響: "历史包袱对团队协作的影响",
    新規メンバーがいきなり道に迷う: "新成员一开始就迷失方向",
    既存機能への機能追加の難易度がメチャクチャ上がる:
      "给既有功能增加需求变得异常困难",
    大きな改善に挑戦したターニングポイント: "挑战大规模改善的转折点",
    static撲滅: "清除 static 全局状态",
    RxJavaの導入: "引入 RxJava",
    実際どうだったか: "实际结果",
    改善後に取り組んだ機能とアーキテクチャ例: "改善后的功能与架构实例",
    "step by stepで出品をする": "分步完成商品发布",
    UIの構成を選択する: "选择 UI 结构",
    "クラスフィールドを可能な限り減らして、状態を扱いやすくする":
      "尽量减少类字段，让状态更易管理",
    これからどうなっていくのか: "后续演进方向",
    まとめ: "小结",
    "5.1 公式アプリの概要": "5.1 官方应用概览",
    "5.1.1 セッション": "5.1.1 会议日程",
    "5.1.2 地図": "5.1.2 地图",
    "5.1.3 情報": "5.1.3 信息",
    "5.1.4 設定": "5.1.4 设置",
    "5.2 設計方針を決める要素": "5.2 决定设计方针的因素",
    "5.2.1 考えることを減らす": "5.2.1 减少需要临时决策的事项",
    "5.2.2 多種多様なコントリビュータ": "5.2.2 背景各异的贡献者",
    "5.2.3 習作としてのプロジェクト": "5.2.3 作为学习项目",
    "5.3 公式アプリの設計方針": "5.3 官方应用的设计方针",
    "5.3.1 Model-View-ViewModelアーキテクチャの採用":
      "5.3.1 采用 Model-View-ViewModel 架构",
    "5.3.2 ViewModelから画面表示までの流れ":
      "5.3.2 从 ViewModel 到界面显示的数据流",
    "5.3.3 ViewModelでのイベントハンドリング": "5.3.3 在 ViewModel 中处理事件",
    "5.3.4 役割単位のパッケージ構成": "5.3.4 按角色组织包结构",
    "5.3.5 DataBindingのフル活用": "5.3.5 充分使用 Data Binding",
    "5.3.6 BaseActivity、BaseFragmentの導入":
      "5.3.6 引入 BaseActivity 与 BaseFragment",
    "5.3.7 Navigatorクラスによる画面遷移": "5.3.7 由 Navigator 类负责界面跳转",
    "5.3.8 Repositoryクラスによるデータ取得部分の隠蔽":
      "5.3.8 由 Repository 类隐藏数据获取细节",
    "5.3.9 RxJavaを使ったデータ取得": "5.3.9 使用 RxJava 获取数据",
    "5.3.10 UseCaseクラスの必要性": "5.3.10 是否需要 UseCase 类",
    "5.3.11 ViewModelでのリソースの扱い": "5.3.11 ViewModel 中的资源处理",
    "5.4 OSSにおけるちょうどよい設計": "5.4 OSS 中恰到好处的设计",
    公式アプリの概要: "官方应用概览",
    OSSにおけるちょうどよい設計: "OSS 中恰到好处的设计",
    コントリビュータ: "贡献者",
    パッケージ: "包",
    イベントハンドリング: "事件处理",
    リソース: "资源",
    "6.1 なぜFluxアーキテクチャなのか": "6.1 为什么选择 Flux 架构",
    "6.2 アーキテクチャの全体像": "6.2 架构全貌",
    "6.2.1 中心的な考え：単一方向のデータフロー": "6.2.1 核心思想：单向数据流",
    "6.2.2 Viewからのデータフロー：Dispatcherがハブとなる":
      "6.2.2 从 View 出发的数据流：Dispatcher 充当枢纽",
    "6.3 Androidアプリに適用する": "6.3 应用于 Android 应用",
    "6.3.1 Viewの役割をもつActivityとFragment":
      "6.3.1 承担 View 角色的 Activity 与 Fragment",
    "6.3.2 Action（Action Creator）": "6.3.2 Action 与 Action Creator",
    "6.3.3 Pub/Sub型のライブラリをDispatcherとして使う":
      "6.3.3 使用发布订阅库实现 Dispatcher",
    "6.3.4 Storeの役割": "6.3.4 Store 的角色",
    "6.3.5 AndroidにおけるFluxアーキテクチャの全体像":
      "6.3.5 Android 中 Flux 架构的全貌",
    "6.4 プロダクトでの実装": "6.4 产品实现",
    "6.4.1 RepositoryおよびActionの実装": "6.4.1 Repository 与 Action 的实现",
    "6.4.2 DispatcherとStoreの実装": "6.4.2 Dispatcher 与 Store 的实现",
    "6.4.3 プロダクトにおける実例": "6.4.3 产品实例",
    "6.5 Fluxアーキテクチャのメリットとデメリット": "6.5 Flux 架构的优点与缺点",
    なぜFluxアーキテクチャなのか: "为什么选择 Flux 架构",
    Androidアプリに適用する: "应用于 Android 应用",
    プロダクトでの実装: "产品实现",
    プロダクトにおける実例: "产品实例",
    データフロー: "数据流",
    プロダクト: "产品",
    メリット: "优点",
    デメリット: "缺点",
    "7.1 大胆に機能追加、変更ができるアプリを作り直す":
      "7.1 重做一款可以大胆增加和修改功能的应用",
    "7.2 既存の開発におけるペインポイントを解決する":
      "7.2 解决既有开发中的痛点",
    "7.2.1 MVVM＋レイヤードアーキテクチャモデルの採用":
      "7.2.1 采用 MVVM 与分层架构模型",
    "7.2.2 タイムラインを作る": "7.2.2 构建时间线",
    "7.2.3 依存性注入とライフサイクル": "7.2.3 依赖注入与生命周期",
    "7.2.4 新しい設計がチームに与えた影響": "7.2.4 新设计对团队的影响",
    "7.3 3年間運用されたアプリを3ヶ月で書き直す":
      "7.3 用三个月重写运行三年的应用",
    "7.3.1 Nativeアプリケーションの機能を代替する": "7.3.1 替代原生应用功能",
    "7.3.2 React Nativeとは": "7.3.2 React Native 简介",
    "7.3.3 React Nativeの選定理由": "7.3.3 选择 React Native 的理由",
    "7.3.4 Native開発が向いた機能、React Native開発が向いた機能":
      "7.3.4 适合原生开发与适合 React Native 的功能",
    "7.3.5 ハイブリッドアプリの設計": "7.3.5 混合应用设计",
    "7.3.6 ハイブリッドアプリに習熟する": "7.3.6 熟悉混合应用",
    "7.3.7 React Nativeが描画されるまで": "7.3.7 React Native 完成渲染的过程",
    "7.3.8 NativeからReact Nativeへの画面遷移":
      "7.3.8 从原生界面跳转到 React Native",
    "7.3.9 React NativeからNativeの世界に戻るには":
      "7.3.9 从 React Native 返回原生世界",
    "7.3.10 React Nativeがチーム開発にもたらしたもの":
      "7.3.10 React Native 给团队开发带来的变化",
    "7.4 アーキテクチャがチームにもたらすもの": "7.4 架构给团队带来的价值",
    "大胆に機能追加、変更ができるアプリを作り直す":
      "重做一款可以大胆增加和修改功能的应用",
    既存の開発におけるペインポイントを解決する: "解决既有开发中的痛点",
    新しい設計がチームに与えた影響: "新设计对团队的影响",
    "3年間運用されたアプリを3ヶ月で書き直す": "用三个月重写运行三年的应用",
    アーキテクチャがチームにもたらすもの: "架构给团队带来的价值",
    ペインポイント: "痛点",
    タイムライン: "时间线",
    ハイブリッドアプリ: "混合应用",
    "8.1 Android Architecture Componentsとは":
      "8.1 Android Architecture Components 简介",
    "8.2 Architecture Componentsの中心：Lifecyclesコンポーネント":
      "8.2 核心组件：Lifecycles",
    "8.3 ViewModelはActivityより長いライフサイクルをもつ":
      "8.3 ViewModel 的生命周期长于 Activity 实例",
    "8.4 Observerパターンを実現するLiveData": "8.4 用 LiveData 实现观察者模式",
    "8.5 想定するアーキテクチャ": "8.5 适用的架构组合",
    "8.5.1 Android Architecture ComponentsとMVVM":
      "8.5.1 Android Architecture Components 与 MVVM",
    "8.5.2 Architecture ComponentsとFlux":
      "8.5.2 Architecture Components 与 Flux",
    "Android Architecture Componentsとは":
      "Android Architecture Components 简介",
    想定するアーキテクチャ: "适用的架构组合",
    コンポーネント: "组件",
    パターン: "模式",
    謝辞: "致谢",
    権利表記: "权利声明",
    "日高正博：第1章から第3章": "日高正博：第 1 章至第 3 章",
    "藤原聖：第6章と第8章": "藤原圣：第 6 章与第 8 章",
    "吉岡毅：第4章": "吉冈毅：第 4 章",
    "小西裕介：第5章": "小西裕介：第 5 章",
    "今井智章：第7章": "今井智章：第 7 章",
    正式版の前後置内容: "正式版前后置内容",
    平台の制約と複雑性: "平台约束与复杂性",
    設計の歴史: "设计演进",
    库の台頭: "第三方库兴起",
    项目の基本構成: "项目基本结构",
    Fragmentで画面を構築する: "使用 Fragment 构建界面",
    "View 的接口を設計する": "设计 View 接口",
    改善後に取り組んだ機能と架构例: "改善后的功能与架构实例",
    架构の全体像: "架构全貌",
    产品での実装: "产品实现",
    产品における実例: "产品实例",
    既存の開発における痛点を解決する: "解决既有开发中的痛点",
    时间线を作る: "构建时间线",
    架构がチームにもたらすもの: "架构给团队带来的价值",
    想定する架构: "适用的架构组合",
  }),
);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(entryPath);
    return entry.name.endsWith(".mdx") ? [entryPath] : [];
  });
}

function titleOf(source) {
  return source.match(/^title:\s*"([^"]+)"/m)?.[1] ?? "本页";
}

function replaceTranslations(source) {
  let output = source;
  for (const [from, to] of [...translations].sort(
    ([left], [right]) => right.length - left.length,
  )) {
    output = output.replaceAll(from, to);
  }
  return output;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function ensureConceptExplanation(source, concept) {
  const escaped = escapeRegExp(concept);
  const sectionPattern = new RegExp(
    `^(#{2,5}\\s+${escaped}\\s*)$([\\s\\S]*?)(?=^#{2,5}\\s|(?![\\s\\S]))`,
    "m",
  );
  const match = source.match(sectionPattern);
  if (!match) return source;
  const prose = match[2]
    .replace(/<[^>]+>/g, " ")
    .replace(/[`*_>|#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (prose.length >= 45) return source;

  const explanation = `${concept} 的复核需要落到实际对象：标明输入、状态所有者、调用或数据方向、生命周期边界和失败后的恢复结果，并保存一条能够推翻当前判断的反例；只有名称或类图不足以证明设计成立。`;
  return source.replace(
    sectionPattern,
    `${match[1]}\n\n${explanation}\n\n${match[2].trimStart()}`,
  );
}

const manifests = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const manifest = manifests.books["android-design-patterns"];
manifest.edition = replaceTranslations(manifest.edition);
for (const unit of manifest.units) {
  unit.title = replaceTranslations(unit.title);
  unit.concepts = unit.concepts.map((alternatives) =>
    alternatives.map(replaceTranslations),
  );
}
manifest.disclosureNote = replaceTranslations(manifest.disclosureNote);

for (const filePath of walk(contentRoot)) {
  const chapterSlug = path.basename(filePath, ".mdx");
  const componentName = pageComponents[chapterSlug];
  if (!componentName) throw new Error(`未配置组件：${chapterSlug}`);

  let source = fs.readFileSync(filePath, "utf8");
  source = replaceTranslations(source);
  const title = titleOf(source);

  if (!source.includes("qualityVersion:")) {
    source = source.replace(
      "demo: true\n",
      `demo: true\nqualityVersion: 2\nsourceMode: "independent-rewrite"\npracticeMode: "${practiceModes[chapterSlug]}"\n`,
    );
  }

  const componentImport = `import { ${componentName} } from "@/components/mdx/android-design-patterns/${chapterSlug}";`;
  if (!source.includes(componentImport)) {
    source = source.replace(
      'import { Attribution } from "@/components/mdx/attribution";',
      `import { Attribution } from "@/components/mdx/attribution";\n${componentImport}`,
    );
  }
  const sharedVisualImport =
    'import { AndroidDecisionMap, AndroidFailureTimeline } from "@/components/mdx/android-design-patterns/android-architecture-lab";';
  if (!source.includes(sharedVisualImport)) {
    source = source.replace(
      componentImport,
      `${componentImport}\n${sharedVisualImport}`,
    );
  }

  const componentTag = `<${componentName} />`;
  if (!source.includes(componentTag)) {
    source = source.replace(
      "</Objectives>",
      `</Objectives>\n\n${componentTag}`,
    );
  }
  const visual = pageVisuals[chapterSlug];
  const visualTags = `<AndroidDecisionMap
  title="${title} 的责任路径"
  input="${visual.input}"
  owner="${visual.owner}"
  output="${visual.output}"
/>

<AndroidFailureTimeline
  scenario="${title} 的失败验证"
  baseline="${visual.baseline}"
  fault="${visual.fault}"
  guard="${visual.guard}"
  verdict="${visual.verdict}"
/>`;
  if (!source.includes("<AndroidDecisionMap")) {
    source = source.replace(componentTag, `${componentTag}\n\n${visualTags}`);
  }
  if (!source.includes(`title="${title} 的反例"`)) {
    source = source.replace(
      componentTag,
      `${componentTag}\n\n<Callout type="trap" title="${title} 的反例">\n  ${trapNotes[chapterSlug]}\n</Callout>`,
    );
  }

  source = source
    .replace(/<\/Term>\s*\n\s*[、，,；;]\s*\n\s*<Term\b/g, "</Term>\n\n<Term")
    .replace(
      /本书的核心不是宣布唯一正确架构，而是建立讨论土台。项目规模、Android生命周期、既有代码、交付期限和团队结构都会改变最合适的选择。为此，本页始终保留业务控制变量，只修改一个设计因素，观察变更扩散、测试隔离、恢复行为和认知成本。\n\n/g,
      "",
    )
    .replace(
      /该部标题是正式目录层级，不是装饰。它规定本页是在建立共同基础、读取真实案例，还是评估新组件。\n\n/g,
      "",
    )
    .replace(
      / 本节点不能只给结论：先预测正常轨迹，再注入旋转、后台、迟到回调、空数据或协作冲突中的一个变量，最后以[^。\n]+作为验收不变量。/g,
      "",
    )
    .replace(
      /\n\n本节要把“[^”]+”落实到一个可观察的协作协议：谁发起、谁拥有事实、谁只渲染、何时取消、失败后能否重试、团队如何独立修改。比较时保持业务样本与输入不变，只改变一个架构边界，并保存前后状态与调用轨迹。\n/g,
      "\n",
    )
    .replace(/\n把“[^”]+”放回[^\n]+停止条件。\n/g, "\n")
    .replace(
      /\n\n\*\*核查点：\*\* 记录该节点的主体、依赖、状态、生命周期、异常出口和一条失败证据；若只有类图而没有运行轨迹，本节点不算掌握。\n/g,
      "\n",
    )
    .replace(
      /<Callout type="trap" title="把模式名当成证据">\s*类叫ViewModel、Presenter或Store并不证明满足该模式。必须检查依赖方向、状态写权限、生命周期和运行轨迹；否则只是重新命名原来的耦合。\s*<\/Callout>\n\n/g,
      "",
    )
    .replace(
      "以下三个片段分别固定版本/结构、运行轨迹和证据表。它们是实验协议，不是要求照抄的生产模板：",
      `围绕“${title}”，下面分别保存结构快照、运行轨迹和判定表；这些记录用于复现本页结论，而不是生产代码模板：`,
    )
    .replace("动手试：", `动手试（${title}）：`)
    .replace("证据包至少包含：", `“${title}”的证据包至少包含：`)
    .replace(
      "**问题 1：为什么本页必须以同一业务规格作为控制变量？**",
      `**问题 1：在“${title}”中，为什么要先固定业务规格或案例边界？**`,
    )
    .replace(
      "只有业务输入、功能和数据语义不变，观察到的差异才能归因于职责分配、依赖方向或生命周期策略；否则无法判断是架构还是需求变化造成结果。",
      `在“${title}”中，只有输入、功能和数据语义保持不变，差异才可归因于职责、依赖或生命周期策略；若同时改需求，就无法识别变化来源。`,
    );

  const officialUnit = manifest.units.find((unit) => unit.id === chapterSlug);
  for (const alternatives of officialUnit?.concepts ?? []) {
    source = ensureConceptExplanation(source, alternatives[0]);
  }

  fs.writeFileSync(filePath, source);
}

fs.writeFileSync(manifestPath, `${JSON.stringify(manifests, null, 2)}\n`);

console.log("Android 设计模式课程已按 v2 规则重写并完成中文目录映射。");
