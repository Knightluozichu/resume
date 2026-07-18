import type { ReviewQuestion } from "./types";

export const profOfficialUnitQuestions: ReviewQuestion[] = [
  {
    id: "prof-official-learning-map-1",
    chapter: "prof-official-learning-map",
    level: 1,
    question: "在全书导读中，什么是“权威单元”？",
    answer: "由 2025 年 Unity 6 第二版 PDF 目录固定的内容边界",
    tags: ["全书导读", "原书复刻"],
  },
  {
    id: "prof-official-learning-map-2",
    chapter: "prof-official-learning-map",
    level: 2,
    question: "全书导读为什么必须保留官方单元“Profiling 101”？",
    answer:
      "它定义了本页在 Unity 6 第二版中的独有问题边界，不能被工具清单或自拟主题替代。",
    tags: ["全书导读", "目录覆盖"],
  },
  {
    id: "prof-official-learning-map-3",
    chapter: "prof-official-learning-map",
    level: 3,
    question: "全书导读的关键证据链是什么？",
    answer:
      "全书不是七个互不相干的工具教程，而是一条从性能目标、目标设备采样、瓶颈分类、工具下钻到回归签发的证据链。只有同场景、同设备、同构建、同输入的前后采样才允许得出优化结论。",
    tags: ["全书导读", "数据流"],
  },
  {
    id: "prof-official-learning-map-4",
    chapter: "prof-official-learning-map",
    level: 4,
    question: "全书导读最有诊断价值的故障样本怎样设计？",
    answer:
      "只在编辑器里跑一次，然后把平均 FPS 提升当作优化成功。编辑器噪声、预热状态和偶发帧会让结论不可复验。",
    tags: ["全书导读", "失败注入"],
  },
  {
    id: "prof-official-learning-map-5",
    chapter: "prof-official-learning-map",
    level: 2,
    question: "全书导读签发时必须保留什么不变量？",
    answer:
      "Profiling 101、工作流、内存、Unity 工具、原生工具五大目录边界以及先测量后优化的顺序必须保留。",
    tags: ["全书导读", "行为不变量"],
  },
  {
    id: "prof-official-learning-map-6",
    chapter: "prof-official-learning-map",
    level: 3,
    question: "全书导读至少保存哪些证据？",
    answer:
      "保存目标与设备、帧预算、目标机采样、瓶颈分类、工具下钻、回归签发的状态快照、设备与构建指纹、正常边界失败三组捕获以及修复后同协议对照。",
    tags: ["全书导读", "验收证据"],
  },
  {
    id: "prof-01-profiling-101-1",
    chapter: "prof-01-profiling-101",
    level: 1,
    question: "在Profiling 101中，什么是“帧时间”？",
    answer: "生成并呈现一帧所消耗的毫秒数",
    tags: ["Profiling 101", "原书复刻"],
  },
  {
    id: "prof-01-profiling-101-2",
    chapter: "prof-01-profiling-101",
    level: 2,
    question:
      "Profiling 101为什么必须保留官方单元“Understanding frame budget”？",
    answer:
      "它定义了本页在 Unity 6 第二版中的独有问题边界，不能被工具清单或自拟主题替代。",
    tags: ["Profiling 101", "目录覆盖"],
  },
  {
    id: "prof-01-profiling-101-3",
    chapter: "prof-01-profiling-101",
    level: 3,
    question: "Profiling 101的关键证据链是什么？",
    answer:
      "平均 FPS 会掩盖单帧卡顿，工程判断应围绕毫秒预算和最慢处理链。CPU 与 GPU 可能流水并行，必须同时读主线程、渲染线程和 GPU 完成时刻，不能用一个总数猜瓶颈。",
    tags: ["Profiling 101", "数据流"],
  },
  {
    id: "prof-01-profiling-101-4",
    chapter: "prof-01-profiling-101",
    level: 4,
    question: "Profiling 101最有诊断价值的故障样本怎样设计？",
    answer:
      "59 帧很快、1 帧耗时 250ms 时，平均值仍可能接近 60 FPS，但玩家会明确感到卡顿。",
    tags: ["Profiling 101", "失败注入"],
  },
  {
    id: "prof-01-profiling-101-5",
    chapter: "prof-01-profiling-101",
    level: 2,
    question: "Profiling 101签发时必须保留什么不变量？",
    answer:
      "每个性能结论都必须落到帧时间分布、处理线程和目标设备，而不是只报平均 FPS。",
    tags: ["Profiling 101", "行为不变量"],
  },
  {
    id: "prof-01-profiling-101-6",
    chapter: "prof-01-profiling-101",
    level: 3,
    question: "Profiling 101至少保存哪些证据？",
    answer:
      "保存目标 FPS、预算毫秒、CPU 帧、GPU 帧、VSync 等待、瓶颈结论的状态快照、设备与构建指纹、正常边界失败三组捕获以及修复后同协议对照。",
    tags: ["Profiling 101", "验收证据"],
  },
  {
    id: "prof-02-profiling-workflow-1",
    chapter: "prof-02-profiling-workflow",
    level: 1,
    question: "在Profiling workflow中，什么是“性能基线”？",
    answer: "变更前按固定协议采集的可比较数据集",
    tags: ["Profiling workflow", "原书复刻"],
  },
  {
    id: "prof-02-profiling-workflow-2",
    chapter: "prof-02-profiling-workflow",
    level: 2,
    question:
      "Profiling workflow为什么必须保留官方单元“From high- to low-level profiling”？",
    answer:
      "它定义了本页在 Unity 6 第二版中的独有问题边界，不能被工具清单或自拟主题替代。",
    tags: ["Profiling workflow", "目录覆盖"],
  },
  {
    id: "prof-02-profiling-workflow-3",
    chapter: "prof-02-profiling-workflow",
    level: 3,
    question: "Profiling workflow的关键证据链是什么？",
    answer:
      "高层工具先回答是否超预算和受谁约束，低层工具再回答哪个调用、资源或绘制事件导致问题。基线要锁定硬件、系统、画质、热状态、场景、输入脚本和构建版本，否则前后数据不能比较。",
    tags: ["Profiling workflow", "数据流"],
  },
  {
    id: "prof-02-profiling-workflow-4",
    chapter: "prof-02-profiling-workflow",
    level: 4,
    question: "Profiling workflow最有诊断价值的故障样本怎样设计？",
    answer:
      "改动前测主菜单，改动后测战斗场景，或两次采样使用不同画质和热状态，差值没有因果意义。",
    tags: ["Profiling workflow", "失败注入"],
  },
  {
    id: "prof-02-profiling-workflow-5",
    chapter: "prof-02-profiling-workflow",
    level: 2,
    question: "Profiling workflow签发时必须保留什么不变量？",
    answer:
      "前后样本必须共享设备、构建、场景、输入、预热、采样区间和统计口径。",
    tags: ["Profiling workflow", "行为不变量"],
  },
  {
    id: "prof-02-profiling-workflow-6",
    chapter: "prof-02-profiling-workflow",
    level: 3,
    question: "Profiling workflow至少保存哪些证据？",
    answer:
      "保存固定协议、预热设备、录制基线、定位瓶颈、单变量修改、同协议复验的状态快照、设备与构建指纹、正常边界失败三组捕获以及修复后同协议对照。",
    tags: ["Profiling workflow", "验收证据"],
  },
  {
    id: "prof-03-cpu-render-worker-bounds-1",
    chapter: "prof-03-cpu-render-worker-bounds",
    level: 1,
    question: "在CPU-bound workflow中，什么是“主线程”？",
    answer: "默认执行玩家循环、脚本和多数引擎系统的线程",
    tags: ["CPU-bound workflow", "原书复刻"],
  },
  {
    id: "prof-03-cpu-render-worker-bounds-2",
    chapter: "prof-03-cpu-render-worker-bounds",
    level: 2,
    question: "CPU-bound workflow为什么必须保留官方单元“CPU-bound”？",
    answer:
      "它定义了本页在 Unity 6 第二版中的独有问题边界，不能被工具清单或自拟主题替代。",
    tags: ["CPU-bound workflow", "目录覆盖"],
  },
  {
    id: "prof-03-cpu-render-worker-bounds-3",
    chapter: "prof-03-cpu-render-worker-bounds",
    level: 3,
    question: "CPU-bound workflow的关键证据链是什么？",
    answer:
      "CPU-bound 不等于所有核心都忙。主线程可能被脚本、物理、动画或 UI 占满，渲染线程可能被剔除和绘制提交拖住，工作线程也可能因依赖链空转。应先找决定帧结束的最长线程，再按 Self Time 和调用关系下钻。",
    tags: ["CPU-bound workflow", "数据流"],
  },
  {
    id: "prof-03-cpu-render-worker-bounds-4",
    chapter: "prof-03-cpu-render-worker-bounds",
    level: 4,
    question: "CPU-bound workflow最有诊断价值的故障样本怎样设计？",
    answer:
      "看到主线程等待就直接优化主线程；如果它其实在等待渲染线程或 GPU，修改脚本不会改变帧结束时刻。",
    tags: ["CPU-bound workflow", "失败注入"],
  },
  {
    id: "prof-03-cpu-render-worker-bounds-5",
    chapter: "prof-03-cpu-render-worker-bounds",
    level: 2,
    question: "CPU-bound workflow签发时必须保留什么不变量？",
    answer:
      "优化对象必须是决定帧时长的线程或依赖链，且用标记和调用上下文证明耗时归属。",
    tags: ["CPU-bound workflow", "行为不变量"],
  },
  {
    id: "prof-03-cpu-render-worker-bounds-6",
    chapter: "prof-03-cpu-render-worker-bounds",
    level: 3,
    question: "CPU-bound workflow至少保存哪些证据？",
    answer:
      "保存Timeline 总览、最长线程、Hierarchy 排序、Self Time、调用上下文、目标改动的状态快照、设备与构建指纹、正常边界失败三组捕获以及修复后同协议对照。",
    tags: ["CPU-bound workflow", "验收证据"],
  },
  {
    id: "prof-04-gpu-mobile-power-1",
    chapter: "prof-04-gpu-mobile-power",
    level: 1,
    question: "在GPU and mobile challenges中，什么是“GPU-bound”？",
    answer: "GPU 完成时间决定一帧最早呈现时刻的状态",
    tags: ["GPU and mobile challenges", "原书复刻"],
  },
  {
    id: "prof-04-gpu-mobile-power-2",
    chapter: "prof-04-gpu-mobile-power",
    level: 2,
    question: "GPU and mobile challenges为什么必须保留官方单元“GPU-bound”？",
    answer:
      "它定义了本页在 Unity 6 第二版中的独有问题边界，不能被工具清单或自拟主题替代。",
    tags: ["GPU and mobile challenges", "目录覆盖"],
  },
  {
    id: "prof-04-gpu-mobile-power-3",
    chapter: "prof-04-gpu-mobile-power",
    level: 3,
    question: "GPU and mobile challenges的关键证据链是什么？",
    answer:
      "移动端的峰值帧率不是持续性能。高分辨率、过绘和带宽压力会推高功耗并触发降频，数分钟后帧时间恶化。应在目标硬件档位上做长时采样，把温度、频率、GPU 时间和电流放在同一时间轴。",
    tags: ["GPU and mobile challenges", "数据流"],
  },
  {
    id: "prof-04-gpu-mobile-power-4",
    chapter: "prof-04-gpu-mobile-power",
    level: 4,
    question: "GPU and mobile challenges最有诊断价值的故障样本怎样设计？",
    answer:
      "冷机启动测 30 秒就签发 60 FPS；十分钟后温控降频导致帧时间翻倍，短采样完全看不到。",
    tags: ["GPU and mobile challenges", "失败注入"],
  },
  {
    id: "prof-04-gpu-mobile-power-5",
    chapter: "prof-04-gpu-mobile-power",
    level: 2,
    question: "GPU and mobile challenges签发时必须保留什么不变量？",
    answer: "移动性能必须同时满足帧预算、温控稳定、功耗预算和最低硬件档位。",
    tags: ["GPU and mobile challenges", "行为不变量"],
  },
  {
    id: "prof-04-gpu-mobile-power-6",
    chapter: "prof-04-gpu-mobile-power",
    level: 3,
    question: "GPU and mobile challenges至少保存哪些证据？",
    answer:
      "保存GPU 等待信号、平台捕获、绘制或带宽、功耗温度、质量档位、长时复验的状态快照、设备与构建指纹、正常边界失败三组捕获以及修复后同协议对照。",
    tags: ["GPU and mobile challenges", "验收证据"],
  },
  {
    id: "prof-05-memory-budget-profiling-1",
    chapter: "prof-05-memory-budget-profiling",
    level: 1,
    question: "在Memory profiling中，什么是“物理 RAM”？",
    answer: "设备实际安装并由系统和进程共同占用的内存",
    tags: ["Memory profiling", "原书复刻"],
  },
  {
    id: "prof-05-memory-budget-profiling-2",
    chapter: "prof-05-memory-budget-profiling",
    level: 2,
    question:
      "Memory profiling为什么必须保留官方单元“Understand and define a memory budget”？",
    answer:
      "它定义了本页在 Unity 6 第二版中的独有问题边界，不能被工具清单或自拟主题替代。",
    tags: ["Memory profiling", "目录覆盖"],
  },
  {
    id: "prof-05-memory-budget-profiling-3",
    chapter: "prof-05-memory-budget-profiling",
    level: 3,
    question: "Memory profiling的关键证据链是什么？",
    answer:
      "内存预算不能等于设备标称 RAM。操作系统、驱动、其他进程和平台终止阈值都会压缩应用可用空间。团队要把总预算分配给纹理、网格、音频、代码堆和运行时缓冲，并在相同游戏节点抓取快照。",
    tags: ["Memory profiling", "数据流"],
  },
  {
    id: "prof-05-memory-budget-profiling-4",
    chapter: "prof-05-memory-budget-profiling",
    level: 4,
    question: "Memory profiling最有诊断价值的故障样本怎样设计？",
    answer:
      "拿 8GB 手机的总 RAM 当游戏预算，忽略系统和图形驱动；低端机即使平均占用正常，也可能在加载峰值被系统终止。",
    tags: ["Memory profiling", "失败注入"],
  },
  {
    id: "prof-05-memory-budget-profiling-5",
    chapter: "prof-05-memory-budget-profiling",
    level: 2,
    question: "Memory profiling签发时必须保留什么不变量？",
    answer:
      "预算必须以最低支持设备和最坏场景峰值为准，并能追溯到资源类别与责任团队。",
    tags: ["Memory profiling", "行为不变量"],
  },
  {
    id: "prof-05-memory-budget-profiling-6",
    chapter: "prof-05-memory-budget-profiling",
    level: 3,
    question: "Memory profiling至少保存哪些证据？",
    answer:
      "保存最低设备、系统余量、总预算、分类配额、固定节点快照、峰值门禁的状态快照、设备与构建指纹、正常边界失败三组捕获以及修复后同协议对照。",
    tags: ["Memory profiling", "验收证据"],
  },
  {
    id: "prof-06-unity-profiler-1",
    chapter: "prof-06-unity-profiler",
    level: 1,
    question: "在Unity Profiler中，什么是“Development Build”？",
    answer: "保留调试和 Profiler 连接能力的玩家构建",
    tags: ["Unity Profiler", "原书复刻"],
  },
  {
    id: "prof-06-unity-profiler-2",
    chapter: "prof-06-unity-profiler",
    level: 2,
    question:
      "Unity Profiler为什么必须保留官方单元“Get started with profiling in Unity”？",
    answer:
      "它定义了本页在 Unity 6 第二版中的独有问题边界，不能被工具清单或自拟主题替代。",
    tags: ["Unity Profiler", "目录覆盖"],
  },
  {
    id: "prof-06-unity-profiler-3",
    chapter: "prof-06-unity-profiler",
    level: 3,
    question: "Unity Profiler的关键证据链是什么？",
    answer:
      "正式结论来自目标设备上的 Development Build，Editor 只用于快速迭代。采集时要控制 VSync、Profiler 自身开销、深度分析和连接方式，保存原始数据而非截图，以便重新筛选和比较。",
    tags: ["Unity Profiler", "数据流"],
  },
  {
    id: "prof-06-unity-profiler-4",
    chapter: "prof-06-unity-profiler",
    level: 4,
    question: "Unity Profiler最有诊断价值的故障样本怎样设计？",
    answer:
      "在 Editor Play Mode 中看到耗时后直接写入上线预算，EditorLoop 和窗口刷新会污染数据。",
    tags: ["Unity Profiler", "失败注入"],
  },
  {
    id: "prof-06-unity-profiler-5",
    chapter: "prof-06-unity-profiler",
    level: 2,
    question: "Unity Profiler签发时必须保留什么不变量？",
    answer: "所有绝对性能数字都要能回到目标设备捕获文件、构建哈希和录制区间。",
    tags: ["Unity Profiler", "行为不变量"],
  },
  {
    id: "prof-06-unity-profiler-6",
    chapter: "prof-06-unity-profiler",
    level: 3,
    question: "Unity Profiler至少保存哪些证据？",
    answer:
      "保存开发构建、目标设备、关闭干扰、录制区间、Timeline、保存捕获的状态快照、设备与构建指纹、正常边界失败三组捕获以及修复后同协议对照。",
    tags: ["Unity Profiler", "验收证据"],
  },
  {
    id: "prof-07-profile-analyzer-1",
    chapter: "prof-07-profile-analyzer",
    level: 1,
    question: "在Profile Analyzer中，什么是“Single 视图”？",
    answer: "聚合一组捕获并显示标记分布与帧范围的视图",
    tags: ["Profile Analyzer", "原书复刻"],
  },
  {
    id: "prof-07-profile-analyzer-2",
    chapter: "prof-07-profile-analyzer",
    level: 2,
    question: "Profile Analyzer为什么必须保留官方单元“Profile Analyzer”？",
    answer:
      "它定义了本页在 Unity 6 第二版中的独有问题边界，不能被工具清单或自拟主题替代。",
    tags: ["Profile Analyzer", "目录覆盖"],
  },
  {
    id: "prof-07-profile-analyzer-3",
    chapter: "prof-07-profile-analyzer",
    level: 3,
    question: "Profile Analyzer的关键证据链是什么？",
    answer:
      "单帧截图不能代表稳定性能。Profile Analyzer 把一段捕获聚合成分布，并允许两组数据按标记对齐比较。中位帧描述常态，最长帧暴露尖峰；筛选范围和线程必须在前后样本中一致。",
    tags: ["Profile Analyzer", "数据流"],
  },
  {
    id: "prof-07-profile-analyzer-4",
    chapter: "prof-07-profile-analyzer",
    level: 4,
    question: "Profile Analyzer最有诊断价值的故障样本怎样设计？",
    answer:
      "A 组包含加载帧、B 组排除了加载帧，却把两组均值直接比较；筛选差异会伪造性能收益。",
    tags: ["Profile Analyzer", "失败注入"],
  },
  {
    id: "prof-07-profile-analyzer-5",
    chapter: "prof-07-profile-analyzer",
    level: 2,
    question: "Profile Analyzer签发时必须保留什么不变量？",
    answer: "比较视图中的设备、场景、帧区间、线程过滤和标记口径必须一致。",
    tags: ["Profile Analyzer", "行为不变量"],
  },
  {
    id: "prof-07-profile-analyzer-6",
    chapter: "prof-07-profile-analyzer",
    level: 3,
    question: "Profile Analyzer至少保存哪些证据？",
    answer:
      "保存捕获 A、捕获 B、同区间过滤、中位帧、最长帧、标记差值的状态快照、设备与构建指纹、正常边界失败三组捕获以及修复后同协议对照。",
    tags: ["Profile Analyzer", "验收证据"],
  },
  {
    id: "prof-08-memory-profiler-1",
    chapter: "prof-08-memory-profiler",
    level: 1,
    question: "在Memory Profiler中，什么是“托管堆”？",
    answer: "由 C# 垃圾回收器管理的对象内存区域",
    tags: ["Memory Profiler", "原书复刻"],
  },
  {
    id: "prof-08-memory-profiler-2",
    chapter: "prof-08-memory-profiler",
    level: 2,
    question: "Memory Profiler为什么必须保留官方单元“The Summary tab”？",
    answer:
      "它定义了本页在 Unity 6 第二版中的独有问题边界，不能被工具清单或自拟主题替代。",
    tags: ["Memory Profiler", "目录覆盖"],
  },
  {
    id: "prof-08-memory-profiler-3",
    chapter: "prof-08-memory-profiler",
    level: 3,
    question: "Memory Profiler的关键证据链是什么？",
    answer:
      "泄漏不是简单的总量增长，而是场景退出和回收后仍被引用的对象。先比较固定节点快照，再从 Unity Objects 和引用链找到所有者；对持续分配则结合 Allocation Call Stacks、CPU Timeline 和 Hierarchy 定位产生路径。",
    tags: ["Memory Profiler", "数据流"],
  },
  {
    id: "prof-08-memory-profiler-4",
    chapter: "prof-08-memory-profiler",
    level: 4,
    question: "Memory Profiler最有诊断价值的故障样本怎样设计？",
    answer:
      "只看托管堆中的 new，忽略纹理、网格和引擎对象的原生内存；结果是 C# 看起来稳定，进程驻留仍持续上涨。",
    tags: ["Memory Profiler", "失败注入"],
  },
  {
    id: "prof-08-memory-profiler-5",
    chapter: "prof-08-memory-profiler",
    level: 2,
    question: "Memory Profiler签发时必须保留什么不变量？",
    answer:
      "场景退出后的对象数、分类内存和根引用必须回到预算范围，且重复流程不能线性增长。",
    tags: ["Memory Profiler", "行为不变量"],
  },
  {
    id: "prof-08-memory-profiler-6",
    chapter: "prof-08-memory-profiler",
    level: 3,
    question: "Memory Profiler至少保存哪些证据？",
    answer:
      "保存快照 A、复现流程、快照 B、分类差值、引用链、释放与复验的状态快照、设备与构建指纹、正常边界失败三组捕获以及修复后同协议对照。",
    tags: ["Memory Profiler", "验收证据"],
  },
  {
    id: "prof-09-frame-rendering-debuggers-1",
    chapter: "prof-09-frame-rendering-debuggers",
    level: 1,
    question: "在Frame and Rendering Debuggers中，什么是“绘制事件”？",
    answer: "一帧中一次清屏、阴影、Draw Call 或后处理操作",
    tags: ["Frame and Rendering Debuggers", "原书复刻"],
  },
  {
    id: "prof-09-frame-rendering-debuggers-2",
    chapter: "prof-09-frame-rendering-debuggers",
    level: 2,
    question:
      "Frame and Rendering Debuggers为什么必须保留官方单元“Frame Debugger”？",
    answer:
      "它定义了本页在 Unity 6 第二版中的独有问题边界，不能被工具清单或自拟主题替代。",
    tags: ["Frame and Rendering Debuggers", "目录覆盖"],
  },
  {
    id: "prof-09-frame-rendering-debuggers-3",
    chapter: "prof-09-frame-rendering-debuggers",
    level: 3,
    question: "Frame and Rendering Debuggers的关键证据链是什么？",
    answer:
      "Profiler 先证明渲染是瓶颈，Frame Debugger 再解释 CPU 向 GPU 提交了哪些绘制事件。逐事件查看目标、材质、Pass 和批次可以发现合批破坏与重复全屏绘制；它不提供可靠 GPU 时间，仍需平台 GPU 工具复验。",
    tags: ["Frame and Rendering Debuggers", "数据流"],
  },
  {
    id: "prof-09-frame-rendering-debuggers-4",
    chapter: "prof-09-frame-rendering-debuggers",
    level: 4,
    question: "Frame and Rendering Debuggers最有诊断价值的故障样本怎样设计？",
    answer:
      "把 Frame Debugger 的事件顺序当成 GPU 耗时排名；它能解释帧的构造，却不能代替平台 GPU 时间戳。",
    tags: ["Frame and Rendering Debuggers", "失败注入"],
  },
  {
    id: "prof-09-frame-rendering-debuggers-5",
    chapter: "prof-09-frame-rendering-debuggers",
    level: 2,
    question: "Frame and Rendering Debuggers签发时必须保留什么不变量？",
    answer: "每项渲染优化都要先有瓶颈证据，再有事件级根因和目标设备 GPU 复验。",
    tags: ["Frame and Rendering Debuggers", "行为不变量"],
  },
  {
    id: "prof-09-frame-rendering-debuggers-6",
    chapter: "prof-09-frame-rendering-debuggers",
    level: 3,
    question: "Frame and Rendering Debuggers至少保存哪些证据？",
    answer:
      "保存Profiler 定类、捕获目标帧、逐事件回放、资源状态、发现冗余、GPU 工具复验的状态快照、设备与构建指纹、正常边界失败三组捕获以及修复后同协议对照。",
    tags: ["Frame and Rendering Debuggers", "验收证据"],
  },
  {
    id: "prof-10-project-auditor-deep-profiling-1",
    chapter: "prof-10-project-auditor-deep-profiling",
    level: 1,
    question:
      "在Project Auditor and Deep Profiling中，什么是“Project Auditor”？",
    answer: "扫描项目并按性能和最佳实践报告问题的 Unity 包",
    tags: ["Project Auditor and Deep Profiling", "原书复刻"],
  },
  {
    id: "prof-10-project-auditor-deep-profiling-2",
    chapter: "prof-10-project-auditor-deep-profiling",
    level: 2,
    question:
      "Project Auditor and Deep Profiling为什么必须保留官方单元“Project Auditor”？",
    answer:
      "它定义了本页在 Unity 6 第二版中的独有问题边界，不能被工具清单或自拟主题替代。",
    tags: ["Project Auditor and Deep Profiling", "目录覆盖"],
  },
  {
    id: "prof-10-project-auditor-deep-profiling-3",
    chapter: "prof-10-project-auditor-deep-profiling",
    level: 3,
    question: "Project Auditor and Deep Profiling的关键证据链是什么？",
    answer:
      "Project Auditor 在运行前扫描脚本、资源和设置风险，Deep Profiling 则为脚本方法自动插桩。深度分析开销高，会改变被测对象，因此只能在高层捕获已缩小到特定脚本后短时使用，并以手写 ProfilerMarker 做低开销复验。",
    tags: ["Project Auditor and Deep Profiling", "数据流"],
  },
  {
    id: "prof-10-project-auditor-deep-profiling-4",
    chapter: "prof-10-project-auditor-deep-profiling",
    level: 4,
    question:
      "Project Auditor and Deep Profiling最有诊断价值的故障样本怎样设计？",
    answer:
      "从启动到完整关卡全程开启 Deep Profiling，然后把严重变慢后的时间当成真实玩家性能。",
    tags: ["Project Auditor and Deep Profiling", "失败注入"],
  },
  {
    id: "prof-10-project-auditor-deep-profiling-5",
    chapter: "prof-10-project-auditor-deep-profiling",
    level: 2,
    question: "Project Auditor and Deep Profiling签发时必须保留什么不变量？",
    answer:
      "深度分析只用于定位，最终基准必须在关闭深度分析后用目标标记和同协议重新采集。",
    tags: ["Project Auditor and Deep Profiling", "行为不变量"],
  },
  {
    id: "prof-10-project-auditor-deep-profiling-6",
    chapter: "prof-10-project-auditor-deep-profiling",
    level: 3,
    question: "Project Auditor and Deep Profiling至少保存哪些证据？",
    answer:
      "保存静态审计、高层捕获、缩小脚本、短时深度分析、手写标记、无深度复验的状态快照、设备与构建指纹、正常边界失败三组捕获以及修复后同协议对照。",
    tags: ["Project Auditor and Deep Profiling", "验收证据"],
  },
  {
    id: "prof-11-tool-selection-automation-1",
    chapter: "prof-11-tool-selection-automation",
    level: 1,
    question: "在Tool selection and automation中，什么是“ProfilerRecorder”？",
    answer: "在运行时低开销读取指定 Profiler 计数器的 API",
    tags: ["Tool selection and automation", "原书复刻"],
  },
  {
    id: "prof-11-tool-selection-automation-2",
    chapter: "prof-11-tool-selection-automation",
    level: 2,
    question:
      "Tool selection and automation为什么必须保留官方单元“Which profiling tools to use and when?”？",
    answer:
      "它定义了本页在 Unity 6 第二版中的独有问题边界，不能被工具清单或自拟主题替代。",
    tags: ["Tool selection and automation", "目录覆盖"],
  },
  {
    id: "prof-11-tool-selection-automation-3",
    chapter: "prof-11-tool-selection-automation",
    level: 3,
    question: "Tool selection and automation的关键证据链是什么？",
    answer:
      "工具选择由问题决定：Unity Profiler 找引擎级瓶颈，Profile Analyzer 比较数据集，Memory Profiler 查对象与引用，Frame Debugger 查绘制构造，原生工具看硬件。自动化只采稳定、低开销且能解释失败的指标。",
    tags: ["Tool selection and automation", "数据流"],
  },
  {
    id: "prof-11-tool-selection-automation-4",
    chapter: "prof-11-tool-selection-automation",
    level: 4,
    question: "Tool selection and automation最有诊断价值的故障样本怎样设计？",
    answer:
      "CI 只比较一次平均 FPS，运行机后台负载一变就随机红灯，同时无法指出哪个标记或资源回归。",
    tags: ["Tool selection and automation", "失败注入"],
  },
  {
    id: "prof-11-tool-selection-automation-5",
    chapter: "prof-11-tool-selection-automation",
    level: 2,
    question: "Tool selection and automation签发时必须保留什么不变量？",
    answer:
      "自动门禁必须有重复样本、环境指纹、统计口径、可解释阈值和原始证据。",
    tags: ["Tool selection and automation", "行为不变量"],
  },
  {
    id: "prof-11-tool-selection-automation-6",
    chapter: "prof-11-tool-selection-automation",
    level: 3,
    question: "Tool selection and automation至少保存哪些证据？",
    answer:
      "保存问题分类、选择工具、稳定计数器、重复采样、统计阈值、失败报告的状态快照、设备与构建指纹、正常边界失败三组捕获以及修复后同协议对照。",
    tags: ["Tool selection and automation", "验收证据"],
  },
  {
    id: "prof-12-native-tool-index-1",
    chapter: "prof-12-native-tool-index",
    level: 1,
    question: "在Native profiling tools中，什么是“Arm Performance Studio”？",
    answer: "面向 Arm CPU GPU 的采样、计数器和帧分析工具集",
    tags: ["Native profiling tools", "原书复刻"],
  },
  {
    id: "prof-12-native-tool-index-2",
    chapter: "prof-12-native-tool-index",
    level: 2,
    question: "Native profiling tools为什么必须保留官方单元“Android / Arm”？",
    answer:
      "它定义了本页在 Unity 6 第二版中的独有问题边界，不能被工具清单或自拟主题替代。",
    tags: ["Native profiling tools", "目录覆盖"],
  },
  {
    id: "prof-12-native-tool-index-3",
    chapter: "prof-12-native-tool-index",
    level: 3,
    question: "Native profiling tools的关键证据链是什么？",
    answer:
      "Unity 工具解释引擎内发生了什么，原生工具解释进程如何使用芯片、驱动、内存和电源。平台索引不是背工具名，而是为 CPU 采样、GPU 计数器、内存压力、温度和浏览器调用栈建立问题到工具的映射。",
    tags: ["Native profiling tools", "数据流"],
  },
  {
    id: "prof-12-native-tool-index-4",
    chapter: "prof-12-native-tool-index",
    level: 4,
    question: "Native profiling tools最有诊断价值的故障样本怎样设计？",
    answer:
      "在 Windows 开发机用一个工具得出移动端 GPU 结论，忽略图形 API、芯片架构和温控策略差异。",
    tags: ["Native profiling tools", "失败注入"],
  },
  {
    id: "prof-12-native-tool-index-5",
    chapter: "prof-12-native-tool-index",
    level: 2,
    question: "Native profiling tools签发时必须保留什么不变量？",
    answer:
      "平台结论必须由该平台构建、该平台硬件和对应原生工具采集的数据支持。",
    tags: ["Native profiling tools", "行为不变量"],
  },
  {
    id: "prof-12-native-tool-index-6",
    chapter: "prof-12-native-tool-index",
    level: 3,
    question: "Native profiling tools至少保存哪些证据？",
    answer:
      "保存目标平台、问题类型、Unity 捕获、原生工具、硬件计数器、交叉结论的状态快照、设备与构建指纹、正常边界失败三组捕获以及修复后同协议对照。",
    tags: ["Native profiling tools", "验收证据"],
  },
  {
    id: "prof-13-gpu-tools-resources-1",
    chapter: "prof-13-gpu-tools-resources",
    level: 1,
    question: "在GPU tools and advanced resources中，什么是“GPU 捕获”？",
    answer: "记录一帧图形 API 命令、资源和状态以供离线检查的数据",
    tags: ["GPU tools and advanced resources", "原书复刻"],
  },
  {
    id: "prof-13-gpu-tools-resources-2",
    chapter: "prof-13-gpu-tools-resources",
    level: 2,
    question:
      "GPU tools and advanced resources为什么必须保留官方单元“GPU debugging and profiling tools”？",
    answer:
      "它定义了本页在 Unity 6 第二版中的独有问题边界，不能被工具清单或自拟主题替代。",
    tags: ["GPU tools and advanced resources", "目录覆盖"],
  },
  {
    id: "prof-13-gpu-tools-resources-3",
    chapter: "prof-13-gpu-tools-resources",
    level: 3,
    question: "GPU tools and advanced resources的关键证据链是什么？",
    answer:
      "GPU 捕获要从已知异常帧开始，逐 Draw 检查管线状态、纹理、着色器和硬件计数器。RenderDoc 等调试器擅长还原资源与命令，厂商分析器擅长时序和架构计数；二者与 Unity 捕获必须用同一场景事件对齐。",
    tags: ["GPU tools and advanced resources", "数据流"],
  },
  {
    id: "prof-13-gpu-tools-resources-4",
    chapter: "prof-13-gpu-tools-resources",
    level: 4,
    question:
      "GPU tools and advanced resources最有诊断价值的故障样本怎样设计？",
    answer:
      "捕获任意一帧后在数百个 Draw Call 中盲搜，没有用 Unity 标记、事件 ID 和场景状态定位异常帧。",
    tags: ["GPU tools and advanced resources", "失败注入"],
  },
  {
    id: "prof-13-gpu-tools-resources-5",
    chapter: "prof-13-gpu-tools-resources",
    level: 2,
    question: "GPU tools and advanced resources签发时必须保留什么不变量？",
    answer:
      "Unity 与原生 GPU 证据必须关联到同一构建、场景事件、图形 API 和目标硬件。",
    tags: ["GPU tools and advanced resources", "行为不变量"],
  },
  {
    id: "prof-13-gpu-tools-resources-6",
    chapter: "prof-13-gpu-tools-resources",
    level: 3,
    question: "GPU tools and advanced resources至少保存哪些证据？",
    answer:
      "保存Unity 异常帧、图形 API 捕获、慢 Draw、状态与资源、硬件计数器、优化复验的状态快照、设备与构建指纹、正常边界失败三组捕获以及修复后同协议对照。",
    tags: ["GPU tools and advanced resources", "验收证据"],
  },
  {
    id: "prof-official-final-review-1",
    chapter: "prof-official-final-review",
    level: 1,
    question: "在全书综合验收中，什么是“最小工具链”？",
    answer: "足以定位当前问题且观测开销可控的工具组合",
    tags: ["全书综合验收", "原书复刻"],
  },
  {
    id: "prof-official-final-review-2",
    chapter: "prof-official-final-review",
    level: 2,
    question:
      "全书综合验收为什么必须保留官方单元“Frame budget and profiling methodology”？",
    answer:
      "它定义了本页在 Unity 6 第二版中的独有问题边界，不能被工具清单或自拟主题替代。",
    tags: ["全书综合验收", "目录覆盖"],
  },
  {
    id: "prof-official-final-review-3",
    chapter: "prof-official-final-review",
    level: 3,
    question: "全书综合验收的关键证据链是什么？",
    answer:
      "最终验收不是能打开所有工具，而是面对一个帧时间、内存或功耗故障，能从目标与预算出发，选择最小工具链，保存首个失败信号，完成单变量修复，并让自动门禁在同一条件下长期守住结果。",
    tags: ["全书综合验收", "数据流"],
  },
  {
    id: "prof-official-final-review-4",
    chapter: "prof-official-final-review",
    level: 4,
    question: "全书综合验收最有诊断价值的故障样本怎样设计？",
    answer:
      "只提交优化后的漂亮截图，没有原始捕获、环境指纹、失败样本和可重复测试，无法证明改动产生了收益。",
    tags: ["全书综合验收", "失败注入"],
  },
  {
    id: "prof-official-final-review-5",
    chapter: "prof-official-final-review",
    level: 2,
    question: "全书综合验收签发时必须保留什么不变量？",
    answer: "任何签发结论都必须可由另一位工程师在目标设备上按证据包独立复现。",
    tags: ["全书综合验收", "行为不变量"],
  },
  {
    id: "prof-official-final-review-6",
    chapter: "prof-official-final-review",
    level: 3,
    question: "全书综合验收至少保存哪些证据？",
    answer:
      "保存目标预算、基线捕获、瓶颈分类、工具下钻、单变量复验、自动门禁的状态快照、设备与构建指纹、正常边界失败三组捕获以及修复后同协议对照。",
    tags: ["全书综合验收", "验收证据"],
  },
];
