import type { ReviewQuestion } from "./types";

export const ndbgInspectorProtocolQuestions: ReviewQuestion[] = [
  {
    id: "ndbg-inspector-protocol-1",
    chapter: "ndbg-inspector-protocol",
    level: 2,
    question: `--inspect 和 --inspect-brk 的区别是什么？各自适用于什么场景？`,
    answer:
      `--inspect 启动 Node 后立即开始执行代码，调试器可以随时通过 WebSocket 接入——但如果代码在调试器接入前就执行完了（如短脚本），就来不及调试。--inspect-brk 启动后在用户代码首行立即暂停执行，等待调试器建立 WebSocket 连接并发送 Debugger.resume 后才继续——保证调试器一定能在代码执行前就位。适用场景：长时间运行的服务用 --inspect（随时接入即可）；启动阶段就需要调试的脚本用 --inspect-brk（如排查模块加载顺序、启动崩溃）。远程调试通常也用 --inspect-brk 确保连接就绪。`,
    tags: ["--inspect", "--inspect-brk", "启动参数"],
  },
  {
    id: "ndbg-inspector-protocol-2",
    chapter: "ndbg-inspector-protocol",
    level: 3,
    question: `Inspector Protocol 的三层通信架构是什么？为什么需要 HTTP 发现层？`,
    answer:
      `三层架构：①HTTP 发现层——Node 在指定端口监听 HTTP，GET /json 返回可调试目标的元信息（WebSocket URL、标题、ID），GET /json/version 返回 V8/Node 版本；②WebSocket 通道层——调试器拿到 ws://host:port/uuid 后建立 WebSocket 双向连接，所有 JSON-RPC 消息走此通道；③V8 Inspector 域层——消息按域组织（Runtime/Debugger/Profiler/HeapProfiler），每个域有自己的命令和事件。需要 HTTP 发现层的原因：WebSocket 需要知道完整的 URL（含 UUID 路径），但 UUID 是运行时生成的，不能硬编码。HTTP 发现层让调试器先查询可用的目标及其 WebSocket URL，再建立连接。`,
    tags: ["Inspector Protocol", "HTTP发现", "WebSocket", "三层架构"],
  },
  {
    id: "ndbg-inspector-protocol-3",
    chapter: "ndbg-inspector-protocol",
    level: 3,
    question: `Inspector Protocol 的四个主要域（Runtime/Debugger/Profiler/HeapProfiler）各自负责什么？`,
    answer:
      `Runtime 域负责运行时求值与对象检查——Runtime.evaluate 执行任意 JS 表达式，Runtime.getProperties 获取对象属性。Debugger 域负责断点与执行控制——enable 开启调试器、setBreakpoint 设置断点、pause/resume 暂停/继续执行、stepOver/stepInto 单步控制。Profiler 域负责 CPU 采样——start/stop 控制采样启停，stop 返回的 profile 包含 nodes（调用栈节点树）和 samples（采样时间序列）。HeapProfiler 域负责堆快照——takeHeapSnapshot 拍快照（数据通过 addHeapSnapshotChunk 事件流式返回）。使用前需先 enable 对应域。四个域覆盖了「求值→断点→CPU→内存」四类调试能力。`,
    tags: ["Inspector域", "Runtime", "Debugger", "Profiler", "HeapProfiler"],
  },
  {
    id: "ndbg-inspector-protocol-4",
    chapter: "ndbg-inspector-protocol",
    level: 4,
    question: `如何用 node:inspector 模块的 Session API 编程式对接 Inspector Protocol？与 DevTools 调试有什么区别？`,
    answer:
      `用 Session API 对接：①const session = new inspector.Session(); session.connect(); 建立连接；②session.post('Profiler.start', callback) 发送命令；③session.on('Debugger.paused', callback) 监听事件；④session.post('Profiler.stop', (err, {profile}) => {...}) 获取结果。与 DevTools 调试的区别：DevTools 是图形化的交互式调试器，适合人工操作（点按钮设断点、看面板）；Session API 是编程式接口，适合自动化场景——如在 HTTP 端点触发 CPU Profile 采集、在内存超阈值时自动拍 Heap Snapshot、CI 中自动跑性能回归测试。Session API 不需要 GUI，可在无头环境运行，且可以嵌入应用逻辑实现「按需采集」的诊断端点。`,
    tags: ["inspector.Session", "编程式调试", "自动化"],
  },
];
