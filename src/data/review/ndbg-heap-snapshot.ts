import type { ReviewQuestion } from "./types";

export const ndbgHeapSnapshotQuestions: ReviewQuestion[] = [
  {
    id: "ndbg-heap-snapshot-1",
    chapter: "ndbg-heap-snapshot",
    level: 2,
    question: "Shallow Size 和 Retained Size 的区别是什么？为什么定位泄漏要看 Retained Size？",
    answer:
      "Shallow Size 是对象自身占用的内存，不含其引用的其他对象。比如一个 Map 的 Shallow Size 只有几十字节（Map 结构本身）。Retained Size 是对象被回收后能释放的总内存，等于自身 Shallow Size 加上它独占引用的所有对象的 Shallow Size 之和。「独占引用」是关键——只有该对象引用、没有其他对象也引用的才算。定位泄漏要看 Retained Size 的原因：泄漏的根因往往是一个小对象（如 Map 的 key、闭包变量）独占引用了一个大对象（如大数组、大字符串）。这个小对象 Shallow Size 很小，但 Retained Size 很大——删掉它就能释放大量内存。如果只看 Shallow Size，你会盯着大数组本身，但它可能被多处引用（删掉一个引用不释放），找不到真正的泄漏点。",
    tags: ["Shallow Size", "Retained Size", "堆快照"],
  },
  {
    id: "ndbg-heap-snapshot-2",
    chapter: "ndbg-heap-snapshot",
    level: 3,
    question: "描述三快照法的完整步骤，以及为什么需要三张而不是两张。",
    answer:
      "三快照法步骤：①拍快照1（基线，启动后稳定状态）；②执行一次业务操作（如发一个请求）；③拍快照2（第一次操作后）；④手动触发 GC（点 Collect garbage，清掉一次性对象）；⑤再执行一次相同的业务操作；⑥拍快照3（第二次操作后）；⑦选快照3 → Comparison → 对比快照2，看 Delta 列。需要三张而不是两张的原因：两张快照（基线 vs 操作后）的增量中混入了「一次性缓存」——有些对象第一次操作时创建是正常的（如模块初始化、JIT 编译缓存），它们不会在第二次操作时继续增长。三快照法通过对比快照2和快照3（两次操作之间的增量），排除了这些一次性增长——如果每次操作的增量都相同，说明是泄漏（每次操作都新增一份不回收的对象）；如果第二次增量显著小于第一次，说明第一次的大头是一次性初始化。第三张快照的作用是「确认泄漏是持续性的而非一次性的」。",
    tags: ["三快照法", "Comparison视图", "内存泄漏"],
  },
  {
    id: "ndbg-heap-snapshot-3",
    chapter: "ndbg-heap-snapshot",
    level: 3,
    question: "如何用 v8.writeHeapSnapshot 在代码中自动拍快照？适用于什么场景？",
    answer:
      "用法：const { writeHeapSnapshot } = require('node:v8'); writeHeapSnapshot('heap-${Date.now()}.heapsnapshot'); 生成的 .heapsnapshot 文件可拖入 DevTools Memory 面板加载分析。适用场景：①内存超阈值自动拍快照——setInterval 定时检查 process.memoryUsage().heapUsed，超过阈值（如 500MB）时自动拍快照，捕获泄漏高峰时刻的状态；②操作前后拍快照——在特定 API 调用前后各拍一张，Comparison 对比定位哪步操作产生泄漏；③生产环境无人值守——不需要人手动操作 DevTools，进程自动在异常时保存快照文件，事后下载分析；④CI 性能回归——在压测脚本中自动拍快照，对比基线快照检测内存回归。注意：拍快照会暂停进程约 100ms-1s（取决于堆大小），生产环境应避免高频拍快照。",
    tags: ["writeHeapSnapshot", "自动快照", "无人值守", "生产环境"],
  },
  {
    id: "ndbg-heap-snapshot-4",
    chapter: "ndbg-heap-snapshot",
    level: 4,
    question: "Comparison 视图中的 Delta/Size Delta 列如何帮助定位泄漏？典型泄漏在 Comparison 中是什么表现？",
    answer:
      "Delta 列显示两次快照间某类型对象的净增量（Added - Deleted），正值表示新增多于回收，可能是泄漏。Size Delta 列显示净增内存量，是最关键的指标——它告诉你某类型对象在这段时间净增长了多少内存。典型泄漏表现：①(string) Delta: +50000 Size Delta: +3.2MB——每次操作多 5 万个字符串，说明有地方在不停创建字符串不回收（如日志拼接、URL 生成）；②(Map) Delta: +1 Size Delta: +8MB——Map 对象只增 1 个但内存涨 8MB，说明这个 Map 独占引用了 8MB 的数据（如大数组），点开 Map 看 Retainers 追溯谁持有这个 Map；③(Array) Delta: +100 Size Delta: +0.1MB 但每次操作都 +100——累计增长型泄漏，每个请求都新增 100 个数组元素不清理。定位步骤：按 Size Delta 降序排序 → 找正值最大的类型 → 点开看 Retainers → 追溯到 GC Root 的引用链 → 切断不该存在的引用。",
    tags: ["Comparison视图", "Delta", "Size Delta", "泄漏定位"],
  },
];
