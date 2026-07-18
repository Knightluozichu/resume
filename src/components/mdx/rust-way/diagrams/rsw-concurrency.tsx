import { RustWayOfficialLab, type RustWayCase } from "./official-lab";

const models: RustWayCase[] = [
  { label: "OS线程", input: "可并行阻塞任务", mechanism: "内核抢占调度与独立栈", result: "多核执行", invariant: "共享可变状态需要同步。" },
  { label: "消息传递", input: "拥有值的producer", mechanism: "channel转移或共享消息", result: "解耦consumer", invariant: "关闭、背压和发送失败必须有策略。" },
  { label: "Future", input: "可挂起I/O工作", mechanism: "poll、Waker与协作调度", result: "少量线程承载大量任务", invariant: "poll不能长期阻塞执行器线程。" },
];
const sync: RustWayCase[] = [
  { label: "Mutex/Condvar", input: "共享状态与等待条件", mechanism: "锁保护谓词，循环等待", result: "互斥更新与通知", invariant: "条件在同一锁下检查，醒来后重新验证。" },
  { label: "Atomic", input: "单个机器字状态", mechanism: "原子读改写与memory ordering", result: "无数据竞争同步", invariant: "ordering必须证明跨线程可见性，不只保证操作不可撕裂。" },
  { label: "Barrier", input: "固定参与线程", mechanism: "阶段到齐后统一放行", result: "阶段同步", invariant: "参与数与生命周期必须一致，否则永久等待。" },
];
const ecosystem: RustWayCase[] = [
  { label: "Rayon", input: "数据并行iterator", mechanism: "work stealing线程池", result: "多核CPU并行", invariant: "闭包副作用满足Send/Sync并避免共享热点。" },
  { label: "Crossbeam", input: "scope、channel或并发结构", mechanism: "受约束借用与高性能原语", result: "更灵活线程协作", invariant: "scope退出前所有借用线程完成。" },
  { label: "SIMD", input: "同形数据lane", mechanism: "单指令多数据", result: "向量化吞吐", invariant: "对齐、边界、fallback与数值一致性可验证。" },
];
export function RswConcurrencyModelLab() { return <RustWayOfficialLab title="线程、消息与Future" caption="并行、并发与异步解决不同等待和调度问题。" cases={models} tone="cyan" />; }
export function RswSynchronizationLab() { return <RustWayOfficialLab title="锁、条件变量、原子与屏障" caption="同步原语只有在状态不变量和内存顺序明确时才安全。" cases={sync} tone="rose" />; }
export function RswParallelEcosystemLab() { return <RustWayOfficialLab title="线程池、Rayon、Crossbeam与SIMD" caption="从任务并行、结构化线程到数据并行选择合适执行模型。" cases={ecosystem} tone="emerald" />; }
