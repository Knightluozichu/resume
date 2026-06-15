/** 复习题库 · Profile Analyzer 与回归测试（prof-profile-analyzer-regression）。Unity 官方 Profiling 指南 Ch5 改编。 */

import type { ReviewQuestion } from "./types";

export const profProfileAnalyzerRegressionQuestions: ReviewQuestion[] = [
  {
    id: "prof-analyzer-1",
    chapter: "prof-profile-analyzer-regression",
    level: 1,
    question: "Profile Analyzer 是什么？它解决什么问题？",
    answer:
      "Profile Analyzer 是 Unity 官方辅助分析工具，可以导入多份 Profiler .data 采样文件做批量统计对比。它把单次采样容易受随机因素干扰的问题解决了——通过多份数据的统计分布（均值、中位数、P95、标准差）得出可靠的性能结论，而不是凭一次采样的感觉下判断。",
    tags: ["Profile Analyzer", "工具"],
  },
  {
    id: "prof-analyzer-2",
    chapter: "prof-profile-analyzer-regression",
    level: 1,
    question: "Profile Analyzer 能自动计算哪四个核心统计指标？各自回答什么问题？",
    answer:
      "均值（所有帧的平均耗时——整体快了吗）、中位数（排序后正中间那一帧的耗时——典型一帧的体验）、P95 分位数（排序后第 95% 位置帧的耗时——最差那 5% 帧有多差）、标准差（帧耗时的离散程度——帧率稳定吗）。四个指标一起看，结论才成立。",
    tags: ["统计指标", "均值", "中位数", "P95", "标准差"],
  },
  {
    id: "prof-analyzer-3",
    chapter: "prof-profile-analyzer-regression",
    level: 1,
    question: "为什么优化后不能只看均值？P95 和中位数提供了什么额外信息？",
    answer:
      "均值对极端值非常敏感——一帧 GC 卡了 300ms 能把几百帧的均值拉高好几个毫秒，单看均值会误判。中位数不受极端值干扰，回答「典型一帧是什么样的体验」；P95 捕捉间歇性卡顿，回答「最差那 5% 帧有多差」——均值降了但 P95 飙升说明大多数帧变快了但偶发卡顿更严重了，这种优化不该合入。",
    tags: ["均值", "P95", "中位数", "陷阱"],
  },
  {
    id: "prof-analyzer-4",
    chapter: "prof-profile-analyzer-regression",
    level: 2,
    question: "用 Profile Analyzer 做一次完整的统计对比流程是怎样的？分哪几步？",
    answer:
      "①优化前在固定场景+固定画质下录 3–5 份 .data 采样建立基线；②拖入 Profile Analyzer 后手动框选每份数据的有效帧范围（排除场景加载和暂停期的异常帧）；③记录四组统计指标作为基线文档；④优化后在完全相同条件下再录 3 份采样，导入并框帧；⑤看四组指标的变化：均值、中位数、P95 全部降低且标准差不变或降低 = 优化有效。",
    tags: ["工作流", "基线", "框选帧"],
  },
  {
    id: "prof-analyzer-5",
    chapter: "prof-profile-analyzer-regression",
    level: 2,
    question: "为什么要在 Profile Analyzer 中手动框选帧范围？不框选会有什么后果？",
    answer:
      "每份 .data 采样开头可能包含场景加载期的异常帧（帧率极低），结尾可能包含暂停时的空帧——这些帧数据不具代表性，如果纳入统计会把均值拉偏、标准差夸大。手动框选只保留中间稳定运行的 5–8 秒，排除加载和暂停干扰，统计结果才反映游戏逻辑的真实性能。不框选可能把加载开销当成性能退化而误判。",
    tags: ["框选帧", "异常帧", "干扰排除"],
  },
  {
    id: "prof-analyzer-6",
    chapter: "prof-profile-analyzer-regression",
    level: 2,
    question: "什么是性能回归？为什么必须用自动化的方式防范回归？",
    answer:
      "性能回归是指一次性能优化后，后续的代码变更无意间又把性能改回了优化前或更差的水平。根源在于：后改的人不知道前人的优化做了什么。必须用自动化（CI Profiling + 基线对比）来防范，因为人工不可能在每个 PR 后都用 Profile Analyzer 跑一遍完整对比——忙起来一定会忘、忘了就会出现回归且无人发现。",
    tags: ["性能回归", "CI"],
  },
  {
    id: "prof-analyzer-7",
    chapter: "prof-profile-analyzer-regression",
    level: 2,
    question: "回归检测的阈值怎么设？只设均值阈值够吗？",
    answer:
      "阈值定义「什么程度算回归」，例如均值超过基线 5%、P95 超过基线 8%、标准差超过基线 10%，三个条件任一触发即算回归。只设均值阈值不够——均值降了但 P95 飙升（偶发卡顿更严重）或标准差翻倍（帧率忽快忽慢）都算体验上的退化，必须多维度判定。",
    tags: ["阈值", "回归判定"],
  },
  {
    id: "prof-analyzer-8",
    chapter: "prof-profile-analyzer-regression",
    level: 3,
    question:
      "优化后均值从 12ms 降到 9ms（降 25%），但 P95 从 18ms 涨到了 28ms（涨 55%）。这个优化该合入吗？从四个指标角度分析并给出修复方向。",
    answer:
      "该优化不应该直接合入。均值降 25% 说明大多数帧显著变快——这部分有效；但 P95 涨 55% 说明最差的 5% 帧反而更慢了，可能引入了间歇瓶颈（如对象池扩容、LOD 切换在主线程的同步回调）。修复方向：在 Profile Analyzer 里拉出 P95 以上的最差帧，点开 CPU Hierarchy 找具体卡顿来源函数，修掉瓶颈后确保 P95 回到 18ms 以下才能合入。另外也检查标准差是否翻倍——如果标准差也飙升了，说明帧率忽快忽慢，体验比一直慢更糟。",
    tags: ["综合判断", "P95 飙升", "排查方向"],
  },
  {
    id: "prof-analyzer-9",
    chapter: "prof-profile-analyzer-regression",
    level: 3,
    question:
      "CI Profiling 的核心链路是什么？Unity 不提供一键方案，你需要拼装哪些部件？",
    answer:
      "核心链路：CI 触发 → 构建 Development Build → 安装到真机/模拟器 → 自动化测试脚本进目标场景录制 Profiler 数据（Profiler.logFile + Profiler.enabled）→ 导出 .raw 文件 → Editor 模式转换 .raw→.data/CSV → Python/Shell 脚本算统计值并对比基线 → 阈值判定 Pass/Fail。需要拼装：Profiler API 录制脚本、CIAutoProfiler 自动化进入场景、Editor 导出脚本、统计 Python 脚本、CI YAML 流水线配置。",
    tags: ["CI Profiling", "自动化", "链路"],
  },
  {
    id: "prof-analyzer-10",
    chapter: "prof-profile-analyzer-regression",
    level: 3,
    question:
      "在 CI Profiling 脚本里，Profiler.logFile 设置的路径有什么讲究？为什么不能随便写？",
    answer:
      "Profiler 输出路径必须写到一个 CI runner 能通过 adb pull 拉取到的目录。Android 上应用私有目录（如 /data/data/<包名>/files/）需要 root 才能 pull，CI 环境通常无 root。应该把 logFile 设到 /sdcard/ 或 Application.persistentDataPath（Android 上通常是 /sdcard/Android/data/<包名>/files/），确保 CI 能拉取。另外要在 AndroidManifest 中加存储权限（Android 10 以下）。",
    tags: ["CI Profiling", "路径", "Android 权限"],
  },
  {
    id: "prof-analyzer-11",
    chapter: "prof-profile-analyzer-regression",
    level: 4,
    question:
      "你的 CI Profiling 跑了几周后发现每天的数据都在慢慢变差（CPU 每周 +0.3ms），但单次 PR 都不超过 5% 阈值，次次 Pass。这是什么问题？怎么改进检测机制？",
    answer:
      "这是「缓慢退化」（creeping regression）——每次 PR 都微量恶化 0.5%，连续 N 个 PR 后早就超过阈值了，但单次对比每次都检测不到。改进方案：在单 PR 阈值判定之上增加趋势线检测——每次 PR 结果累积存到趋势图，如果连续 5+ 个 PR 都在同方向微量恶化（即使单次未超标），自动发出警告。实现上可以在 Python 脚本里对最近一周的数据点做线性回归拟合，斜率持续为正（持续恶化）即预警，而不是等单次突破阈值。",
    tags: ["缓慢退化", "趋势检测", "CI 改进"],
  },
];
