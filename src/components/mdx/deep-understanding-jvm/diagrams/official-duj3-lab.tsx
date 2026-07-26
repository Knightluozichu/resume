"use client";

import { useState } from "react";

type View = "structure" | "execution" | "evidence";
type Scenario = "baseline" | "fault" | "recovery";
type VisualKind =
  | "roadmap"
  | "layers"
  | "build"
  | "memory"
  | "areas"
  | "gc"
  | "evidence"
  | "tuning"
  | "class-pipeline"
  | "classfile"
  | "loaders"
  | "frame"
  | "loader-graph"
  | "compile"
  | "javac"
  | "jit"
  | "jmm"
  | "happens-before"
  | "locks"
  | "history-build"
  | "dated-claims"
  | "bytecode"
  | "heap-graph"
  | "release-history";

type VmModel = {
  studio: string;
  boundary: string;
  axisA: { label: string; levels: readonly [string, string, string] };
  axisB: { label: string; levels: readonly [string, string, string] };
  fault: string;
  invariant: string;
  task: string;
  artifact: string;
  signal: string;
  practiceMode: string;
};

type Props = {
  unitId: string;
  title: string;
  concepts: readonly string[];
  chain: readonly string[];
  model: VmModel;
  view: View;
};

type VisualSpec = {
  kind: VisualKind;
  heading: string;
  caption: string;
  items: readonly string[];
};

const visualByUnit: Record<string, VisualSpec> = {
  "duj3-official-learning-map": { kind: "roadmap", heading: "从 Java 语义到运行时证据", caption: "每一步都标明规范、实现和目标 JDK，禁止从源码直接跨到 HotSpot 结论。", items: ["Java 源码与语言规则", "Class 文件与 JVMS", "加载、链接与运行时状态", "HotSpot：GC / JIT / 锁", "工具证据、反例与恢复"] },
  "duj3-part-1-approaching-java": { kind: "layers", heading: "Java 体系的证据层次", caption: "规范、OpenJDK 源码、HotSpot 构建和发行镜像是不同层次。", items: ["Java SE / JVMS / JLS 规范", "OpenJDK 源码提交", "Boot JDK 与本机工具链", "HotSpot slowdebug 构建", "images/bin/java -version"] },
  "duj3-01-approaching-java": { kind: "build", heading: "OpenJDK 可重放构建链", caption: "构建成功不够；提交、Boot JDK、configure 摘要、产物与断点必须同源。", items: ["冻结源码 commit", "记录 Boot JDK/依赖", "configure slowdebug", "make images", "镜像校验与源码断点"] },
  "duj3-part-2-memory-management": { kind: "memory", heading: "JVM 进程的内存证据地图", caption: "RSS 不等于 Java 堆；堆、非堆、线程、代码缓存和本地分配要对齐同一时间线。", items: ["线程私有栈 / PC", "Java 堆", "元空间", "代码缓存", "直接与其他本地内存", "GC 日志 + NMT + OS RSS"] },
  "duj3-02-memory-areas": { kind: "areas", heading: "运行时数据区与失败出口", caption: "异常名称要回到受限区域、参数和分配路径，不能把所有 OOM 归到堆。", items: ["虚拟机栈 → StackOverflowError", "Java 堆 → Java heap space", "元空间 → Metaspace", "直接缓冲区 → Direct buffer memory", "本地线程/地址空间 → native thread"] },
  "duj3-03-gc-allocation": { kind: "gc", heading: "对象分配、可达性与回收周期", caption: "收集器比较必须固定完成工作量，同时观察停顿分布、吞吐、占用和失败。", items: ["TLAB / Eden 分配", "跨代引用与记忆集", "GC Roots 与标记", "复制/转移/整理", "停顿、吞吐与占用证据"] },
  "duj3-04-monitoring-tools": { kind: "evidence", heading: "从诊断问题到最小探针", caption: "工具由问题和影响预算选择；高成本转储不能成为默认第一步。", items: ["写出可证伪问题", "jcmd 低成本快照", "JFR 有界时间窗", "必要时 jhsdb / heap dump", "第二信号交叉验证与销毁"] },
  "duj3-05-tuning-cases": { kind: "tuning", heading: "症状—证据—单变量—回滚", caption: "参数不能先于问题；每次只改一个因果条件，并预先写回滚阈值。", items: ["SLO 与症状时间线", "定位 CPU/内存/锁瓶颈", "形成一个可证伪假设", "单变量修改与对照", "收益、代价与回滚"] },
  "duj3-part-3-execution-subsystem": { kind: "class-pipeline", heading: "Class 到执行状态的分层路径", caption: "源码、Class 结构、加载状态与栈帧必须逐层对应。", items: ["源码与 javac 选项", "Class 字节与常量池", "验证/准备/解析", "初始化与栈帧", "调用结果与异常边"] },
  "duj3-06-class-file": { kind: "classfile", heading: "Class 文件的二进制布局", caption: "javap 是观察工具，不是文件格式本身；每个索引要回到字节偏移和 JVMS 结构。", items: ["magic + minor/major", "constant_pool_count + cp_info[]", "access_flags / this / super", "interfaces / fields / methods", "attributes：Code / LineNumber / BootstrapMethods"] },
  "duj3-07-class-loading": { kind: "loaders", heading: "类身份、委派与初始化", caption: "运行时类型身份 = 二进制名 + 定义加载器；同名 Class 不保证同一类型。", items: ["Bootstrap loader", "Platform loader", "Application loader", "Custom loader", "load → verify → prepare → resolve → initialize"] },
  "duj3-08-bytecode-engine": { kind: "frame", heading: "栈帧与调用指令", caption: "重载在编译期选择描述符，动态分派在运行期选择目标；两者不能混讲。", items: ["局部变量表", "操作数栈", "invokestatic / invokevirtual / invokedynamic", "目标方法栈帧", "返回值或异常出口"] },
  "duj3-09-loading-execution-cases": { kind: "loader-graph", heading: "容器类加载冲突图", caption: "缺类、版本冲突和类型隔离要从定义加载器、代码来源和模块边界解释。", items: ["共享 API loader", "应用 A loader", "应用 B loader", "同名不同版本 Class", "LinkageError / ClassCastException"] },
  "duj3-part-4-compilation": { kind: "compile", heading: "前端编译到 JIT 机器码", caption: "javac 输出、解释执行、分层编译和去优化发生在不同阶段。", items: ["源码 → AST / desugar", "javac → Class 字节码", "解释器收集 profile", "C1/C2 分层编译", "守卫失败 → 去优化"] },
  "duj3-10-frontend-compiler": { kind: "javac", heading: "javac 前端与注解处理轮次", caption: "相同源码、处理器和选项应生成同一诊断与 Class；新增源会触发下一轮。", items: ["parse", "enter symbols", "annotation processing rounds", "attribute / flow", "generate Class"] },
  "duj3-11-backend-compiler": { kind: "jit", heading: "热点、内联、守卫与去优化", caption: "稳态收益必须与编译事件、内联决定、代码缓存和尾延迟一同解释。", items: ["解释执行与计数器", "C1 快速编译", "类型 profile", "C2 内联/推测优化", "uncommon trap → deopt"] },
  "duj3-part-5-concurrency": { kind: "jmm", heading: "JMM 的动作与顺序关系", caption: "一次运行结果不是线程安全证明；正确性要落到 happens-before 和不变量。", items: ["线程内 program order", "volatile / monitor / start / join", "synchronization order", "happens-before 传递", "允许观察到的读值"] },
  "duj3-12-memory-model-threads": { kind: "happens-before", heading: "写入如何对另一个线程可见", caption: "sleep 不建立可见性；共享读必须由同步边或安全发布支撑。", items: ["线程 A：普通写 payload", "线程 A：volatile 写 ready", "同步边", "线程 B：volatile 读 ready", "线程 B：读取 payload", "反例计数与线程转储"] },
  "duj3-13-thread-safety-locks": { kind: "locks", heading: "锁获取、阻塞与释放路径", caption: "吞吐之外还要验证临界区不变量、拥有者、等待者、饥饿和异常释放。", items: ["进入同步点", "CAS/monitor acquire", "竞争失败 → spin/park", "临界区不变量", "release/unpark 或异常释放"] },
  "duj3-appendix-a-build-openjdk6": { kind: "history-build", heading: "历史 OpenJDK 6 隔离构建", caption: "旧工具链只在容器或离线 VM 中运行，不降低宿主安全配置。", items: ["归档源码与 SHA-256", "冻结历史 Boot JDK/依赖", "隔离容器或离线 VM", "configure / make", "镜像校验、归档与清理"] },
  "duj3-appendix-b-java-future-2013": { kind: "dated-claims", heading: "2013 预测的时间切片", caption: "预测保留当时证据和不确定性；后来交付或移除不能倒写成必然。", items: ["2013：原始主张", "当时的提案/源码证据", "2019：第 3 版观察点", "后来：交付/变化/移除", "2026：带来源复核"] },
  "duj3-appendix-c-bytecode-table": { kind: "bytecode", heading: "字节码编码与操作数栈", caption: "速查表要能手算栈前后、类型约束、分支目标与异常边。", items: ["字节偏移 + opcode", "读取即时操作数", "弹出操作数栈", "类型检查并执行", "压入结果 / 跳转 / 抛异常"] },
  "duj3-appendix-d-oql": { kind: "heap-graph", heading: "堆快照、对象图与 GC Root", caption: "OQL 结果必须回到实例、引用边和保留路径；快照按最小授权处置。", items: ["GC Root", "ClassLoader / Thread / static field", "可达对象集合", "疑似泄漏实例", "retained path / retained size", "授权、保留期与销毁"] },
  "duj3-appendix-e-jdk-history": { kind: "release-history", heading: "JDK 功能状态账本", caption: "预览、实验、正式、默认开启和移除是不同状态。", items: ["JDK 6：历史基线", "JDK 12：原书主版本", "JDK 13：预览期语境", "后续 JEP 状态变化", "JDK 25：当前复核坐标"] },
  "duj3-official-final-review": { kind: "roadmap", heading: "跨层故障答辩路径", caption: "同一环境指纹下，从源码、Class、VM 状态走到运行时证据和恢复。", items: ["冻结源码/Class/JDK", "定位规范与实现边界", "捕获第一处 VM 状态偏离", "注入反例并最小修复", "同条件重放、发布或回滚"] },
};

const scenarioLabels: Record<Scenario, string> = { baseline: "固定基线", fault: "故障传播", recovery: "清理后重放" };
const short = (value: string, limit = 34) => value.length > limit ? `${value.slice(0, limit)}…` : value;

function Pipeline({ items, active }: { items: readonly string[]; active: number }) {
  return <ol className="grid gap-2 sm:grid-cols-5">{items.slice(0, 5).map((item, index) => <li key={item} className={`relative min-h-20 rounded border p-3 text-xs leading-5 ${active === index ? "border-orange-600 bg-orange-50 text-orange-950 dark:bg-orange-950 dark:text-orange-50" : "border-zinc-300 dark:border-zinc-700"}`}><span className="mb-2 block font-mono font-bold">0{index + 1}</span>{item}{index < 4 && <span className="absolute -right-2 top-7 z-10 hidden bg-white px-1 text-zinc-500 sm:block dark:bg-zinc-950" aria-hidden>→</span>}</li>)}</ol>;
}

function LayerStack({ items, active }: { items: readonly string[]; active: number }) {
  return <div className="mx-auto grid max-w-2xl gap-1">{items.slice(0, 6).map((item, index) => <div key={item} className={`min-h-12 rounded border px-4 py-3 text-center text-xs ${active === index ? "border-violet-600 bg-violet-50 font-semibold text-violet-950 dark:bg-violet-950 dark:text-violet-50" : "border-zinc-300 dark:border-zinc-700"}`} style={{ marginInline: `${index * 8}px` }}>{item}</div>)}</div>;
}

function MemoryMap({ items, active, failures = false }: { items: readonly string[]; active: number; failures?: boolean }) {
  return <div className="grid gap-2 sm:grid-cols-2">{items.slice(0, 6).map((item, index) => <div key={item} className={`min-h-20 rounded border p-3 text-xs ${active === index ? failures ? "border-rose-600 bg-rose-50 text-rose-950 dark:bg-rose-950 dark:text-rose-50" : "border-cyan-600 bg-cyan-50 text-cyan-950 dark:bg-cyan-950 dark:text-cyan-50" : "border-zinc-300 dark:border-zinc-700"}`}><strong className="block">{item}</strong><span className="mt-2 block text-zinc-500">{failures ? "限制参数 · 分配路径 · 异常 · 清理" : "容量/提交/已用 · 时间戳 · 所属线程或子系统"}</span></div>)}</div>;
}

function Cycle({ items, active }: { items: readonly string[]; active: number }) {
  return <div><div className="grid gap-2 sm:grid-cols-5">{items.slice(0, 5).map((item, index) => <div key={item} className={`min-h-20 rounded-full border p-3 text-center text-xs leading-5 ${active === index ? "border-emerald-600 bg-emerald-50 font-semibold text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50" : "border-zinc-300 dark:border-zinc-700"}`}>{item}</div>)}</div><p className="mt-3 text-center text-xs text-zinc-500">分配 → 可达性 → 回收 → 继续分配；每轮用统一 GC ID 与时间线连接</p></div>;
}

function ClassFile({ items, active }: { items: readonly string[]; active: number }) {
  return <div><div className="mx-auto max-w-xl rounded border-2 border-zinc-500 p-2"><p className="border-b border-zinc-400 p-2 text-center font-mono text-xs">ClassFile &#123;</p>{items.map((item, index) => <div key={item} className={`border-b border-zinc-300 p-3 text-xs last:border-b-0 dark:border-zinc-700 ${active === index ? "bg-amber-100 font-semibold text-amber-950 dark:bg-amber-950 dark:text-amber-50" : ""}`}><span className="mr-3 font-mono text-zinc-500">结构段 #{String(index + 1).padStart(2, "0")}</span>{item}</div>)}<p className="border-t border-zinc-400 p-2 text-center font-mono text-xs">&#125;</p></div><p className="mx-auto mt-3 max-w-xl text-xs text-zinc-500">段号只表示阅读顺序，不是假装的字节偏移；真实偏移必须解析前面的变长结构后计算。</p></div>;
}

function LoaderTree({ items, active, conflict = false }: { items: readonly string[]; active: number; conflict?: boolean }) {
  const nodes = items.slice(0, conflict ? 5 : 4);
  return <div className="grid gap-2"><div className={`mx-auto w-full max-w-xs rounded border p-3 text-center text-xs ${active === 0 ? "border-cyan-600 bg-cyan-50 dark:bg-cyan-950" : "border-zinc-300 dark:border-zinc-700"}`}>{nodes[0]}</div><span className="text-center text-zinc-500" aria-hidden>↓ {conflict ? "共享/隔离边界" : "parent delegation"}</span><div className={`grid gap-2 ${conflict ? "sm:grid-cols-2" : ""}`}>{nodes.slice(1).map((item, index) => <div key={item} className={`mx-auto w-full max-w-sm rounded border p-3 text-center text-xs ${active === index + 1 ? "border-rose-600 bg-rose-50 dark:bg-rose-950" : "border-zinc-300 dark:border-zinc-700"}`}>{item}</div>)}</div>{!conflict && <><div className={`rounded border border-dashed p-3 text-center text-xs ${active === 4 ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950" : "border-zinc-400"}`}>{items[4]}</div><div className="rounded border border-dashed border-amber-500 p-3 text-center text-xs">类型身份：binary name + defining loader</div></>}</div>;
}

function Frame({ items, active, bytecode = false }: { items: readonly string[]; active: number; bytecode?: boolean }) {
  return <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center"><div className={`min-h-44 rounded border p-3 text-xs ${active % 5 < 2 ? "border-violet-600 bg-violet-50 dark:bg-violet-950" : "border-zinc-300 dark:border-zinc-700"}`}><strong>{bytecode ? "指令流" : "当前栈帧"}</strong><ol className="mt-3 space-y-2">{items.slice(0, 3).map((item) => <li key={item} className="rounded border bg-white/50 p-2 dark:bg-zinc-950/50">{item}</li>)}</ol></div><span className="text-2xl text-zinc-500" aria-hidden>⇄</span><div className={`min-h-44 rounded border p-3 text-xs ${active % 5 >= 2 ? "border-orange-600 bg-orange-50 dark:bg-orange-950" : "border-zinc-300 dark:border-zinc-700"}`}><strong>{bytecode ? "操作数栈 / 控制流" : "目标方法与出口"}</strong><ol className="mt-3 space-y-2">{items.slice(3).map((item) => <li key={item} className="rounded border bg-white/50 p-2 dark:bg-zinc-950/50">{item}</li>)}</ol></div></div>;
}

function HappensBefore({ items, active }: { items: readonly string[]; active: number }) {
  return <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center"><div className="grid gap-2">{items.slice(0, 2).map((item, index) => <div key={item} className={`rounded border p-3 text-xs ${active === index ? "border-violet-600 bg-violet-50 dark:bg-violet-950" : "border-zinc-300 dark:border-zinc-700"}`}>{item}</div>)}</div><div className={`rounded border-2 px-4 py-3 text-center text-xs ${active === 2 ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950" : "border-zinc-400"}`}><strong>happens-before</strong><span className="mt-1 block" aria-hidden>→</span>{items[2]}</div><div className="grid gap-2">{items.slice(3).map((item, index) => <div key={item} className={`rounded border p-3 text-xs ${active === index + 3 ? "border-cyan-600 bg-cyan-50 dark:bg-cyan-950" : "border-zinc-300 dark:border-zinc-700"}`}>{item}</div>)}</div></div>;
}

function HeapGraph({ items, active }: { items: readonly string[]; active: number }) {
  return <div><div className="grid gap-2 sm:grid-cols-3">{items.slice(0, 6).map((item, index) => <div key={item} className={`relative min-h-20 rounded border p-3 text-xs ${active === index ? "border-rose-600 bg-rose-50 font-semibold dark:bg-rose-950" : "border-zinc-300 dark:border-zinc-700"}`}>{item}{index < 5 && <span className="absolute -bottom-3 left-1/2 z-10 text-zinc-500 sm:-right-3 sm:bottom-auto sm:left-auto sm:top-1/2" aria-hidden>→</span>}</div>)}</div><p className="mt-3 text-xs text-zinc-500">查询结果必须保留对象 ID、类加载器、引用边与 GC Root 路径；retained size 不是“对象自身大小”。</p></div>;
}

function Timeline({ items, active }: { items: readonly string[]; active: number }) {
  return <ol className="relative grid gap-2 pl-5 before:absolute before:left-[9px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-zinc-300 before:content-[''] dark:before:bg-zinc-700">{items.slice(0, 6).map((item, index) => <li key={item} className={`relative min-h-12 rounded border px-4 py-3 text-xs ${active === index ? "border-cyan-600 bg-cyan-50 font-semibold dark:bg-cyan-950" : "border-zinc-300 dark:border-zinc-700"}`}><span className="absolute -left-[21px] top-4 size-3 rounded-full border-2 border-white bg-cyan-600 dark:border-zinc-950" aria-hidden />{item}</li>)}</ol>;
}

function DomainVisual({ spec, active }: { spec: VisualSpec; active: number }) {
  const normalized = active % spec.items.length;
  if (["roadmap", "build", "evidence", "tuning", "class-pipeline", "compile", "javac", "jit", "locks", "history-build"].includes(spec.kind)) return <Pipeline items={spec.items} active={normalized % 5} />;
  if (spec.kind === "layers") return <LayerStack items={spec.items} active={normalized} />;
  if (spec.kind === "memory") return <MemoryMap items={spec.items} active={normalized} />;
  if (spec.kind === "areas") return <MemoryMap items={spec.items} active={normalized} failures />;
  if (spec.kind === "gc") return <Cycle items={spec.items} active={normalized % 5} />;
  if (spec.kind === "classfile") return <ClassFile items={spec.items} active={normalized} />;
  if (spec.kind === "loaders") return <LoaderTree items={spec.items} active={normalized} />;
  if (spec.kind === "loader-graph") return <LoaderTree items={spec.items} active={normalized} conflict />;
  if (spec.kind === "frame") return <Frame items={spec.items} active={normalized} />;
  if (spec.kind === "bytecode") return <Frame items={spec.items} active={normalized} bytecode />;
  if (spec.kind === "jmm" || spec.kind === "happens-before") return <HappensBefore items={spec.items} active={normalized} />;
  if (spec.kind === "heap-graph") return <HeapGraph items={spec.items} active={normalized} />;
  if (["dated-claims", "release-history"].includes(spec.kind)) return <Timeline items={spec.items} active={normalized} />;
  return <Pipeline items={spec.items} active={normalized % 5} />;
}

export function OfficialDuj3Lab({ unitId, title, concepts, chain, model, view }: Props) {
  const [conceptIndex, setConceptIndex] = useState(0);
  const [axisA, setAxisA] = useState(1);
  const [axisB, setAxisB] = useState(1);
  const [scenario, setScenario] = useState<Scenario>("baseline");
  function resetExperiment() {
    setConceptIndex(0);
    setAxisA(1);
    setAxisB(1);
    setScenario("baseline");
  }

  const reset = () => { setConceptIndex(0); setAxisA(1); setAxisB(1); setScenario("baseline"); };
  const spec = visualByUnit[unitId] ?? { kind: "roadmap", heading: title, caption: model.boundary, items: chain };
  const active = view === "structure" ? conceptIndex : view === "execution" ? axisA * 3 + axisB : scenario === "baseline" ? 0 : scenario === "fault" ? Math.max(1, spec.items.length - 2) : spec.items.length - 1;
  const current = concepts[conceptIndex] ?? title;

  return <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={`${title} · ${spec.heading}专属图`} data-duj3-unit={unitId} data-visual-kind={spec.kind}>
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900"><div className="min-w-0"><p className="text-xs font-semibold text-orange-700 dark:text-orange-300">深入理解 JVM 3e · {view === "structure" ? "机制图" : view === "execution" ? "单变量探针" : "故障路径"}</p><h3 className="break-words text-base font-semibold">{spec.heading}</h3><p className="mt-1 max-w-3xl text-xs font-normal text-zinc-600 dark:text-zinc-300">{spec.caption}</p></div><button type="button" onClick={reset} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded border border-zinc-300 bg-white px-3 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950" aria-label={`重置${model.studio}`}><span aria-hidden>↺</span></button></header>
    <div className="grid min-w-0 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)]">
      <div className="min-w-0 border-b border-zinc-200 p-4 lg:border-r lg:border-b-0 dark:border-zinc-800">
        {view === "structure" && <><p className="mb-3 text-sm text-zinc-600 dark:text-zinc-300">点击正式节点，图中只高亮该对象在本章 JVM 机制中的位置。</p><div className="mb-4 flex max-h-32 flex-wrap gap-2 overflow-y-auto">{concepts.map((concept, index) => <button key={`${concept}-${index}`} type="button" onClick={() => setConceptIndex(index)} aria-pressed={conceptIndex === index} className={`min-h-11 rounded border px-3 py-2 text-left text-xs ${conceptIndex === index ? "border-orange-700 bg-orange-50 font-semibold dark:bg-orange-950" : "border-zinc-300 dark:border-zinc-700"}`}>{short(concept)}</button>)}</div></>}
        {view === "execution" && <div className="mb-5 grid gap-4 sm:grid-cols-2">{[[model.axisA, axisA, setAxisA], [model.axisB, axisB, setAxisB]].map(([axis, value, setter]) => { const typed = axis as VmModel["axisA"]; return <fieldset key={typed.label}><legend className="mb-2 text-sm font-semibold">{typed.label}</legend><div className="grid grid-cols-3 gap-2">{typed.levels.map((level, index) => <button key={level} type="button" onClick={() => (setter as (next: number) => void)(index)} aria-pressed={value === index} className={`min-h-11 rounded border px-2 py-2 text-xs [overflow-wrap:anywhere] ${value === index ? "border-violet-700 bg-violet-50 font-semibold dark:bg-violet-950" : "border-zinc-300 dark:border-zinc-700"}`}>{level}</button>)}</div></fieldset>; })}</div>}
        {view === "evidence" && <div className="mb-5 grid grid-cols-3 gap-2">{(Object.keys(scenarioLabels) as Scenario[]).map((item) => <button key={item} type="button" onClick={() => setScenario(item)} aria-pressed={scenario === item} className={`min-h-11 rounded border px-2 py-2 text-xs ${scenario === item ? "border-zinc-950 bg-zinc-950 font-semibold text-white dark:border-white dark:bg-white dark:text-zinc-950" : "border-zinc-300 dark:border-zinc-700"}`}>{scenarioLabels[item]}</button>)}</div>}
        <DomainVisual spec={spec} active={active} />
      </div>
      <aside className="min-w-0 p-4"><p className="text-xs font-semibold text-zinc-500">当前真实 JVM 对象</p><p className="mt-1 text-sm font-semibold [overflow-wrap:anywhere]">{current}</p><p className="mt-2 text-xs leading-5 text-zinc-600 dark:text-zinc-300">{model.boundary}</p>{view === "execution" && <dl className="mt-4 grid gap-3 text-xs"><div className="rounded border p-3"><dt className="text-zinc-500">当前单变量</dt><dd className="mt-1 font-semibold">{model.axisA.levels[axisA]} × {model.axisB.levels[axisB]}</dd></div><div className="rounded border p-3"><dt className="text-zinc-500">章专属探针</dt><dd className="mt-1 [overflow-wrap:anywhere]">{model.task}</dd></div><div className="rounded border p-3"><dt className="text-zinc-500">必须观察</dt><dd className="mt-1 font-semibold">{model.signal}</dd></div></dl>}{view === "evidence" && <div className="mt-4 grid gap-3 text-xs"><div className={`rounded border p-3 ${scenario === "fault" ? "border-rose-500 bg-rose-50 text-rose-950 dark:bg-rose-950 dark:text-rose-50" : "border-zinc-300 dark:border-zinc-700"}`}><strong>故障：{model.fault}</strong></div><div className={`rounded border p-3 ${scenario === "recovery" ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50" : "border-zinc-300 dark:border-zinc-700"}`}><strong>恢复断言：{model.invariant}</strong></div></div>}<div className="mt-4 rounded border border-orange-500 bg-orange-50 p-3 text-xs text-orange-950 dark:bg-orange-950 dark:text-orange-50"><strong>应保存的真实工件</strong><p className="mt-1 [overflow-wrap:anywhere]">{model.artifact}</p></div></aside>
    </div>
  </section>;
}
