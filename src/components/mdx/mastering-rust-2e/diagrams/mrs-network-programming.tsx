import { MasteringRustOfficialLab, type MasteringRustCase } from "./official-lab";

const cases: MasteringRustCase[] = [
  { label: "网络编程前置模型", input: "目标与输入", rule: "网络程序面对分段、乱序、半关闭、超时和不可信字节", evidence: "网络编程前置模型的边界测试与结果记录", invariant: "网络程序面对分段、乱序、半关闭、超时和不可信字节；TCP提供有序字节流，不提供消息边界或一次read对应一次send的保证。" },
  { label: "同步网络 I/O", input: "网络编程前置模型", rule: "阻塞套接字让一个执行流等待一个操作，模型简单但连接数扩大后需要线程、超时和资源预算", evidence: "同步网络 I/O的边界测试与结果记录", invariant: "阻塞套接字让一个执行流等待一个操作，模型简单但连接数扩大后需要线程、超时和资源预算；每个调用都要处理短读短写。" },
  { label: "异步网络 I/O", input: "同步网络 I/O", rule: "异步I/O在等待就绪时让出执行权，Future由运行时轮询", evidence: "异步网络 I/O的边界测试与结果记录", invariant: "异步I/O在等待就绪时让出执行权，Future由运行时轮询；不能在异步任务中长时间阻塞，也不能无限生成无背压任务。" },
  { label: "协议分帧", input: "异步网络 I/O", rule: "长度前缀、分隔符或固定宽度把字节流恢复成消息", evidence: "协议分帧的边界测试与结果记录", invariant: "长度前缀、分隔符或固定宽度把字节流恢复成消息；解析器先验证长度上限再分配，畸形帧应关闭连接并留下可定位错误。" },
  { label: "连接生命周期", input: "协议分帧", rule: "连接接受、认证、读写、空闲、关闭和重试构成状态机", evidence: "连接生命周期的边界测试与结果记录", invariant: "连接接受、认证、读写、空闲、关闭和重试构成状态机；优雅关闭要停止接收、耗尽在途请求并在截止时间后强制退出。" },
];

export function MrsNetworkProgrammingModelLab() {
  return <MasteringRustOfficialLab title="Rust 网络编程：概念执行链" caption="选择核心单元，沿输入、规则与证据追踪。" cases={cases} tone="cyan" />;
}

export function MrsNetworkProgrammingBoundaryLab() {
  return <MasteringRustOfficialLab title="Rust 网络编程：边界切换" caption="切换单元，比较静态契约与运行期协议。" cases={cases} tone="amber" initial={1} />;
}

export function MrsNetworkProgrammingEvidenceLab() {
  return <MasteringRustOfficialLab title="Rust 网络编程：验收证据" caption="把编译、测试与外部结果收束为可复现记录。" cases={cases} tone="emerald" initial={2} />;
}
