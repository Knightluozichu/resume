import type { ReviewQuestion } from "./types";

export const ndbgCpuProfilingQuestions: ReviewQuestion[] = [
  {
    id: "ndbg-cpu-profiling-1",
    chapter: "ndbg-cpu-profiling",
    level: 2,
    question: "CPU Profiler 的采样法和追踪法有什么区别？为什么 Node.js 默认用采样法？",
    answer:
      "采样法：每隔固定间隔（默认约 1ms）暂停执行，记录当前调用栈，然后恢复。开销小（约 1-3% CPU），但精度有限——执行时间短于采样间隔的函数可能完全不被记录，且函数的实际执行时间只能估算（采样次数 × 间隔）。追踪法：记录每一次函数调用和返回的精确时间戳。精度高（精确到微秒），但开销巨大（每次函数调用都有记录开销，可能让程序慢 10 倍以上），且数据量极大。Node.js 默认用采样法的原因：①生产环境不能容忍追踪法的性能开销，采样法的 1-3% 开销几乎无感；②Node.js 应用通常运行时间长，采样法的统计精度在长时间运行下足够定位热点；③采样数据量小（几千次采样），可序列化为 .cpuprofile 文件供 DevTools 加载分析，追踪法的数据量大到无法实用。追踪法只在极少数需要精确测量极短函数的场景下使用。",
    tags: ["采样法", "追踪法", "CPU Profiler"],
  },
  {
    id: "ndbg-cpu-profiling-2",
    chapter: "ndbg-cpu-profiling",
    level: 3,
    question: "Self Time 和 Total Time 的区别是什么？定位 CPU 热点时应该看哪个？",
    answer:
      "Self Time（自时间）是函数自身代码执行的时间，不含子函数调用。Total Time（总时间）是函数自身 + 所有子函数调用的总时间。例如函数 A 调用了 B 和 C：A 的 Total Time = A 的 Self Time + B 的 Total Time + C 的 Total Time。定位 CPU 热点时应该看 Self Time——它告诉你「哪个函数自身在做最多的计算」。Total Time 最高的函数通常是最外层的调度函数（如请求处理函数），它自身几乎不做事，只是调用了其他函数，优化它没有意义。Self Time 最高的函数才是真正的计算瓶颈——可能是 JSON.parse（解析大 JSON）、正则表达式回溯、同步加密计算、深层递归等。优化策略：先按 Self Time 排序找热点，再看调用者确定「谁在反复调用这个热点」，最后决定是减少调用次数、换更快的实现、还是缓存结果。",
    tags: ["Self Time", "Total Time", "CPU热点"],
  },
  {
    id: "ndbg-cpu-profiling-3",
    chapter: "ndbg-cpu-profiling",
    level: 3,
    question: "用 --prof 和 --prof-process 做 CPU 性能分析的完整工作流是什么？",
    answer:
      "工作流：①node --prof server.js 启动应用，V8 开始在后台采样；②执行压测（如 ab -n 10000 -c 100 http://localhost:3000/），让热点代码被充分执行；③Ctrl+C 停止进程，V8 生成 isolate-0x...-v8.log 二进制采样日志；④node --prof-process isolate-0x...-v8.log > profile.txt 处理日志为可读文本。profile.txt 包含四个段落：[JavaScript]——JS 函数的采样统计（按 Self Time 排序的热点）；[C++]——C++ 函数的采样统计（V8 内部/Node.js 核心）；[Summary]——按类别汇总（JS/C++/GC 占比）；[Bottom up]——自底向上排列的热点函数（最常出现的栈顶帧在最上面，每个函数下列出其调用者）。分析时先看 [Summary] 确认 CPU 花在 JS 还是 C++/GC，再看 [JavaScript] 或 [Bottom up] 找具体热点函数。",
    tags: ["--prof", "--prof-process", "命令行分析", "工作流"],
  },
  {
    id: "ndbg-cpu-profiling-4",
    chapter: "ndbg-cpu-profiling",
    level: 4,
    question: "如何用 Inspector Session API 编程式采集 CPU Profile？适用于什么自动化场景？",
    answer:
      "编程式采集：const session = new inspector.Session(); session.connect(); → session.post('Profiler.enable') → session.post('Profiler.start') 开始采样 → 压测一段时间 → session.post('Profiler.stop', (err, {profile}) => { fs.writeFileSync('cpu.cpuprofile', JSON.stringify(profile)); }) 停止并保存。profile 对象包含 nodes（调用栈节点树，每个节点有 callFrame.functionName 和 children）、samples（采样到的栈顶节点 ID 序列）、timeDeltas（每次采样的间隔）。适用自动化场景：①HTTP 诊断端点——POST /debug/cpu-profile-start 开始采样，POST /debug/cpu-profile-stop 停止并返回文件，可在生产环境远程触发；②CI 性能回归——测试脚本中自动采样，对比基线 .cpuprofile 检测 Self Time 变化；③A/B 测试——对两个版本各跑一次 Profile，对比热点函数变化；④定时采集——每天高峰期自动采集一次，归档供事后分析。.cpuprofile 文件可直接拖入 DevTools Performance 面板加载。",
    tags: ["Inspector Session", "编程式Profile", "自动化", "cpuprofile"],
  },
];
