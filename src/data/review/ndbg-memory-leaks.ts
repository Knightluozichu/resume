import type { ReviewQuestion } from "./types";

export const ndbgMemoryLeaksQuestions: ReviewQuestion[] = [
  {
    id: "ndbg-memory-leaks-1",
    chapter: "ndbg-memory-leaks",
    level: 2,
    question: "什么是 retainer 链？为什么找到 retainer 链就能修复泄漏？",
    answer:
      "retainer 链是从泄漏对象出发、沿着引用关系一路追溯到 GC Root 的路径。GC Root 是 GC 不可回收的起始点，包括：全局变量（global）、当前活跃的栈帧（正在执行的函数的局部变量）、Timer 回调队列中的回调、EventEmitter 的监听器列表。一个对象只要从任意 GC Root 可达就不会被回收。内存泄漏的本质就是：对象本该不可达（本该被回收），但因为某条 retainer 链仍连着 GC Root，导致它「可达但不使用」。找到 retainer 链后，切断链条上那个「不该存在」的引用（删除缓存 key、移除监听器、clearInterval），对象就变成不可达，下次 GC 就会回收。",
    tags: ["retainer链", "GC Root", "内存泄漏"],
  },
  {
    id: "ndbg-memory-leaks-2",
    chapter: "ndbg-memory-leaks",
    level: 3,
    question: "四类常见内存泄漏模式各自的泄漏机制是什么？如何修复？",
    answer:
      "①全局变量缓存——往全局对象/模块级变量不停塞数据且不删除，数据从全局变量可达所以不回收。修复：限制缓存大小 + LRU 过期淘汰。②闭包引用——闭包捕获了大对象，即使回调函数不使用它，闭包作用域仍持有引用。修复：只闭包需要的值，或在函数内用完后置 null。③事件监听器堆积——每次请求都 emitter.on 添加回调但不 off，回调闭包又捕获了请求数据，emitter 本身是 GC Root 级的长生命周期对象。修复：用 once 自动清理，或在请求结束时手动 off。④Timer 未清理——setInterval/setTimeout 的回调在事件循环队列中存活，闭包持有引用且永不 clear。修复：保存 timer 引用，在适当时机 clearInterval/clearTimeout。四类的共性是：长生命周期对象（全局/Emitter/Timer）持有短生命周期对象（请求数据）的引用，阻止了回收。",
    tags: ["泄漏模式", "全局变量", "闭包", "事件监听器", "Timer"],
  },
  {
    id: "ndbg-memory-leaks-3",
    chapter: "ndbg-memory-leaks",
    level: 3,
    question: "process.memoryUsage() 返回的四个字段分别是什么？如何判断是否存在内存泄漏？",
    answer:
      "四个字段：①rss——进程常驻物理内存（含 V8 堆 + 堆外内存 + C++ 对象 + 共享库）；②heapUsed——V8 堆中已使用部分（JS 对象在这）；③heapTotal——V8 堆已分配总量（含未使用部分，通常比 heapUsed 大）；④external——堆外内存（Buffer/ArrayBuffer 等 C++ 对象，不经过 V8 GC）。判断泄漏的方法：在固定负载下持续运行，定时采样 heapUsed，观察多次 GC 后的低点是否呈单调上升趋势——如果每次 GC 后的 heapUsed 低点都在抬高，说明有对象无法被回收（泄漏）。注意：一次性增长（如加载大文件）不是泄漏；启动前几分钟的增长（JIT 编译、模块缓存）也是正常的。必须看「GC 后的低点趋势」而非「瞬时值」。",
    tags: ["process.memoryUsage", "rss", "heapUsed", "泄漏判断"],
  },
  {
    id: "ndbg-memory-leaks-4",
    chapter: "ndbg-memory-leaks",
    level: 4,
    question: "内存增长一定意味着内存泄漏吗？如何区分正常增长与泄漏？",
    answer:
      "不一定。正常增长的情况：①V8 堆预分配——heapTotal 通常比 heapUsed 大，GC 后 heapUsed 下降但 heapTotal 可能不降（V8 保留空间供下次分配）；②启动阶段增长——模块加载、JIT 编译、内联缓存优化在前几分钟会消耗内存，之后稳定；③突发负载增长——高并发请求时临时对象增多，GC 后回落；④缓存正常填充——如 LRU 缓存填到上限后稳定。区分方法：①看趋势——泄漏是「单调上升不回落」，正常增长是「上升后 GC 回落到稳定基线」；②看 GC 后低点——多次 GC 后的低点持续抬高才是泄漏；③固定负载——在恒定 QPS 下运行 30 分钟以上，如果 heapUsed 线性增长且 GC 不回落，才是泄漏；④用 --trace-gc 观察 GC 日志，确认 GC 后 heapUsed 是否持续不降。",
    tags: ["内存增长", "正常增长", "泄漏判断", "V8堆"],
  },
];
