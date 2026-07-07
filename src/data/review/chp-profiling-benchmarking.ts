import type { ReviewQuestion } from "./types";

/** C++ 高性能编程 · 性能分析与基准测试复习题 */
export const chpProfilingBenchmarkingQuestions: ReviewQuestion[] = [
  {
    id: "chp-profiling-benchmarking-1",
    chapter: "chp-profiling-benchmarking",
    level: 1,
    question: "perf、Intel VTune、gprof 三种剖析工具各基于什么原理？分别适合什么场景？",
    answer:
      "三者原理与场景：\n\nperf（Linux）：基于 PMU 采样。按事件（CPU 周期、cache miss、分支预测失败）周期性中断记录当前指令地址，统计热点。开销小、系统级、免费，是 Linux 生产环境首选。配合 FlameGraph 可视化火焰图定位热点函数。局限：需符号表、采样粒度有限、不精确到单条指令。\n\nIntel VTune：基于 PMU 硬件计数器深度采集。能精确到指令级，分析缓存缺失、分支预测、TLB、NUMA、内存带宽等硬件瓶颈。适合在 perf 定位热点后，深挖「为什么慢」（是 cache miss 还是分支失败）。局限：商用付费、主要支持 Intel CPU。\n\ngprof：编译期插桩（`-pg`）。每个函数入口插计数与计时代码，运行后输出调用图与各函数耗时/调用次数。函数级调用次数精确，但插桩开销大、需重编译、不支持多线程完善。适合教学、老项目快速摸底或需调用关系图时。\n\n推荐流：perf 采样定位热点 → VTune 深挖硬件瓶颈 → google-benchmark 量化优化收益。",
    tags: ["perf", "VTune", "gprof", "采样", "插桩"],
  },
  {
    id: "chp-profiling-benchmarking-2",
    chapter: "chp-profiling-benchmarking",
    level: 2,
    question: "为什么不能用手写的 `std::chrono` 计时代码做基准测试？google-benchmark 解决了哪些问题？",
    answer:
      "手写 `chrono` 计时的问题：\n1. 未预热：CPU 频率未爬到最高（turbo）、缓存未暖好，首几次测偏慢。\n2. 被打断：OS 调度、中断、其他进程抢核，单次测可能严重偏离。\n3. 编译器优化：编译器可能把「不产生外部可见效果」的计算整个删掉或提到循环外，测的是空循环。\n4. 样本不足：单次或少数几次测无法反映分布与尾部，噪声大。\n5. 无统计：没有中位数/均值/标准差，无法判断「差异是真提升还是噪声」。\n6. 环境不可控：未固定核、未关超线程、页表冷热不一。\n\ngoogle-benchmark 解决：\n1. 自动预热与重复：先跑几轮暖缓存与提频，再正式测多轮。\n2. 自适应迭代：根据单次耗时自动选迭代次数，让总时长足够长以压噪声。\n3. 防优化：提供 `DoNotOptimize`、`ClobberMemory` 阻止编译器删除/重排计算。\n4. 统计输出：给均值、中位数、标准差，多组对比有显著性。\n5. 时间单位与迭代明确：输出 ns/iter、iter/s，可读可比。\n6. 可参数化：`BENCHMARK->Range(8,8192)` 自动测不同规模，看复杂度曲线。\n7. 可重复：固定线程亲和、报告环境信息，便于复现。\n\n所以基准测试要用专门框架（google-benchmark、Catch2 benchmark、nanobench），手写 chrono 只适合粗略摸底。",
    tags: ["基准测试", "google-benchmark", "chrono", "统计"],
  },
  {
    id: "chp-profiling-benchmarking-3",
    chapter: "chp-profiling-benchmarking",
    level: 3,
    question: "你优化了一段代码，benchmark 显示平均快了 15%。如何判断这个提升是真实的、可复现的，而非噪声？",
    answer:
      "判断步骤：\n\n1. 看统计显著性：单看均值不够。google-benchmark 报告含标准差/置信区间。若提升 15% 但标准差也 10%，差异可能不显著。应跑足够多轮（如 ≥30），用 t 检验或看置信区间是否不含 0。\n2. 看分布与尾部：均值会被长尾拉偏。看中位数、p99。若中位数提升 15% 但 p99 没变，说明只改善了常见情况、尾部抖动仍在。\n3. 控制环境：固定 CPU 核（`taskset`）、关超线程/省电（`cpupower frequency-set -g performance`）、关后台进程、关 turbo 看是否稳定。每次测同一台机、同一编译参数。\n4. 防编译器幻觉：确认优化没被编译器「帮倒忙」——用 `DoNotOptimize` 保证计算真发生；对比两版的汇编，确认改动确实进了机器码而非被优化掉。\n5. 多规模多输入：在多个 n、多种真实输入分布上测。若只在某规模快、别的规模不变或变慢，提升不可信或不可推广。\n6. 对比基线要同源：基线与新版要在同一 commit 环境、同一次构建条件下测，避免编译器版本/flags 差异污染对比。\n7. 可复现：保留 benchmark 脚本与种子，多次独立运行都能复现 15%，才算真。\n\n若统计显著、环境受控、多规模一致、汇编可证，则提升可信。否则继续排查噪声源或承认不确定。性能数字不附统计与复现条件，就没有意义。",
    tags: ["基准测试", "统计显著性", "噪声", "复现", "应用"],
  },
  {
    id: "chp-profiling-benchmarking-4",
    chapter: "chp-profiling-benchmarking",
    level: 4,
    question: "综合分析：剖析（profiling）与基准测试（benchmarking）是性能工程的「测量」支柱，二者如何配合构成一个可持续的、防回归的性能工程流程？",
    answer:
      "二者角色：\n- 剖析（profiling）：回答「哪里慢、为什么慢」。采样/插桩定位热点与瓶颈类型（CPU bound、memory bound、lock bound），是优化的指南针。\n- 基准测试（benchmarking）：回答「有多快、改没改好」。受控环境下量化吞吐/延迟/内存，是优化的尺子与验收。\n\n二者互补：只剖析不基准，知道哪儿慢但不知改后到底快多少；只基准不剖析，知道整体快慢但不知瓶颈在哪、往哪使劲。\n\n可持续防回归流程：\n\n1. 建立基线：对关键路径用 google-benchmark 建立性能基线（均值+分布+尾部），入库为基准数据。同时记录剖析快照（perf 火焰图）作为「当前热点画像」。\n\n2. 优化闭环：剖析定位热点 → 针对性优化 → benchmark 验证提升且统计显著 → 再剖析确认热点消失/转移。每轮都更新基线与画像。\n\n3. 性能回归门禁：把关键 benchmark 接入 CI，每次提交自动跑，与基线对比。回归超阈值（如慢 5%）阻断合入。配合 Profile Analyzer 类工具对比前后剖析，自动检测热点新增/恶化。\n\n4. 长期追踪：存储历史 benchmark 数据，画趋势图，发现「渐进退化」（每次提交慢 1%，半年累积 30%）。剖析快照也归档，便于回溯何时引入的瓶颈。\n\n5. 环境治理：CI 用固定机型、固定 OS 配置；本地开发给可复现脚本。避免「我机器上快、CI 上慢」的失控。\n\n6. 优先级排序：用剖析的「热点占比」× 业务的「调用频率」排优化优先级，把精力投到 ROI 最高的路径。benchmark 数据佐证每条优化的实际收益。\n\n7. 文化：测量驱动而非猜测驱动。任何「我觉得快了」都要 benchmark 佐证；任何「这里慢」都要剖析证据。把性能当代码质量同等对待，纳入 review。\n\n这样剖析给方向、benchmark 给度量、CI 给保障，三者闭环让性能提升可持续、不随重构流失，是新性能问题出现时能被早发现早修的工程体系。这是本书「测量优先」原则的工程化落地。",
    tags: ["综合", "剖析", "基准测试", "CI", "防回归", "工程流程"],
  },
];
