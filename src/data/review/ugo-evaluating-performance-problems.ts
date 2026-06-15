/** 复习题库 · 评估性能问题（ugo-evaluating-performance-problems）。Unity Game Optimization Ch1 改编。 */

import type { ReviewQuestion } from "./types";

export const ugoEvaluatingPerformanceProblemsQuestions: ReviewQuestion[] = [
  {
    id: "ugo-epp-1",
    chapter: "ugo-evaluating-performance-problems",
    level: 1,
    question: "「Profile First」原则是什么意思？",
    answer:
      "先测量、后优化。在改任何代码或资源之前，用 Profiler 在固定场景下记录 FPS、CPU ms、GPU ms 等指标，建立可对比的基线；没有数据支撑的优化容易改错方向。",
    tags: ["Profile First", "基线"],
  },
  {
    id: "ugo-epp-2",
    chapter: "ugo-evaluating-performance-problems",
    level: 1,
    question: "Unity Profiler 的 CPU Usage 模块主要用来查什么？",
    answer:
      "查主线程与各 Job 线程上的 C# 脚本、物理、动画、粒子等 CPU 耗时。展开层级可看到具体函数名和 Self/Total 时间，用于定位「哪段脚本最慢」。",
    tags: ["Profiler", "CPU"],
  },
  {
    id: "ugo-epp-3",
    chapter: "ugo-evaluating-performance-problems",
    level: 1,
    question: "Rendering 模块和 CPU Usage 模块分别关注什么？",
    answer:
      "Rendering 关注 GPU 侧绘制：Draw Call 数量、Batches、SetPass、GPU 时间等。CPU Usage 关注 CPU 侧逻辑与引擎系统耗时。两者回答「慢在 CPU 还是 GPU」的不同侧面。",
    tags: ["Rendering", "Profiler"],
  },
  {
    id: "ugo-epp-4",
    chapter: "ugo-evaluating-performance-problems",
    level: 2,
    question: "什么是性能基线？建立基线时为什么要固定场景和画质？",
    answer:
      "性能基线是在优化前记录的一组对照数据（如 60 FPS 场景下 CPU 12ms、GPU 8ms）。固定场景和画质是为了保证前后对比条件一致；换了关卡或把画质从 Low 改成 Ultra，数字变化可能来自环境而非你的优化。",
    tags: ["基线", "对照实验"],
  },
  {
    id: "ugo-epp-5",
    chapter: "ugo-evaluating-performance-problems",
    level: 2,
    question: "如何判断项目是 CPU bound 还是 GPU bound？",
    answer:
      "在 Profiler 中对比帧内 CPU 主线程耗时与 GPU 时间（或 Rendering 模块 GPU ms）。若 CPU 时间接近或超过帧预算（如 16.6ms@60FPS）而 GPU 较低，多为 CPU bound；反之 GPU 顶满而 CPU 有余量则为 GPU bound。VSync 开启时要注意 GPU 等待。",
    tags: ["CPU bound", "GPU bound"],
  },
  {
    id: "ugo-epp-6",
    chapter: "ugo-evaluating-performance-problems",
    level: 2,
    question: "Memory 模块里为什么要关注 Texture 和 Mesh 的占用？",
    answer:
      "纹理和网格往往是内存大户；移动平台上内存过高会触发系统杀进程或频繁 GC。Memory 模块可看到各类资源的 Detailed 分配，帮助发现未压缩纹理、重复加载、泄漏性增长等问题。",
    tags: ["Memory", "纹理"],
  },
  {
    id: "ugo-epp-7",
    chapter: "ugo-evaluating-performance-problems",
    level: 3,
    question: "Frame Debugger 适合解决哪类性能问题？Profiler 解决不了什么时该打开它？",
    answer:
      "Frame Debugger 逐帧列出每个 Draw Call 的着色器、网格、渲染状态，适合查 Overdraw、错误合批、多余 Pass、透明排序等问题。Profiler 只告诉你「渲染慢」，Frame Debugger 帮你看「这一帧到底画了哪些东西、顺序对不对」。",
    tags: ["Frame Debugger", "Draw Call"],
  },
  {
    id: "ugo-epp-8",
    chapter: "ugo-evaluating-performance-problems",
    level: 3,
    question: "Profile Analyzer 相比单次 Profiler 采样有什么优势？",
    answer:
      "可导入多份 .data 采样做统计对比：均值、中位数、标准差、回归趋势。适合验证某次优化在多次运行中是否稳定生效，或对比不同设备/版本间的性能分布，而不是只看一次偶然的快帧。",
    tags: ["Profile Analyzer", "回归"],
  },
  {
    id: "ugo-epp-9",
    chapter: "ugo-evaluating-performance-problems",
    level: 3,
    question: "优化后为什么要做回归测试？只测一次「变快了」够吗？",
    answer:
      "不够。单次测试可能撞上缓存热身、场景随机性或后台任务干扰。回归测试应在同基线场景、多轮运行、目标设备上复测，并纳入 CI 或定期性能门禁，防止后续提交把性能改回去（性能回退）。",
    tags: ["回归测试", "基线"],
  },
  {
    id: "ugo-epp-10",
    chapter: "ugo-evaluating-performance-problems",
    level: 2,
    question: "Deep Profile 和正常 Profiler 录制有什么区别？使用时要注意什么？",
    answer:
      "Deep Profile 会记录每个 C# 函数的调用开销，定位更细，但开销极大、帧率会严重失真，只适合短场景、小范围排查。正常录制开销较低，适合看宏观热点；不要开着 Deep Profile 做帧率基线。",
    tags: ["Deep Profile", "CPU"],
  },
];
