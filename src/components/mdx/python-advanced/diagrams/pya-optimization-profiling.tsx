import { PythonAdvancedOfficialLab, type PythonAdvancedCase } from "./official-lab";
const cases: PythonAdvancedCase[] = [
  { label: "优化三原则", input: "需求与输入", action: "先让程序正确，从用户可感知目标出发，并保持代码可读可维护", evidence: "优化三原则的测试与迁移记录", invariant: "先让程序正确，从用户可感知目标出发，并保持代码可读可维护；没有性能预算和基线的优化只是猜测。" },
  { label: "优化策略", input: "优化三原则", action: "先确认瓶颈是否在本服务，再考虑硬件、算法或缓存，最后写速度回归测试", evidence: "优化策略的测试与迁移记录", invariant: "先确认瓶颈是否在本服务，再考虑硬件、算法或缓存，最后写速度回归测试；局部变快若让端到端更慢就不算优化。" },
  { label: "CPU剖析", input: "优化策略", action: "宏观剖析定位高耗时路径，微基准隔离小函数", evidence: "CPU剖析的测试与迁移记录", invariant: "宏观剖析定位高耗时路径，微基准隔离小函数；采样与插桩有不同扰动，报告要包含输入、调用次数和累计时间。" },
  { label: "内存剖析", input: "CPU剖析", action: "理解对象分配、引用生命周期和峰值驻留后再定位泄漏", evidence: "内存剖析的测试与迁移记录", invariant: "理解对象分配、引用生命周期和峰值驻留后再定位泄漏；单看最终内存会漏掉处理中间峰值，优化也要防止复用可变对象造成错误。" },
  { label: "网络剖析", input: "内存剖析", action: "网络性能分解为DNS、连接、握手、服务处理和传输，并同时观察请求数与字节量", evidence: "网络剖析的测试与迁移记录", invariant: "网络性能分解为DNS、连接、握手、服务处理和传输，并同时观察请求数与字节量；平均时延会掩盖尾部与重试放大。" },
];
export function PyaOptimizationProfilingModelLab(){return <PythonAdvancedOfficialLab title="优化原则与性能剖析：执行链" caption="沿需求、实现和证据追踪本章核心。" cases={cases} tone="cyan" />;}
export function PyaOptimizationProfilingBoundaryLab(){return <PythonAdvancedOfficialLab title="优化原则与性能剖析：边界" caption="切换单元，比较历史工具与现代迁移边界。" cases={cases} tone="amber" initial={1} />;}
export function PyaOptimizationProfilingEvidenceLab(){return <PythonAdvancedOfficialLab title="优化原则与性能剖析：证据" caption="用测试、环境和制品证明结果可重放。" cases={cases} tone="emerald" initial={2} />;}
