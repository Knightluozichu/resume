/** 复习题库 · Profiling 工作流与基线（prof-profiling-workflow-baseline）。Unity 官方 Profiling 指南 Ch1 改编。 */

import type { ReviewQuestion } from "./types";

export const profProfilingWorkflowBaselineQuestions: ReviewQuestion[] = [
  {
    id: "prof-baseline-1",
    chapter: "prof-profiling-workflow-baseline",
    level: 1,
    question: "Unity Profiler 主窗口有哪四大模块？各管什么？",
    answer:
      "CPU Usage（脚本/物理/动画等 CPU 耗时）、Rendering（Draw Call/Batches/GPU 时间等渲染侧指标）、Memory（堆/纹理/网格等内存占用）、Audio（音频混音/DSP 开销）。四大模块纵向堆叠，每帧每块用一条色带展示耗时。",
    tags: ["Profiler", "模块"],
  },
  {
    id: "prof-baseline-2",
    chapter: "prof-profiling-workflow-baseline",
    level: 1,
    question:
      "Profiler 窗口里的 Record 按钮是做什么的？录制一段独立数据有什么用？",
    answer:
      "Record 按钮记录一段固定帧的完整 Profiler 采样数据，存为 `.data` 文件。录制可以导出给 Profile Analyzer 做统计对比，或在问题复现后保留采样证据，不录制的话数据会被后续帧覆盖。",
    tags: ["Record", "导出"],
  },
  {
    id: "prof-baseline-3",
    chapter: "prof-profiling-workflow-baseline",
    level: 1,
    question:
      "Development Build 是什么？为什么 Profiler 基准测试要用它而不是 Editor 内测？",
    answer:
      "Development Build 是一种特殊构建版本，内置 Profiler 连接支持但代码不做 Release 级优化。用 Development Build 跑 Profiler 是因为 Editor 本身有大量编辑器开销（Inspector/SceneView 等），测出的数据不能代表真机玩家体验；Development Build 更接近真实运行环境但允许 Profiler 连接。",
    tags: ["Development Build", "Autoconnect"],
  },
  {
    id: "prof-baseline-4",
    chapter: "prof-profiling-workflow-baseline",
    level: 1,
    question: "Autoconnect Profiler 是什么？在 Development Build 里怎么打开？",
    answer:
      "Autoconnect Profiler 是 Development Build 的构建设置，勾选后设备一运行就会自动连接 Editor 的 Profiler 窗口，省去手动搜索 IP 的步骤。在 Build Settings 里勾选 `Development Build` + `Autoconnect Profiler` 即可，构建到真机后 Editor 自动收到 Profiler 数据。",
    tags: ["Autoconnect", "Development Build"],
  },
  {
    id: "prof-baseline-5",
    chapter: "prof-profiling-workflow-baseline",
    level: 2,
    question:
      "Deep Profile 和标准采样有什么区别？什么时候该开、什么时候不该开？",
    answer:
      "标准采样每帧记录一次总体函数耗时，开销低，适合日常诊断和建立性能基线。Deep Profile 会插桩每一个 C# 方法调用记录精确耗时，信息完整但开销极大，会让帧率失真严重。只在怀疑某个特定函数有问题时短时间开启做精准定位，日常完全不开。严禁开着 Deep Profile 建立性能基线。",
    tags: ["Deep Profile", "采样模式"],
  },
  {
    id: "prof-baseline-6",
    chapter: "prof-profiling-workflow-baseline",
    level: 2,
    question: "什么是「性能基线」？建立一个基线要做哪几件事？",
    answer:
      "性能基线是在优化前，在固定条件下记录的一组对照数据（如固定场景、固定画质下的 FPS、CPU ms、GPU ms、内存占用）。建立基线的步骤：①确定目标设备与帧预算（如 60 FPS→每帧 16.6ms）；②在固定场景+固定画质下录制 5–10 秒 Profiler 数据；③导出 .data 文件并记录实验条件；④后续每次优化都在相同条件下重新测试，对比基线看变化。",
    tags: ["基线", "对照实验"],
  },
  {
    id: "prof-baseline-7",
    chapter: "prof-profiling-workflow-baseline",
    level: 2,
    question:
      "为什么要用 Profile Analyzer 而不是只看一次 Profiler？一次采样够吗？",
    answer:
      "单次 Profiler 采样可能撞上缓存热身、偶然 GC、后台任务等随机干扰，给出的数字未必代表常态。Profile Analyzer 可以导入多份 .data 做统计对比：看均值（是否整体变好）、中位数（排除极端帧）、标准差（帧率稳不稳）、回归趋势（优化效果持续吗），排除偶然波动才能下结论。",
    tags: ["Profile Analyzer", "统计"],
  },
  {
    id: "prof-baseline-8",
    chapter: "prof-profiling-workflow-baseline",
    level: 3,
    question:
      "你在一个场景里看到了帧率掉到 30 FPS。打开 Profiler 发现 CPU Usage 里 `Update` 占了 20ms。下一步你应该怎么排查？",
    answer:
      "1. 展开 CPU Usage 的时间线，找到 `Update` 展开看子函数，锁定 Self 时间占比最高的一个（不要只看 Total）。2. 如果还是看不清，对该函数名下带 `EditorLoop` 标注的调用路径逐一展开找到真正占时的方法体。3. 考虑开 Deep Profile（只对怀疑区域短时间开启）获取方法级耗时分布。4. 找到根因函数后加 `BeginSample/EndSample` 自定义标记以便后续快速定位。",
    tags: ["CPU Usage", "排查步骤"],
  },
  {
    id: "prof-baseline-9",
    chapter: "prof-profiling-workflow-baseline",
    level: 3,
    question:
      "优化后你对比基线发现 CPU 时间从 18ms 降到了 10ms，但 GPU 时间从 6ms 涨到了 9ms。这意味着什么？该继续往下做吗？",
    answer:
      "CPU 优化成功——省了 8ms。但 GPU 被 CPU 更快喂命令后暴露了原本被 CPU 掩盖的 GPU 瓶颈（6→9ms）。在 CPU bound 变 GPU bound 的场景下，帧总时间可能确实从 18ms 降到 10ms（之前是 CPU 时间 > GPU 时间，帧耗时 = CPU 时间；现在是反过来）。但只要总帧耗时下降且仍在帧预算内，优化就是有效的。不过如果下一阶段的帧预算更紧（如上了 VR 要求 11ms），这个 GPU 时间就是新瓶颈，需要接着优化渲染。",
    tags: ["CPU bound", "GPU bound", "回归"],
  },
  {
    id: "prof-baseline-10",
    chapter: "prof-profiling-workflow-baseline",
    level: 4,
    question:
      "你要为团队建立一套持续性能监控流程。描述从建立基线到 CI 门禁的完整链路。",
    answer:
      "1. 选一个目标设备 + 固定画质档位，跑一段代表性强负载场景（如室内战斗/城市漫游），用 Development Build 录制 3 份 Profiler .data 作为初始基线。2. 把这几份 .data 导入 Profile Analyzer，记录 CPU ms/GPU ms/内存/Draw Call 的均值与 P95，存入 wiki 或版本仓库。3. 每次有性能相关 PR 时，CI 自动在目标设备上跑同样的场景、录制 .data，用 Profile Analyzer 命令行对比基线数据。4. 如果关键指标（如 FPS 中位数）恶化超过阈值（如 5%），CI 标记失败并阻止合入；如果是预期内的恶化需附带解释。5. 每周自动跑一遍全量场景生成趋势报告，发现缓慢退化（如内存逐周涨 2MB）及早介入。",
    tags: ["CI 门禁", "持续监控", "性能回归"],
  },
  {
    id: "prof-baseline-11",
    chapter: "prof-profiling-workflow-baseline",
    level: 2,
    question: "Profiler 的 Better Stream 模式是什么？和标准录制有什么区别？",
    answer:
      "Better Stream 把 Profiler 数据持续写入磁盘文件而非全部留在内存，适合录制数十分钟的长时数据来抓取偶发卡顿。标准录制把数据保留在 Editor 内存里、一次性查看，但长时间录制容易撑爆内存。如果怀疑某个 Bug 是「跑了半小时后才出现」，就用 Better Stream 从头录到尾再回放分析。",
    tags: ["Better Stream", "采样模式"],
  },
  {
    id: "prof-baseline-12",
    chapter: "prof-profiling-workflow-baseline",
    level: 3,
    question:
      "你在真机上跑 Development Build 发现 Profiler 怎么都连不上。列出至少 3 个检查步骤。",
    answer:
      "1. 确认 Build Settings 里勾选了 `Development Build` + `Autoconnect Profiler`（缺一个都连不上）。2. 检查真机和 Editor 主机是否在同一局域网（WiFi 没开/跨子网不行）。3. 检查防火墙是否拦截了 Unity 的多播端口（通常是 54998–55511）。4. 如果 Autoconnect 失败，试着手动输入设备 IP：Window→Analysis→Profiler→Active Profiler Target→输入 IP。5. Android 设备需确保 `INTERNET` 权限在 AndroidManifest 中、且 USB 线非仅充电模式。",
    tags: ["Development Build", "Autoconnect", "排查"],
  },
];
